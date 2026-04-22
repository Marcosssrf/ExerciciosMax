class Aluno {
    constructor(public nome: string, public idade: number, public matricula: string) { }

    private calcularIdadeFutura(anos: number): number {
        return this.idade + anos;
    }

    apresentar(): string {
        const idadeFutura = this.calcularIdadeFutura(5);
        return `Olá, meu nome é ${this.nome}, tenho ${this.idade} anos e minha matrícula é ${this.matricula}. Em 5 anos, terei ${idadeFutura} anos.`;
    }

}

let aluno = new Aluno("Ana Costa", 20, "2023003");
console.log(aluno.apresentar());
// console.log(aluno.idade); // Erro! idade é private
// console.log(aluno.calcularIdadeFutura(5)); // Erro! calcularIdadeFutura é private
