class Aluno {
    nome: string;
    nota: number;

    constructor(nome: string, nota: number) {
        this.nome = nome;
        this.nota = nota;
    }
}

class Turma {
    alunos: Aluno[];

    constructor() {
        this.alunos = [];
    }

    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
    }

    calcularMedia(): number {
        if (this.alunos.length === 0) return 0;

        let soma = 0;

        for (let aluno of this.alunos) {
            soma += aluno.nota;
        }

        return soma / this.alunos.length;
    }
}

const turma = new Turma();

turma.adicionarAluno(new Aluno("João", 8));
turma.adicionarAluno(new Aluno("Maria", 7));
turma.adicionarAluno(new Aluno("Pedro", 9));

console.log(turma.alunos);
console.log("Média da turma:", turma.calcularMedia());