const { db } = require('../config/db.config');
const usersRef = db.collection('users');

const {createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../config/db.config');

// lodash usado para formatar os dados
var _ = require("lodash");
const { FirebaseError } = require('firebase/app');


exports.registerUser = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try{
  await createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Usuario criado:", user);
  })
} catch(err)  {
    throw(err)
  }
}


exports.authenticateUser = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    await signInWithEmailAndPassword
    const userCredential = await auth(auth, data.email, data.passord)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}
