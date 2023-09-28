module.exports = app => {

    // controllers
    const homeController = require("../controllers/home.controller");

    // express router
    var router = require("express").Router();

    router.get("/home",homeController.index)

    router.get("/",homeController.home)
    // definindo que https para root/app sejam tratadas pelo router
    app.use('/', router);


}