// importando os services
const service = require("../service/user.service")

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

