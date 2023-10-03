const session = require('express-session');
const authenticate = require("../middleware/authenticate");

module.exports = app => {

    // controllers
    const appController = require("../controllers/app.controller");

    // express router
    var router = require("express").Router();

    app.use(session({
        secret: 'system-154391',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Adjust this for production, consider using HTTPS
      }));
      
    router.use(authenticate)

    router.get("/dashboard",appController.dashboard)

    
    // definindo que https para root/app sejam tratadas pelo router
    app.use('/app', router);


}