
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var express=require('express');
var path=require('path');
var app=express();
app.use(express.static(__dirname+'/public'));
var router=express.Router();

//body parser
var bodyParser=require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var http=require('http');



var port=3000;

var mongoose=require("mongoose");
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/register");


app.get("/", (req, res) => {

    res.sendFile(__dirname+"/index.html");

});
 

 //creating our schema for this app
 var nameSchema = new mongoose.Schema({
  username: String,
  email: String,
  password :String,
  repassword: String
});

//creating a model

var User = mongoose.model("User", nameSchema);

//building a CRUD
/*app.post("/contact", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});*/

app.get("/registration", (req, res ,err) => {
res.sendFile(path.join(__dirname+'/registration.html'));

});
 
 var dbconn=MongoClient.connect("mongodb://localhost:27017/register");
/*the register work with success
 app.post("/contact",function(req,res){
  dbconn.then(function(db){
  	var dbo = db.db("register");
  	dbo.collection('folks').insertOne(req.body,function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });

  });
  res.send('/data:'+JSON.stringify(req.body));

 });*/


 app.post("/contact",function(req,res){
  dbconn.then(function(db){
    var dbo = db.db("register");
    
   dbo.collection('folks').findOne({username:req.body.username,email:req.body.email},function(err, user) {
    if(user) return res.send("username Or email exist");

    dbo.collection('folks').insertOne(req.body,function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
res.send('/data:'+JSON.stringify(req.body));
  });
  })

 });

 app.post("/loginn",function(req,res){
  dbconn.then(function(db){
    var dbo = db.db("register");
    dbo.collection('folks').findOne({username:req.body.username,password:req.body.password},function(err, user) {
    if (!user) { console.log(user);
      return res.send("check out your username Or password");
      console.log("No One exist");}
         else {console.log("we find One");
         console.log(user);
    res.sendFile(__dirname+"/success.html");
       }
    db.close();
  });

  });


 });




/*app.post('/login',function(req,res){
var username=req.body.username;
var password=req.body.password;

User.findOne({username:username,password:password},function(err,user){
if(err){
  console.log(err);
  return res.send("we have a probleme dude");
}

if(!user){
  return res.send("check ur loginh or password");
}
  return res.send("you do it well");

});

});*/



app.listen(port, () => {
  console.log("Server listening on port " + port);
});

app.get("/data",function(req,res){

User.find({},function(err,docs){
if(err) {res.json(err) ;}
else res.render('registration',{User:docs}); 

});
});


app.get("/login",function(req,res){
	  res.sendFile(path.join(__dirname+'/login.html'));
	});


/*	var resultArray=[];
res.send("we are showing data");
mongodb.connect("",function(err,db){
         assert.equal(null,err);
         var cursor=db.collection().find();
         cursor.forEach(function(doc,err){
         	assert.(null,err);

         });

   });
*/

//module.exports=router;

/*app.get('/registration',function(req,res){
  res.sendFile(path.join(__dirname+'/registration.html'));
  //__dirname : It will resolve to your project folder.
});
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/register1.html'));
  //__dirname : It will resolve to your project folder.
});
app.listen(process.env.PORT || 3000,process.env.IP || '0.0.0.0');
console.log("we r listening on port 3000");*/



/*app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  path.resolve(__dirname, 'register.html');
  //It will find and locate index.html from View or Scripts
});

app.listen(3000,function(){
console.log("Running at Port 3000");	
});*/



//var dbconn=MongoClient.connect("mongodb://localhost:27017/");


/*DBM.use(express.static(path.join(__dirname+'public/register.html')));
DBM.listen(process.env.PORT || 3000,process.env.IP || '0.0.0.0');
console.log("we r listening on port 3000");*/

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "saif eddine", address: "Highway 38" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});*/

/*MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});*/

/*MongoClient.connect(url , { useNewUrlParser: true }).then(
  (res) => {
   console.log("Connected to Database Successfully.")
  }
).catch(() => {
  console.log("Conntection to database failed.");
});*/


/**/
/*MongoClient.connect(url,{ useNewUrlParser: true },function(err,db){
  if(err){
      console.log(err);
  }
  else {
      console.log('connected to '+ url);
      db.close();
  }
});*/

/*
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});*/