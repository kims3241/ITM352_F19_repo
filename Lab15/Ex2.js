var express = require("express");
var app = express();
var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
var filename = "user_data.json";

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<center><body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body></center>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(user_product_quantities);
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') {
        if (users_reg_data[the_username].passwors == request.body.password) {
            //make the quesry string of prod quant needed for invoice
            theQuantQuerystring = qs.stringify(user_product_quantities);
            //response.redirect('/invoice.html?' + theQuanQuerystring);

            if (typeof request.session.last_login != 'undefined') {
                var msg = `You last logged in at ${request.session.last_login}`;
                var now = new Date();
            }
            request.session.last_login = now;
            response.send(`${msg}<BR>${the_username} logged in at ${now}`);
        } else {
            response.redirect('/login');
        }
    }
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

app.use(session({ secret: "ITM352 rocks!" }));

app.get('/use_session', function (request, response) {
    response.send(`Your session ID is: ${request.sessionID}`); //this will give us a session id, it will be different when we reload the server
});

app.get('/set_cookie', function (request, response) {
    response.cookie('myname', 'Scott Kim', { maxAge: 10000 }).send('cookie set'); //maxage measurses howmany Ms does the session expire
});

app.get('/use_cookie', function (request, response) {
    output = "No myname cookie found";
    if (typeof request.cookies.myname != 'undefined') {
        response.send(`Welcome to the Use Cookie Page ${request.cookies.myname}`);
    }
    response.send(output);
});

app.get('del_cookie', function (request, response) {
    response.clearCookie('myname');
    response.send('cookie myname cleared');
});

app.use(express.static(','));
app.listen(8080, () => console.log(`listening on port 8080`));