var final_id;

$(document).ready(function(){

var url_string = window.location.href;
var url = new URL(url_string);
final_id = url.searchParams.get("id");
getProfile(final_id);
ViewBranchList();
getUserDetails();
PendingService();
DeliveredService();


});

function getProfile(id){
	
	
	$.ajax({
			type:"POST",
			url:"/api/getProfile",
			data:{id:id},
			success: function(data) {
				setProfile(data[0]);
				
			},
			dataType: 'json',
			});
}

function setProfile(data){
					
					var profile='<div class="title">'+
                        '<a target="_blank" href="">'+data["name"]+'</a>'+
                    '</div>'+
					'<div class="desc">'+data["mobile"]+'</div>'+
                    '<div class="desc">'+data["address"]+'</div>'+
                    '<div class="desc">USER</div>';
					$('#admin_profile').html(profile);
					
	
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
							
							
						}
						
						
						
						
						$("#serbranch").html(serselect);
						$("#billbranch").html(serselect);
						BillDetails();
						
						$("#billbranch").change(function(){
							BillDetails();
						});
						
						
						

						
						
						
						
					
				},
			});
		
}

function getUserDetails(){
	$.ajax({
				type:"POST",
				url:"/api/userdetails",
				data:{id:final_id},
				success: function(datas) {
					 var data= datas[0];
					$("input[name=sername]").val(data['name']);
					$("input[name=sermno]").val(data['mobile']);
					   //id="serbranch"  id="servehicle"  name="serno"  name="problem" name="seraddress"
					
					$("#addservice").click(function(){
						addService(data['id']);
					});
					
				},
			});
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
					 
					PendingService();
					DeliveredService();
				},
			});
	}
	

}
function PendingService(){
	var html='';
	$.ajax({
				type:"POST",
				url:"/api/pendingService",
				data:{id:final_id},
				success: function(datas) {
					for (var i=0;i<datas.length;i++){
						var data=datas[i];
					html=html+'<tr>'+
							'<td>'+data['branchname']+'</td>'+
							'<td>'+data['serno']+'</td>'+
							'<td>'+data['date']+'</td>'+
							'<td>'+data['problem']+'</td>'+
							'<td><button onclick="deleteService('+data['id']+')" type="button" class="btn btn-danger">Cancel</button></td>'+
							'</tr>';
					}
					$("#pengingtablebody").html(html);
					
				},
			});
	
}


function deleteService(id){
	
	$.ajax({
				type:"POST",
				data:{id:id},
				url:"/api/deleteService",
				success: function(datas) {
						PendingService();
				}
			});
}

function DeliveredService(){
	var html='';
	$.ajax({
				type:"POST",
				url:"/api/deliveredService",
				data:{id:final_id},
				success: function(datas) {
					for (var i=0;i<datas.length;i++){
						var data=datas[i];
					html=html+'<tr>'+
							'<td>'+data['branchname']+'</td>'+
							'<td>'+data['serno']+'</td>'+
							'<td>'+data['date']+'</td>'+
							'<td>'+data['problem']+'</td>'+
							'</tr>';
					}
					$("#deliveredtablebody").html(html);
					
					
				},
			});
	
}


function BillDetails(){
var html ='<tr class="header"><th >Branch</th><th >Date</th><th >Problem</th><th >No</th><th >Amount</th></tr>';
	var branch=$("#billbranch").val();
	
	var date=$("#admissiondate").val();
	var tot=0;
	$.ajax({
				type:"POST",
				data:{branch:branch,uid:final_id},
				url:"/api/userBill",
				success: function(datas) {
					
					for(var i=0;i<datas.length;i++){
						
						var data = datas[i];
						tot= tot+data['amount'];
						
						html=html+'<tr><td>'+data['branch']+'</td><td>'+data['date']+'</td><td>'+data['problem']+'</td><td>'+data['serno']+'</td><td>'+data['amount']+'</td></tr>';
						
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




