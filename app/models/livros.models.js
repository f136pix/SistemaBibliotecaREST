class Livro {
  constructor(nome, autor, sinapse, generos, emprestado, img) {
    this.nome = nome;
    this.autor = autor;
    this.sinapse = sinapse;
    this.generos = generos
    this.emprestado = emprestado;
    this.img = img;
  }
}

module.exports = Livro;