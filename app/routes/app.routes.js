const appController = require("../controllers/app.controller");
module.exports = app => {

    // controllers
    const appController = require("../controllers/app.controller");

    // express router
    var router = require("express").Router();

    router.get("/home",appController.index)

    router.get("/",appController.home)
    // definindo que https para root/app sejam tratadas pelo router
    app.use('/', router);


}