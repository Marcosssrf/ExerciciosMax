"use strict";
class Pessoa {
    nome;
    idade;
    constructor(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    apresentar() {
        return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
}
class Aluno extends Pessoa {
    matricula;
    constructor(nome, idade, matricula) {
        super(nome, idade);
        this.matricula = matricula;
    }
    apresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`;
    }
    estudar() {
        return `${this.nome} está estudando.`;
    }
}
let pessoa = new Pessoa("Carlos", 30);
let aluno = new Aluno("Maria", 22, "2023004");
console.log(pessoa.apresentar());
console.log(aluno.apresentar());
console.log(aluno.estudar());
// console.log(aluno.idade); // Erro! idade é protected
