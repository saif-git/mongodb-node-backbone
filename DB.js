

var mysql=require('mysql');
var conn=mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sails"
});
var http = require('http');


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<input type="text" placeholder="add some things" name="test"> <h1 style="color:red">{{test}}</h1>');
}).listen(3000);

/*sql="select email from user";


conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " + JSON.stringify(result));
  });
});*/
/*var sql="INSERT INTO user (name,email, password) VALUES ('haythem', 'Haythoum@live.fr','haytho')";

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  conn.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Result: " +JSON.stringify(result) );
  });
});*/