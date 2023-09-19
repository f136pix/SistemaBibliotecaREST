module.exports = app => {

    // controllers
    const userController = require("../controllers/user.controller");

    // express router
    var router = require("express").Router();

    router.get("/login",userController.loginPage)

    router.get("/",userController.nomeUsers)

    router.get("/:id",userController.userPorId)

    router.post("/criar",userController.criarUser)

    router.delete("/:id",userController.deletarUser)
    // definindo que https para root/api sejam tratadas pelo router
    app.use('/user', router);


}