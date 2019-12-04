
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
var data = require('./public/products_data.js');
var products = data.products;
var filename = "public/user_registration_info.json";
var qs = require('querystring');


// Function to test if a string is a non-negative integer
function isNonNegInt(q, returnErrors = false) {
    errors = []; // assume no errors at first
    if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);

}


// Initialize Express
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next();
});

app.use(myParser.urlencoded({ extended: true }));
// Set up the path and handler for POST requests
app.post("/process_form", function (request, response, next) {
    let POST = request.body;
    // response.send(POS)
    process_quantity_form(POST, response);

});

//Only open the file if it exissts 
if (fs.existsSync(filename)) {
    var raw_data = fs.readFileSync(filename, 'utf-8');
    var users_reg_data = JSON.parse(raw_data);
    console.log(users_reg_data);

    fstats = fs.statSync(filename);
    console.log(filename + "has " + fstats.size + " character");
}
else {
    console.log('File ' + filename + " doesnt exist!");
}
//Login exising user 
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
<input type="rediret" valu="
</form>
</body>
    `;
    response.send(str);
});



app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body> 
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});
//Assignment 2 workshop
var user_product_quantities = {};

app.get("/purchase", function (request, response) {
    // get quantity data from query string 
    user_product_quantities = request.query;
    console.log(user_product_quantities);

    //validate the quantities; if not valid go back to purchase page
    // if valid go to login 
    response.redirect('login'); 
});
//Register new uer 
app.post("/register", function (request, response) {
    // process a simple register form
    console.log("Got the regristration request");
    let POST = request.body;

    //new user manual input 
    username = POST.username;
    if (users_reg_data[username] == undefined) {
        users_reg_data[username] = {}; //creating a new attribute to username
        users_reg_data[username].name = username; //push new username
        users_reg_data[username].password = POST.password; //push password for username
        if (POST.password != POST.repeat_password) {
            alert("Password do not match!");
        }
        users_reg_data[username].email = POST.email;

        var output_data = JSON.stringify(users_reg_data); //assign it to a string
        fs.writeFileSync(filename, output_data, "utf-8");

        response.send("User " + username + " resgistered");

    }
    else {
        response.send("User " + username + " already taken; try another username.");
    }
});


app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    let POST = request.body;
    console.log(POST);

    if (typeof POST['submit'] == undefined) {
        //Check if the submit button was pressed 
        console.log('No form data');
    } else {
        //User submitted a serid and password. TEst the for validity 
        if (users_reg_data[POST.username] != undefined) {
            if (POST.password === users_reg_data[POST.username].password) {
                theQueryString = qs.stringify(user_product_quantities); //convert user_product_quantites into a string 
                response.redirect("/invoice.html?" + theQueryString); // 
            }
            else {
                response.redirect("/login"); 
            }
        } else {
            console.log("User " + POST.username + " note found");
            response.redirect('login'); //redirects to login 
        }
    }
});


// Look for files in the "public" folder and listen on port 8080
app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));