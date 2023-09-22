module.exports = app => {

    // controllers
    const userController = require("../controllers/user.controller");

    // express router
    var router = require("express").Router();

    router.get("/login",userController.loginPage)

    router.post("/login", userController.loginAuthentication)

    router.get("/register",userController.registerPage)

    router.post("/register",userController.registerUser)

    router.get("/",userController.nomeUsers)

    router.get("/:id",userController.userPorId)

    router.post("/criar",userController.criarUser)

    router.delete("/:id",userController.deletarUser)
    // definindo que https para root/api sejam tratadas pelo router
    app.use('/user', router);


}