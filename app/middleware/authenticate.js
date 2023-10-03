const {admin} = require("../config/db.config")

function authenticate(req, res, next) {
 
console.log("teste")
 const token = req.session.user

 console.log(token)

 if (!token) {
  res.statusMessage = 'Token Invalido, acesso negado'
  return res.status(401).send('Token Invalido, acesso negado')
 }
 
//reference => https://firebase.google.com/docs/auth/admin/manage-sessions
 
 admin.auth().verifyIdToken(token)
  .then(function (decodedToken) {
 
   // enviando uid ao body para uso do route
   req.headers.uid = decodedToken.uid;
   next();
  })
  .catch(function (error) {
   console.log(error);
   res.status(401).send('Unauthorized token. Access Denied')
  });
 
}

module.exports = authenticate;