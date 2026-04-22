class Aluno {
    private notas: number[] = [];
    constructor(public nome: string, public matricula: string) { }

    adicionarNota(nota: number): void {
        if (nota >= 0 && nota <= 10) {
            this.notas.push(nota);
        } else {
            console.log("Nota inválida. A nota deve ser entre 0 e 10.");
        }
    }

    calcularMedia(): number {
        if (this.notas.length === 0) {
            return 0;
        }
        const soma = this.notas.reduce((total, notas) => total + notas, 0);
        return soma / this.notas.length;
    }

    verificarAprovacao(): string {
        const media = this.calcularMedia();
        return media >= 7 ? `${this.nome} foi aprovado(a) com média ${media}.` : `${this.nome} foi reprovado(a) com média ${media}.`;
    }
}

let aluno = new Aluno("Lucas", "2023005");
aluno.adicionarNota(8);
aluno.adicionarNota(9);
aluno.adicionarNota(6);
console.log(aluno.verificarAprovacao());
