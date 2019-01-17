var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var knex = require('knex')({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : '',
    database : 'vehicleservice'
  }
});

/* GET users listing. */
router.post('/addBranch', function(req, res, next) {
	
	var name = req.body.name;
	var landmark = req.body.landmark;
	var pincode = req.body.pincode;
	var address = req.body.address;
  knex.raw("INSERT INTO `vehicleservice`.`branch` (`id`, `name`, `landmark`, `pincode`, `address`) VALUES (NULL, '"+name+"', '"+landmark+"', '"+pincode+"', '"+address+"');")
  .then((datas) => {
	  
	 res.send("Successfulle Registered");
    
  });
});
router.get('/viewBranch', function(req, res, next) {
	
  knex.raw("select * from branch order by id desc")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

router.post('/deleteBranch', function(req, res, next) {
	var id = req.body.id;
	
  knex.raw("delete from branch where id="+id)
  .then((datas) => {
	  
	 res.send("Successfulle Removed");
    
  });
});
router.post('/addUser', function(req, res, next) {
	
	var name = req.body.name;
	var mobile = req.body.mobile;
	var password = req.body.password;
	var address = req.body.address;
  knex.raw("INSERT INTO `vehicleservice`.`user` (`id`, `name`, `mobile`, `password`, `address`,`FLAG`) VALUES (NULL, '"+name+"', '"+mobile+"', '"+password+"', '"+address+"',0);")
  .then((datas) => {
	  
	 res.send("Successfulle Registered");
    
  });
});
router.get('/viewUser', function(req, res, next) {
	
  knex.raw("select * from user where FLAG!=1 order by id desc")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

router.post('/deleteUser', function(req, res, next) {
	var id = req.body.id;
	
  knex.raw("delete from user where id="+id)
  .then((datas) => {
	  
	 res.send("Successfulle Removed");
    
  });
});

router.post('/searchService', function(req, res, next) {
	var mobile=req.body.mobilenumber;
  knex.raw("select * from user where mobile="+mobile+" order by id desc")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});



router.post('/addService', function(req, res, next) {
	var mobile= req.body.mobile;
	var name= req.body.name;
	var branch= req.body.branch;
	var vehicle= req.body.vehicle;
	var serno= req.body.serno;
	var problem= req.body.problem;
	var address= req.body.address;
	var uid=req.body.uid;
	
	var date = new Date();
	var d = format(date.getDate());
	var m = format(date.getMonth()+1);
	var y = format(date.getFullYear());
	
	var dmy = d+"-"+m+"-"+y;

	
	
  knex.raw("INSERT INTO `vehicleservice`.`service` (`id`,`uid`, `mobile`, `name`, `branch`, `vehicle`, `serno`, `problem`, `address`,`date`) VALUES (NULL,'"+uid+"', '"+mobile+"', '"+name+"', '"+branch+"', '"+vehicle+"', '"+serno+"', '"+problem+"', '"+address+"', '"+dmy+"');")
  .then((datas) => {
	  
	 res.send("Successfulle Registered");
    
  });
});

router.post('/viewService', function(req, res, next) {
	var  branch = req.body.branch;
  knex.raw("select * from service where branch="+branch+" and status!=1 order by id desc")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});
router.post('/deleteService', function(req, res, next) {
	var  id = req.body.id;
  knex.raw("delete from service where id="+id)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

router.post('/billDetails', function(req, res, next) {
	var  id = req.body.id;
  knex.raw("select branch.id as branchid,branch.name as branch,service.mobile as mobile,service.name as name,service.vehicle as vehicle,service.serno as carno,service.problem as problem,service.address as address from service left join branch on (branch.id=service.branch) where  service.status!=1 and service.id="+id )
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

router.post('/addBill', function(req, res, next) {
	var date = new Date();
	var d = format(date.getDate());
	var m = format(date.getMonth()+1);
	var y = format(date.getFullYear());
	
	var dmy = d+"-"+m+"-"+y;

	var  sid = req.body.sid;
	var  amount = req.body.amount;
	var  branchid = req.body.branchid;
	
	knex.raw("UPDATE `vehicleservice`.`service` SET `status` = '1' WHERE `service`.`id` = "+sid)
  .then((datas) => {
	  knex.raw("INSERT INTO `vehicleservice`.`bill` (`id`,`branchid`, `servideid`, `amount`, `date`) VALUES (NULL, '"+branchid+"','"+sid+"', '"+amount+"', '"+dmy+"');")
	  .then((datas) => {
		  
		 res.send(datas[0]);
    
		});
  });
});

router.post('/viewBill', function(req, res, next) {
	var  branch = req.body.branch;
	var date = req.body.date;
  knex.raw("select s.name,b.amount,s.mobile from bill as b left join service as s on (b.servideid=s.id)  where b.branchid="+branch+" and b.date='"+date+"'")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

router.post('/login', function(req, res, next) {
	var  mobile = req.body.mobile;
	var password = req.body.password;
  knex.raw("select * from user where mobile='"+mobile+"' and password='"+password+"'")
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});
router.post('/userdetails', function(req, res, next) {
	var  id = req.body.id;
	var password = req.body.password;
  knex.raw("select * from user where id="+id)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});
router.post('/pendingService', function(req, res, next) {
	var  id = req.body.id;
	var password = req.body.password;
  knex.raw("select s.id as id,s.date as date,b.name as branchname,s.serno as serno,s.problem as problem from service as s left join branch as b on (b.id=s.branch) where s.status!=1 and  s.uid="+id)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});
router.post('/deliveredService', function(req, res, next) {
	var  id = req.body.id;
	var password = req.body.password;
  knex.raw("select s.id as id,s.date as date,b.name as branchname,s.serno as serno,s.problem as problem from service as s left join branch as b on (b.id=s.branch) where s.status=1 and  s.uid="+id)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});


router.post('/userBill', function(req, res, next) {
	var  branch = req.body.branch;
	var uid = req.body.uid;
  knex.raw("select s.branch as branchid,bra.name as branch,b.date as date,s.problem as problem,s.serno as serno,b.amount as amount from bill as b left join service as s on(s.id=b.servideid) left join branch as bra on (s.branch=bra.id) left join user as u on(u.name=s.name)  where u.id="+uid+" and s.branch="+branch)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});
router.post('/getProfile', function(req, res, next) {
	var  id = req.body.id;
	var uid = req.body.uid;
  knex.raw("select * from user where id="+id)
  .then((datas) => {
	  
	 res.send(datas[0]);
    
  });
});

function format(n){
	if(n<10){
		return "0"+n;
	}else{
		return n;
	}
}
module.exports = router;
