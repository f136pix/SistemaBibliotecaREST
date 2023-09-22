const config = require("../config/db.config");

// lodash usado para formatar os dados
var _ = require("lodash");

// nosso banco
const db = config.db;

// auth firestore
const auth = config.auth;





// salvando a collections "livros"
const usersRef = db.collection("users");

exports.registerUser = async (data) => {
  try {
    const userResponse = await auth.createUser({
      email: data.email,
      password: data.password,
      emailVerified: false,
      disabled: false,
      displayName: data.nome + " " + data.sobrenome
    });
    return userResponse;
  } catch (err) {
    console.error("Houve um erro ao criar o User");
    throw err;
  }
};

exports.authenticateUser = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    
    const userCredential = await auth(auth, data.email, data.passord)
    return userCredential.user;
  } catch (error) {
    throw error;
  }
}
