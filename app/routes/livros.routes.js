module.exports = app => {

    // controllers
    const livrosController = require("../controllers/livros.controller");

    // express router
    var router = require("express").Router();

    router.get("/",livrosController.titulosLivros)

    router.get("/:id",livrosController.livroPorId)

    router.post("/criar",livrosController.criarLivros)

    router.delete("/:id",livrosController.deletarLivro)
    // definindo que https para root/livros sejam tratadas pelo router
    app.use('/livros', router);


}