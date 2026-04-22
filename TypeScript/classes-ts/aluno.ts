class Aluno {
    // nome: string;
    // idade: number;
    // matricula: string;

    constructor(public nome: string, public idade: number, public matricula: string)  {}

    apresentar(): string {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`;
    }
}

class Bolsista extends Aluno {
    bolsa: number;

    constructor(nome: string, idade: number, matricula: string, bolsa: number) {
        super(nome, idade, matricula);
        this.bolsa = bolsa;
    }

    apresentar(): string {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula} e eu recebo ${this.bolsa} `;
    }


}


let aluno1 = new Aluno("João Silva", 20, "2023001");
let aluno2 = new Aluno("Maria Oliveira", 22, "2023002");
let aluno3 = new Bolsista("Maria", 23, "2023003", 1000);

console.log(aluno1.apresentar());
console.log(aluno2.apresentar());
console.log(aluno3.apresentar());