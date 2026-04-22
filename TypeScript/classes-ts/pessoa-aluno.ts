class Pessoa {
    constructor(public nome: string, public idade: number) { }

    apresentar(): string {
        return `Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`;
    }
}

class Aluno extends Pessoa {
    constructor(nome: string, idade: number, public matricula: string) {
        super(nome, idade);
    }
    apresentar(): string {
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}.`;
    }

    estudar(): string {
        return `${this.nome} está estudando.`;
    }
}

let pessoa = new Pessoa("Carlos", 30);
let aluno = new Aluno("Maria", 22, "2023004");

console.log(pessoa.apresentar());
console.log(aluno.apresentar());
console.log(aluno.estudar());
// console.log(aluno.idade); // Erro! idade é protected
