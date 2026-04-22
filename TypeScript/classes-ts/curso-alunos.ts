class Pessoa{
    constructor(public nome: string){}
}

class Aluno extends Pessoa{
    constructor(nome: string, public curso: string) {
        super(nome);
    }

    estudar() : string{
        return `${this.nome} está estudando no curso ${this.curso}`;
    }
}

class Curso {
    constructor(public nome: string, public alunos: Aluno[] = []) {}

    adicionarAluno(aluno: Aluno):void{
        this.alunos.push(aluno);
    }

    listarAlunos(): string{
        return `Alunos do curso ${this.nome}: ${this.alunos.map(a => a.nome).join(", ")}`;
    }
}

let curso = new Curso("Sistemas de Informação");
let aluno1 = new Aluno("João", "Sistemas de Informação");
let aluno2 = new Aluno("Ana", "Sistemas de Informação");
curso.adicionarAluno(aluno1);
curso.adicionarAluno(aluno2);

console.log(aluno1.estudar());
console.log(curso.listarAlunos());
