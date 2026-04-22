class Livro{
    nome: string;
    autor: string;

    constructor(nome: string, autor: string) {
        this.nome = nome;
        this.autor = autor;
    }
}

class Biblioteca {
    livros: Livro[];

    constructor() {
        this.livros = [];
    }

    adicionarLivro(livros: Livro): string {
        this.livros.push(livros);
        return `Livro ${this.livros} adicionado`;
    }
}

let biblioteca = new Biblioteca();

biblioteca.adicionarLivro(new Livro("Don casmurro", "Machado de Assis"))
biblioteca.adicionarLivro(new Livro("Memorias Postumas de Bras Cubas", "Machado de Assis"))

console.log(biblioteca);
