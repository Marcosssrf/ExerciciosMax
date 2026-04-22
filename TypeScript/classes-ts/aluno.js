"use strict";
class Aluno {
    nome;
    idade;
    matricula;
    constructor(nome, idade, matricula) {
        this.nome = nome;
        this.idade = idade;
        this.matricula = matricula;
    }
    apresentar() {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`;
    }
}
let aluno1 = new Aluno("João Silva", 20, "2023001");
let aluno2 = new Aluno("Maria Oliveira", 22, "2023002");
console.log(aluno1.apresentar());
console.log(aluno2.apresentar());
