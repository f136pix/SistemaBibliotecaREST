// importando as libs
const express = require("express")

// importando as configs do db
const config = require("./app/config/db.config")

const app = express()

// parses do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conectando ao css
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.json({ message: "OLA" });
  });

// router trata de req para root/api/tutoriais
require("./app/routes/livros.routes")(app)

// abrindo o localhost 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor aberto em ${PORT}.`);
});