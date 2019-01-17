var final_id;
var searchedID;
var finalbranchID;
$(document).ready(function(){

var url_string = window.location.href;
var url = new URL(url_string);
final_id = url.searchParams.get("id");

refresh();

$("input[name=sermobile]").keyup(function(){
	$("input[name=sermno]").val("");
	$("input[name=sername]").val("");
});

$("#serchbranch").change(function(){
	ViewService();
});

$("#addservice").click(function(){
						addService(searchedID);
});


$("#addbill").click(function(){
	AddBill(finalbranchID);
})


$("input[name=billserno]").keyup(function(){
	$("input[name=billbranch]").val("");
	$("input[name=billname]").val("");
	$("input[name=billmobile]").val("");
	$("input[name=billvehicle]").val("");
	$("input[name=billvehicleno]").val("");
	$("textarea[name=billproblem]").val("");
	$("textarea[name=billaddress]").val("");
	$("input[name=billamount]").val("");
	
});

});

function refresh(){
ViewBranchList();
ViewUser();

	
}

//Branch Menu

function AddBranch(){
	var name=$("input[name=branchname]").val().trim();
	var landmark=$("input[name=branchlandmark]").val().trim();
	var pincode=$("input[name=branchpincode]").val().trim();
	var address=$("textarea[name=branchaddress]").val().trim();
	if(name.length==0 || landmark.length==0 || pincode.length==0 || address.length ==0 ){
		swal("Required Fields!", "Should Enter All Required Fields", "warning");
	}else{
	
            $.ajax({
				type:"POST",
				url:"/api/addBranch",
				data:{name:name,landmark:landmark,pincode:pincode,address:address},
				success: function(datas) {
					
					swal("Success!", "Your Branch has been Added.", "success");
					$("input[name=branchname]").val("");
					$("input[name=branchlandmark]").val("");
					$("input[name=branchpincode]").val("");
					$("textarea[name=branchaddress]").val("");
					
					refresh();
				},
			});
       
				
	}
	
}

function ViewBranchList(){
	
			$.ajax({
				type:"GET",
				url:"/api/viewBranch",
				success: function(datas) {
						var html='';
						var serselect='';
						for(var i=0;i<datas.length;i++){
							var data = datas[i];
							serselect=serselect+'<option value='+data['id']+'>'+data['name']+'</option>';
							
							html = html + '<div class="card">'+
											'<div class="card-block">'+
												'<h4 class="card-title">'+data['name']+'</h4>'+
												'<div class="meta">'+
													'<a href="#">'+data['landmark']+'</a>'+
												'</div>'+
												'<div class="card-text">'+data['address']+
													
												'</div>'+
											'</div>'+
											'<div class="card-footer">'+
												'<span class="float-right">'+data['pincode']+'</span>'+
												'<button onclick="deleteBranch('+data["id"]+')" style="float:right;margin:10px" type="button" class="btn btn-danger">Remove</button>'+
											'</div>'+
										'</div>';
						}
						
						$("#BranchList").html(html);
						
						
						$("#serbranch").html(serselect);
						$("#serchbranch").html(serselect);
						$("#billbranch").html(serselect);
						
						$("#billbranch").change(function(){
							ViewBill();
						});

						$("#admissiondatepicker").change(function(){
							ViewBill();
						});
						
						ViewService();
						ViewBill();
						
					
				},
			});
		
}

function deleteBranch(id){
	
	$.ajax({
				type:"POST",
				url:"/api/deleteBranch",
				data:{id:id},
				success: function(datas) {
					
					swal("Success!", "Your Branch has been Removed.", "success");
					
					
					refresh();
				},
			});
}

//User Menu

