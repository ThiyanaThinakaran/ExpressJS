var expr=require('express');  
/*to import expressJS
body parser is required to retrieve data sent through post request*/
var bparser=require('body-parser');
bparserinit=bparser.urlencoded({extended:false});

var app=expr();           // to initialize expressJS environment
var visitorCount=0;


var users=[
{userID:"100",firstName:"Thiya",lastName:"T"},
{userID:"101",firstName:"Rya", lastName:"GS"},
{userID:"103",firstName:"Suji", lastName:"Mohan"},
];



function retrieveUser(request,response)
{
var status=false;
 var userid=request.query.uid;
 var firstName=request.query.fname;
 for(var user of users)
 {
    if(userid==user.userID && firstName==user.firstName)
    {
    status=true;
    break;
   }
}
if(status)
 response.send(user);
else
response.end("<b> No employee with ID </b>"+ userid +"<b> and with Name<b>"+firstName);
}
app.get("/getUser",retrieveUser);



function getall(request,response){
    response.send(users);
}
app.get('/all',getall);



function getByID(request,response){
var status=false;
    var id=request.query.id;
 for(var user of users)
{
    if(id==user.userID)
    {
       status=true;
 response.send(user);
    }
}
}
app.get('/getbyID',getByID);



function deleteByID(request, response) {
    var id = request.query.id;
    var deletedUser = null;  
    for (var i = 0; i < users.length; i++) {
      if (id == users[i].userID) {
        deletedUser = users.splice(i, 1)[0]; // Remove and capture the deleted user
        break;
      }
    }
    if (deletedUser) {
      response.send("User with ID " + id + " has been deleted. Deleted User: " + JSON.stringify(deletedUser));
    } else {
      response.send("User with ID " + id + " not found.");
    }
  }
  app.delete('/deleteByID', deleteByID);




  function addNewUser(request,response){
    var user_id=request.body.uid;
 var first_Name=request.body.fname;
 var last_Name=request.body.lname;
 var rval=users.push({userID:user_id,firstName:first_Name,lastName:last_Name});
 response.send("<b>User Added. Total users : </b>"+ rval);
  }
  app.post('/addUser',bparserinit,addNewUser);



  
  function updateUser(request, response) {
    var user_id = request.query.uid;
    var first_Name = request.query.fname;
    var last_Name = request.query.lname;    
    for (var i = 0; i < users.length; i++) {
      if (user_id == users[i].userID) {
        users[i].firstName = first_Name;
        users[i].lastName = last_Name;
        response.send("User with ID " + user_id + " has been updated.");
        return;
      }
    }
    response.send("User with ID " + user_id + " not found.");
  }
  app.post('/updateUser', bparserinit, updateUser);

  

function home(request,response){
var resp="<html><body><b>Welcome to our Site...<br>";
resp+="<a href=/welcome>Welcome Page</a></body></html>";
response.end(resp); //send response
}
app.get('/',home);



function Welcome(request,response){
var today=new Date();
visitorCount++;
var resp="<html><body><b>Today : "+today;
resp +="<b><br><b> Visitor Count </b>: "+visitorCount;
resp +="</body></html>";
    response.send(resp)
}
app.get('/Welcome',Welcome); //implementing api


function feedback(){
console.log("Server started On Port 8800...");
console.log("open browser and visit http://localhost:8800/welcome");
}
app.listen(8800,feedback)