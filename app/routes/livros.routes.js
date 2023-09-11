module.exports = app => {

    // controllers
    const livrosController = require("../controllers/livros.controller");

    // express router
    var router = require("express").Router();

    // pegando todos os livros
    router.get("/",livrosController.titulosLivros)

    // criando um novo livro
    router.post("/criar",livrosController.criarLivros)

    // definindo que https para root/api/tutoriais sejam tratadas pelo router
    app.use('/api/tutoriais', router);


}