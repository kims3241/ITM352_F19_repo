var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require('body-parser');

app.use(myParser.urlencoded({ extended: true }));

var filename = "user_data.json";

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
app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
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
                console.log("Got a good password");
            }
            else {
                console.log("Try again!");
            }
        } else {
            console.log("User " + POST.username + " note found");
        }
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));