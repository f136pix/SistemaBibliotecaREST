const config = require("../config/db.config")

// nosso banco
const db = config.db

// salvando a collections "livros"
const livrosRef = db.collection('livros');

// puxando todos os livros
exports.titulosLivros = async (req, res) => {
  try {
    const collection = await livrosRef.get();
    if (!collection.empty) {  // verificando se a collection esta vazia
      collection.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
      });
    }
    else {
      console.log("Não há nenhum livro na coleção")
      return
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "Houve um erro ao filtrar os Livros" })
  }
}

// criando um novo livro
exports.criarLivros = async (req, res) => {
  try {
    const novoLivro = {
      titulo: req.body.titulo,
      autor: req.body.autor,
      ano: req.body.ano,
      emprestado: false
    };

    const docRef = await livrosRef.add(novoLivro);
    console.log(docRef.id);

    // enviando resposta ao client
    res.send({ message: "Livro criado com sucesso! ID : " + docRef.id });
  } catch (error) {
    console.error("Erro ao criar o livro:", error);
    // avisando possiveis erros
    res.status(500).send({ error: "Erro ao criar o livro" });
  }
}


