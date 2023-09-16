const config = require("../config/db.config");

// lodash usado para formatar os dados
var _ = require('lodash');

// nosso banco
const db = config.db;

// salvando a collections "livros"
const livrosRef = db.collection('livros');


// GET /api/{q}
exports.getLivros = async (q) => {

    let collection = await livrosRef.get();

    console.log("Query : " + q)

    if (q.length > 0) {
        collection = await livrosRef.where("nome", ">=", _.startCase(q)).get() // realizando o query dos livros caso nos tenha sido passado um url param
    }

    if (collection.empty) {
        const error = new Error("Nenhum livro com este titulo foi encontrado");
        error.statusCode = 404;
        throw error; // caso nenhum livro seja encontrado enviando 404
    }

    const itens = [];

    collection.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        itens.push(doc.data());
    })

    return itens;
}

// GET /api/{id}
exports.getById = async (id) => {
    try {

        const doc = await livrosRef.doc(id).get()
        const data = doc.data();

        if (!data) {
            const error = new Error("Nenhum livro com este ID foi encontrado")
            error.statusCode = 404; // caso nenhum livro com o id seja encontrado
            throw error;
        }

        return data;
    } catch (error) {
        console.error("Houve um erro ao consultar o documento : " + error)
        throw error
    }
}

// POST /api/criar req body : {nome, titulo, sinapse, emprestado, img}
exports.criarLivros = async (req) => {

    const data = req.body

    // criando o model do livro que sera adicionado
    const novoLivro = {
        nome: _.startCase(data.nome),
        autor: _.startCase(data.autor),
        sinapse: _.capitalize(data.sinapse),
        generos: data.generos,
        emprestado: data.emprestado,
        img: data.img
    }


    // verificando se um livro com o mesmo nome ja existe
    const collection = await livrosRef.where("nome", "==", novoLivro.nome).get()

    if (!collection.empty) {
        const error = new Error("Já há um livro com este titulo")
        error.statusCode = 400;
        throw error; // caso já haja um livro com este titulo, realizando o throw de um error bad request
    }

    // verificando se todas as propriedades estão preenchidas
    if (Object.values(novoLivro).length < 6) {
        const error = new Error("Todas as propriedades devem estar preenchidas")
        error.statusCode = 400;
        throw error; // caso faltem informações preenchidas, enviando um bad request
    }

    try {
        const docRef = await livrosRef.add(novoLivro);
        console.log("Criado documento com ID:", docRef.id);

        const doc = await livrosRef.doc(docRef.id).get();
        const livroCriado = doc.data();

        return livroCriado;

    } catch (error) {
        console.error("Houve um erro ao criar o documento:", error);
        throw error;
    }
};

// DELETE /api/delete/{id}
exports.deletarLivros = async (id) => {
    try {
        const doc = livrosRef.doc(id);
        let data = await doc.get()
        data = data.data()

        console.log(data)

        if (!data) {
            const error = new Error("Nenhum livro com este ID foi encontrado")
            error.statusCode = 404; // caso nenhum livro com o id seja encontrado
            throw error;
        }

        doc.delete()
        return 

    } catch (err) {
        console.error("Houve um erro ao deletar o documento");
        throw (err)
    }
}
