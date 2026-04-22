class Professor{
    constructor(public nome: string, public disciplina: string) {}

    ensinar(): string{
        return `O professor ${this.nome} esta dando ministrando a materia de ${this.disciplina}`
    }

}

let professor1 = new Professor("Maxwell", "Dados")
let professor2 = new Professor("Felix", "PhP")

console.log(professor1.ensinar());
console.log(professor2.ensinar());