function AddUser(){
	var name=$("input[name=username]").val().trim();
	var mobile=$("input[name=usermobile]").val().trim();
	var password=$("input[name=userpass]").val().trim();
	var cnpass=$("input[name=usercnpass]").val().trim();
	var address=$("textarea[name=useraddress]").val().trim();
	
	if(name.length==0 || mobile.length==0 || password.length==0 || cnpass.length==0 || address.length==0){
		swal("Required Fields!", "Should Enter All Required Fields", "warning");
	}else{
		if(password==cnpass){
			$.ajax({
				type:"POST",
				url:"/api/addUser",
				data:{name:name,mobile:mobile,password:password,address:address},
				success: function(datas) {
					
					swal("Success!", "User has been Added.", "success");
					$("input[name=username]").val("");
					$("input[name=usermobile]").val("");
					$("input[name=userpass]").val("");
					$("input[name=usercnpass]").val("");
					$("textarea[name=useraddress]").val("");
					
					refresh();
				},
			});
		}else{
			swal("Required Fields!", "Password does not match", "warning");
		}
	}
}

function ViewUser(){
	$.ajax({
				type:"GET",
				url:"/api/viewUser",
				success: function(datas) {
						var html='';
						for(var i=0;i<datas.length;i++){
							var data = datas[i];
							
							html = html + '<div class="card">'+
											'<div class="card-block">'+
												'<h4 class="card-title">'+data['name']+'</h4>'+
												'<div class="meta">'+
													'<a href="#">'+data['mobile']+'</a>'+
												'</div>'+
												'<div class="card-text">'+data['address']+
													
												'</div>'+
											'</div>'+
											'<div class="card-footer">'+
												'<button onclick="deleteUser('+data["id"]+')" style="float:right;margin:10px" type="button" class="btn btn-danger">Remove</button>'+
											'</div>'+
										'</div>';
						}
						
						$("#ShowUserList").html(html);
					
				},
			});
}

function deleteUser(id){
	
	$.ajax({
				type:"POST",
				url:"/api/deleteUser",
				data:{id:id},
				success: function(datas) {
					
					swal("Success!", "Your Branch has been Removed.", "success");
					
					
					refresh();
				},
			});
	
}

//Service Menu

function searchService(){
	var mobilenumber=$("input[name=sermobile]").val().trim();
	if(mobilenumber.length!=10){
		swal("Required Fields!", "Enter Valid Mobile Number", "warning");
	}else{
		$.ajax({
				type:"POST",
				url:"/api/searchService",
				data:{mobilenumber:mobilenumber},
				success: function(datas) {
					 var data= datas[0];
					$("input[name=sername]").val(data['name']);
					$("input[name=sermno]").val(data['mobile']);
					   //id="serbranch"  id="servehicle"  name="serno"  name="problem" name="seraddress"
					searchedID= data['id'];
					
					refresh();
				},
			});
	}
}

function addService(id){
	
	
	var mobile=$("input[name=sermno]").val().trim();
	var name=$("input[name=sername]").val().trim();
	var branch=$('#serbranch').val().trim();
	var vehicletype=$('#servehicle').val().trim();
	var serno=$("input[name=serno]").val().trim();
	var problem=$("textarea[name=serproblem]").val().trim();
	var address=$("textarea[name=seraddress]").val().trim();
	
	var vehicle='';
	if(vehicletype==1){
		vehicle='CAR';
	}else if(vehicletype==2){
		vehicle='BIKE';
	}
	
	if(name.length==0 || mobile.length==0 || branch.length==0 || vehicletype.length==0 || serno.length==0 || problem.length==0 || address.length==0){
		swal("Required Fields!", "Should Enter all required Fields!", "warning");
	}else{
		$.ajax({
				type:"POST",
				url:"/api/addService",
				data:{uid:id,mobile:mobile,name:name,branch:branch,vehicle:vehicle,serno:serno,problem:problem,address:address},
				success: function(datas) {
					$("input[name=sermno]").val("");
					$("input[name=sername]").val("");
					$("input[name=serno]").val("");
					$("textarea[name=serproblem]").val("");
					$("textarea[name=seraddress]").val("");
					 
					refresh();
				},
			});
	}
	ViewService();

}

