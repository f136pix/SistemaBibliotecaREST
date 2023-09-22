// importando as libs
const express = require("express")
const bodyParser = require("body-parser");
const ejs = require('ejs');
var session = require('express-session')


const app = express()

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
}));

// parses do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parse do body parser
app.use(bodyParser.json());

// pasta onde estao os css
app.use(express.static(__dirname + '/public'));

// setando o uso do ejs
app.set('view engine', 'ejs');

// routers
require("./app/routes/app.routes")(app)
require("./app/routes/livros.routes")(app)
require("./app/routes/user.routes")(app)
// abrindo o localhost 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor aberto em ${PORT}.`);
});