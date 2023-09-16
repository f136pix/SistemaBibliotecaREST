// importando os services
const service = require("../service/livros.service")

// GET root/api/{query}
exports.titulosLivros = async (req, res) => {
  try {
    const livros = await service.getLivros(req.query.titulo);
    res.status(200).json({ livros });
  }
  catch (err) {
    if (err.statusCode === 404) {
      res.status(404).json({ message: err.message }); 
    } else {
        console.error(err); // exibindo o erro para debugging
        res.status(500).json({ message: err.message || "Houve um erro ao filtrar os Livros" });
      }
    }
  };

  
  // GET roor/api/{id}
  exports.livroPorId = async(req, res) => {
    try{
      const id = req.params.id;
      const livro = await service.getById(id)
      res.status(200).json({ livro })
    } catch (err) {
      if (err.statusCode == 404) {
        res.status(404).json({ message: err.message });
      } else {
      res.status(500).json({ message: err.message || "Nenhum livro com este Id foi encontrado" })
      }
    }
  }

  // POST root/api/criar  
  exports.criarLivros = async (req, res) => {
    try {
      const livroCriado = await service.criarLivros(req);
      res.status(200).json({ livroCriado })
    } catch (err) {
      if (err.statusCode == 400) {
        res.status(400).json({ message : err.message })
      } else {
        console.error(err)
        res.status(500).json({ message : err.message || "Houve um erro ao registrar o livro, tente novamente mais tarde" })
      }
    }
  }

  // DELETE root/api/id
  exports.deletarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await service.deletarLivros(id)
      res.status(204).json()
    } catch (err) {
      if(err.statusCode == 404) {
        res.status(404).json({message : err.msg})
      } else {
      res.status(500).json({ message : err.message || "Houve um erro ao deletar o livro, tente novamente mais tarde" })
      }
    }
  }