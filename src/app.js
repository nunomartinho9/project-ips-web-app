const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const options = require("./config/options.json").server;
const passport = require("passport");
require("./config/passport")(passport);
var favicon = require('serve-favicon');
const path = require("path");
const app = express();

/**
 * Middleware
 */

// Templates EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set('views', path.join(__dirname,"views"));

// Static
app.use(express.static("www"));
app.use(express.static(__dirname + '/www'));
app.use(favicon(__dirname + `/www/images/${options.favicon}`));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Flash
app.use(flash());

// Express Session
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

// Passport
app.use(passport.initialize());
app.use(passport.session());

//Variaveis Globais
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

/**
 * Fim do Middleware
 */

 // Roteamento
app.use(require("./routes/index.routes"));
app.use(require("./routes/user.routes"));
app.use(require("./routes/monitor.routes"));
app.use(require("./routes/data.routes"));

//Por o servidor á escuta
app.listen(options.port, function() {
    console.log(`Server running at http://localhost:${options.port}`);
});

