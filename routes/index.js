var loggedInUsers = {};
var userArray = ['Chris', 'Lucas', 'Muhammad', 'Lee', 'Louis Nel'];//HARD PROGRAMMED USERS
var passwords = ['ta1', 'ta2', 'ta3', 'ta4', 'prof', '2406A'];     //HARD PROGRAMMED PASSWORDS
var LoggedIn  = 'TheUserIsLoggedIn';
//var startTime = ['','','',''];
//var deadLine  = ['','','',''];


function index(req, res) {
    if (req.session.username) {
        res.redirect("/users");
    } else {
	res.render('index', { title: 'COMP 2406 Fall 2014 Assignment Grading', 
			      error: req.query.error });
    }
}

function users(req, res) {
    if (req.session.accessLvl === 0) {
        res.render("account0.jade", {username:req.session.username,//Depending on Level of access
                                   title:"Account",
				                   loggedInUsers: loggedInUsers}); //Render one of 3 account.jade
    } else if(req.session.accessLvl === 1){
        res.render("account1.jade", {username:req.session.username,//pages, with varying degrees
                                   title:"Account",
				                   loggedInUsers: loggedInUsers}); //of access.
    } else if(req.session.accessLvl === 2){
        res.render("account2.jade", {username:req.session.username,//0=no access/student, 1=completion/TA
                                   title:"Account",
				                   loggedInUsers: loggedInUsers}); //2=start/deadline/Prof
    } else {
	   res.redirect("/?error=Not Logged In");
    }
}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    for (i=0; i<4;i++)
    {
        if(userArray[i] === username && passwords[i] === password)//Check if the user is one of the TA's
        {
            req.session.username = username;
            loggedInUsers[username] = LoggedIn;
            req.session.accessLvl = 1
            res.redirect("/users");
        }
    }
    if(password === passwords[4] && username === userArray[4]) //Check if the user is the prof
    {
        req.session.username = username;
        loggedInUsers[username] = LoggedIn;
        req.session.accessLvl = 2;
        res.redirect("/users");
    }
    else if (username != "" && password === passwords[5]) //Check if user is student, username can't be blank/needs correct password
    {    
        req.session.username = username;
        loggedInUsers[username] = LoggedIn;
        req.session.accessLvl = 0;
        res.redirect("/users");
    } else
    {
        res.redirect("/?error=Wrong Username/Password");//wrong user or password
    }
}

function logout(req, res) {
    delete loggedInUsers[req.session.username];
    req.session.destroy(function(err){
        if(err){
            console.log("Error: %s", err); //unchanged
        }
    });
    res.redirect("/");
}

//function update(req, res) {//unchanged
   // for(i=0;i<4;i++)
   // {
   //     startDate[i] = req.body.startDate+''+i+'';
   //     deadLine[i]  = req.body.deadLine+''+i+'';
   // }
//}

exports.index  = index;
exports.users  = users;
exports.login  = login;
exports.logout = logout;
//exports.update = update;