function ViewService(){
	var branch=$('#serchbranch').val().trim();
	$.ajax({
				type:"POST",
				data:{branch:branch},
				url:"/api/viewService",
				success: function(datas) {
						var html='';
						
						for(var i=0;i<datas.length;i++){
							var data = datas[i];
							html=html+'<div class="card">'+
										'<div class="card-block">'+
										'<h4 class="card-title">'+data['name']+'</h4>'+
										'<div class="meta">'+
										'<a href="#">'+data['vehicle']+'</a>'+
										'</div>'+
										'<div class="card-text">'+data['serno']+
										'</div>'+
										'<div class="card-text">'+data['problem']+
										'</div>'+
										'</div>'+
										'<div class="card-footer">'+
										'<button style="float:right;margin:10px;" onclick="deleteService('+data['id']+')" type="button" class="btn btn-danger">Reject</button>'+
										'<button style="float:right;margin:10px;" onclick="Billingdetails('+data['id']+')" type="button" class="btn btn-success" href="#tab4primary" data-toggle="tab">Finished</button>'+
										'</div>'+'</div>';
							
						}
						$("#showServiceList").html(html);
				}
			});
}

function deleteService(id){
	$.ajax({
				type:"POST",
				data:{id:id},
				url:"/api/deleteService",
				success: function(datas) {
						ViewService();
				}
			});
}

function SearchBilling(){
	Billingdetails($("input[name=billserno]").val());
}


function Billingdetails(id){
	$("#billingtab").addClass("active");
	$("#servicetab").removeClass("active");
	$.ajax({
				type:"POST",
				data:{id:id},
				url:"/api/billDetails",
				success: function(datas) {
					
						var data= datas[0];
						
						$("input[name=billserno]").val(id);
						$("input[name=billbranch]").val(data['branch']);
						$("input[name=billname]").val(data['name']);
						$("input[name=billmobile]").val(data['mobile']);
						$("input[name=billvehicle]").val(data['vehicle']);
						$("input[name=billvehicleno]").val(data['carno']);
						$("textarea[name=billproblem]").val(data['problem']);
						$("textarea[name=billaddress]").val(data['address']);
						
				finalbranchID=data['branchid'];
				
						
				}
			});
}

function AddBill(branchid){
	var sid= $("input[name=billserno]").val().trim();
	var amount=$("input[name=billamount]").val().trim();
	var name=$("input[name=billname]").val().trim();
	if(name.length!=0 && amount.length!=0){
		$.ajax({
				type:"POST",
				data:{sid:sid,amount:amount,branchid:branchid},
				url:"/api/addBill",
				success: function(datas) {
					ViewBill();
					$("input[name=billbranch]").val("");
					$("input[name=billname]").val("");
					$("input[name=billmobile]").val("");
					$("input[name=billvehicle]").val("");
					$("input[name=billvehicleno]").val("");
					$("textarea[name=billproblem]").val("");
					$("textarea[name=billaddress]").val("");
					$("input[name=billamount]").val("");
						
				}
			});
	}else{
		swal("Required Fields!", "Should Enter valid data", "warning");
	}
	
}


function ViewBill(){
	var html ='<tr class="header"><th style="width:33%;">Name</th><th style="width:33%;">Mobile</th><th style="width:33%;">Amount</th></tr>';
	var branch=$("#billbranch").val();
	var date=$("#admissiondate").val();
	var tot=0;
	$.ajax({
				type:"POST",
				data:{branch:branch,date:date},
				url:"/api/viewBill",
				success: function(datas) {
					
					for(var i=0;i<datas.length;i++){
						
						var data = datas[i];
						tot= tot+data['amount'];
						
						html=html+'<tr><td>'+data['name']+'</td><td>'+data['mobile']+'</td><td>'+data['amount']+'</td></tr>';
						
					}
					$("#myTable").html(html);
					$("#totalbill").html("Total	: "+tot);
					
					
				}
			});
			
			
	//viewBill
}

function logout(){
	
	window.location.href='/';
}