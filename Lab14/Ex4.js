var fs = require('fs');

var myParser = require('body-parser');

var filename = "user_data.json";
var raw_data = fs.readFileSync(filename, 'utf-8');
var users_reg_data = JSON.parse(raw_data);

//new user manual input 
username = 'newuser';
if (users_reg_data['username'] == undefined)
{
users_reg_data[username] = {}; //creating a new attribute to username
users_reg_data[username].name = 'username';
users_reg_data[username].password = 'newpass';
users_reg_data[username].email = 'newuser@user.com';
}

var output_data = JSON.stringify(users_reg_data); //assign it to a string
fs.writeFileSync(filename, output_data, "utf-8");

console.log(users_reg_data);