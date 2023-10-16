const {admin, db} = require("../config/db.config")
const {getAuth} = require("firebase-admin/auth");
const REDIRECT_LOGIN = "/user/login";
const session = require('express-session')

function authenticate(req, res, next) {

    let header = req.session.idToken


    try {
        const token = header.substring(7, header.length);

        if (!header || !header.startsWith("Bearer ")) {
            res.redirect(REDIRECT_LOGIN)
        }

        getAuth()
            .verifyIdToken(token)
            .then(async (decodedToken) => {
                console.log("Token autorizado")
                const uid = decodedToken.uid;
                const userDoc = await db.collection('users').doc(uid).get() // current user doc por id
                res.locals.uid = uid;
                req.session.userData = userDoc._fieldsProto
                next();
            })
            .catch((error) => {
                console.log(error)
                res.redirect(REDIRECT_LOGIN)
            });
    } catch (err) { // tratando sessão destroyed() / não autenticada
        console.log('Não autenticado')
        req.session.error = "Você não está autenticado"
        res.redirect(REDIRECT_LOGIN)
    }
}

//reference => https://firebase.google.com/docs/auth/admin/manage-sessions
module.exports = authenticate;