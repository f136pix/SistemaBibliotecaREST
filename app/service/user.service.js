const {db} = require('../config/db.config');
const usersRef = db.collection('users');

const {createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} = require("firebase/auth");
const {auth} = require('../config/db.config');

// lodash usado para formatar os dados
var _ = require("lodash");
const {FirebaseError} = require('firebase/app');

exports.authenticateUser = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            return userCredential.user;
        })
}

exports.registerUser = async (data) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario criado:", user);
        })
}

exports.sendEmailPassword = async (data) => {
    await sendPasswordResetEmail(auth, data.email)
    return data.email

}





