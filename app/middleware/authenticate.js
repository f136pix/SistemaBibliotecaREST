const {admin} = require("../config/db.config")
const {getAuth} = require("firebase-admin/auth");
const REDIRECT_LOGIN = "/user/login";

function authenticate(req, res, next) {

    let header = req.session.idToken

    try {
        const token = header.substring(7, header.length);

        if (!header || !header.startsWith("Bearer ")) {
            res.redirect(REDIRECT_LOGIN)
        }

        getAuth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                console.log("Token autorizado")
                const uid = decodedToken.uid;
                next();
            })
            .catch((error) => {
                console.log(error)
                res.redirect(REDIRECT_LOGIN)
            });

        next();
    } catch (err) {
        res.redirect(REDIRECT_LOGIN)
    }
}

//reference => https://firebase.google.com/docs/auth/admin/manage-sessions
module.exports = authenticate;