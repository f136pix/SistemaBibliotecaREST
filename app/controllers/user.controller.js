const service = require("../service/user.service");

const REDIRECT_LOGIN = "/user/login";
const REDIRECT_REGISTER = "/user/register";


// GET /login
exports.loginPage = async (req, res) => {
  const { error, success } = req.session;
  req.session.error = "";
  req.session.success = "";
  res.render('login', { error, success });
}

// POST /login
exports.loginAuthentication = async (req, res) => {
  try{
  const user = await service.authenticateUser(req.body)
  req.session.userId = user.uid; 
  res.redirect("/dashboard")
} catch (err) {
  req.session.error = err.message;
  res.redirect(REDIRECT_LOGIN)
  console.log(err)
}
}

// GET /register
exports.registerPage = async (req, res) => {
  const { error } = req.session;
  req.session.error = "";
  req.session.success = "";
  res.render("register", { error, success: "" });
}


// POST /registrar
exports.registerUser = async (req, res) => {
  try {
    await service.registerUser(req.body);
    req.session.error = "";
    req.session.success = "Usuario Cadastrado com Sucesso";
    res.redirect(REDIRECT_LOGIN);
  } catch (err) {
    req.session.error = err.message;
    req.session.success = "";
    res.redirect(REDIRECT_REGISTER);
    console.error(err);
  }
}

// GET root/api/{query}
exports.nomeUsers = async (req, res) => {
  try {
    const users = await service.getUsers(req.query.titulo);
    res.status(200).json({ users });
  }
  catch (err) {
    if (err.statusCode === 404) {
      res.status(404).json({ message: err.message }); 
    } else {
        console.error(err); // exibindo o erro para debugging
        res.status(500).json({ message: err.message || "Houve um erro ao filtrar os Users" });
      }
    }
  };

  
  // GET roor/api/{id}
  exports.userPorId = async(req, res) => {
    try{
      const id = req.params.id;
      const user = await service.getById(id)
      res.status(200).json({ user })
    } catch (err) {
      if (err.statusCode == 404) {
        res.status(404).json({ message: err.message });
      } else {
      res.status(500).json({ message: err.message || "Nenhum user com este Id foi encontrado" })
      }
    }
  }

  // POST root/api/criar  
  exports.criarUser = async (req, res) => {
    try {
      const userCriado = await service.criarUsers(req);
      res.status(200).json({ userCriado })
    } catch (err) {
      if (err.statusCode == 400) {
        res.status(400).json({ message : err.message })
      } else {
        console.error(err)
        res.status(500).json({ message : err.message || "Houve um erro ao registrar o User, tente novamente mais tarde" })
      }
    }
  }

  // DELETE root/api/id
  exports.deletarUser = async (req, res) => {
    try {
      const id = req.params.id;
      await service.deletarUser(id)
      res.status(204).json()
    } catch (err) {
      if(err.statusCode == 404) {
        res.status(404).json({message : err.msg})
      } else {
      res.status(500).json({ message : err.message || "Houve um erro ao deletar o User, tente novamente mais tarde" })
      }
    }
  }

