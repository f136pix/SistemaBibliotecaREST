const service = require("../service/user.service");
const {AuthErrorCodes} = require('firebase/auth');
// const firebase = require("firebase/compat");
const session = require('express-session')

const REDIRECT_LOGIN = "/user/login";
const REDIRECT_REGISTER = "/user/register";
const REDIRECT_RECUPERAR = "/user/recuperar";
const REDIRECT_DASHBOARD = "/app/dashboard";


// GET /login
exports.loginPage = async (req, res) => {
    const {error, success} = req.session;
    req.session.error = "";
    req.session.success = "";
    res.render('login', {error, success});
}

// POST /login
exports.loginAuthentication = async (req, res) => {
    try {
        const token = await service.authenticateUser(req.body)
        req.session.idToken = `Bearer ${token}`;

        res.redirect(REDIRECT_DASHBOARD)
    } catch (err) {
        if (err.code === AuthErrorCodes.INVALID_EMAIL) {
            req.session.error = "Endereço de email invalido"
            req.session.success = ""
            res.redirect(REDIRECT_LOGIN)
            return
        }

        if (err.code === AuthErrorCodes.INVALID_PASSWORD || err.code === AuthErrorCodes.USER_DELETED || err.code === AuthErrorCodes.INVALID_AUTH) {
            req.session.error = "Endereço de email ou senha incorreta";
            req.session.success = "";
            res.redirect(REDIRECT_LOGIN);
            return
        } else {
            req.session.error = "Verifique se o email e senha inseridos estão corretos";
            req.session.success = "";
            res.redirect(REDIRECT_LOGIN);
            console.log(err)

        }

    }
}

// GET /register
exports.registerPage = async (req, res) => {
    const {error} = req.session;
    req.session.error = "";
    req.session.success = "";
    res.render("register", {error, success: ""});
}


// POST /registrar
exports.registerUser = async (req, res) => {
    try {
        await service.registerUser(req.body);
        req.session.error = "";
        req.session.success = "Usuario Cadastrado com Sucesso";
        res.redirect(REDIRECT_LOGIN);
    } catch (err) {
        if (err.code === AuthErrorCodes.WEAK_PASSWORD) { // senha fraca
            req.session.error = "A senha é muito fraca";
            req.session.success = "";
            res.redirect(REDIRECT_REGISTER);
            return
        }

        if (err.code === AuthErrorCodes.EMAIL_EXISTS) { // senha fraca
            req.session.error = "Este email já esta cadastrado";
            req.session.success = "";
            res.redirect(REDIRECT_REGISTER);
            return
        }

        if (err.code === AuthErrorCodes.INVALID_EMAIL) { // senha fraca
            req.session.error = "Por favor, insira um email válido";
            req.session.success = "";
            res.redirect(REDIRECT_REGISTER);
            return
        }
        if (err.statusCode === 400) {
            req.session.error = "As senhas devem coincidir";
            req.session.sucess = "";
            res.redirect(REDIRECT_REGISTER);
        } else {
            req.session.error = err.message || err;
            req.session.success = "";
            res.redirect(REDIRECT_REGISTER);
            console.error(err);
        }
    }
}

// GET /recuperar
exports.recuperarSenha = async (req, res) => {
    const {error, success} = req.session;
    req.session.error = "";
    req.session.success = "";
    res.render('reset-password', {error, success});
}

exports.sendRecuperarEmail = async (req, res) => {
    try {
        const email = await service.sendEmailPassword(req.body)
        req.session.error = "";
        req.session.success = "Foi enviado um email para " + email + " para redefinição de senha"
        res.redirect(REDIRECT_LOGIN)
    } catch (err) {
        req.session.success = "";
        req.session.error = "Insira um email válido";
        console.error((err))
        res.redirect(REDIRECT_RECUPERAR);
    }
}

// GET root/api/{query}
exports.nomeUsers = async (req, res) => {
    try {
        const users = await service.getUsers(req.query.titulo);
        res.status(200).json({users});
    } catch (err) {
        if (err.statusCode === 404) {
            res.status(404).json({message: err.message});
        } else {
            console.error(err); // exibindo o erro para debugging
            res.status(500).json({message: err.message || "Houve um erro ao filtrar os Users"});
        }
    }
};


// GET roor/api/{id}
exports.userPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await service.getById(id)
        res.status(200).json({user})
    } catch (err) {
        if (err.statusCode == 404) {
            res.status(404).json({message: err.message});
        } else {
            res.status(500).json({message: err.message || "Nenhum user com este Id foi encontrado"})
        }
    }
}

// POST root/api/criar
exports.criarUser = async (req, res) => {
    try {
        const userCriado = await service.criarUsers(req);
        res.status(200).json({userCriado})
    } catch (err) {
        if (err.statusCode == 400) {
            res.status(400).json({message: err.message})
        } else {
            console.error(err)
            res.status(500).json({message: err.message || "Houve um erro ao registrar o User, tente novamente mais tarde"})
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
        if (err.statusCode == 404) {
            res.status(404).json({message: err.msg})
        } else {
            res.status(500).json({message: err.message || "Houve um erro ao deletar o User, tente novamente mais tarde"})
        }
    }
}

// POST root/logout
exports.logout = async (req, res) => {
     try {
        await req.session.destroy();
        res.redirect(REDIRECT_DASHBOARD) // middlewere tratara da sessão destroyed
    } catch (err) {
        console.log(err)
    }
}



