module.exports = app => {

    // controllers
    const appController = require("../controllers/app.controller");

    // express router
    var router = require("express").Router();

    router.get("/",appController.index)

    // definindo que https para root/app sejam tratadas pelo router
    app.use('/app', router);


}