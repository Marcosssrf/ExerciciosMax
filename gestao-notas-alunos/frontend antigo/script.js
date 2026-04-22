console.log("Olá, mundo! Este é JavaScript rodando.");
// alert("Bem-vindo ao sistema!");

function mudarTexto() {
    document.getElementById("texto").innerText = "Texto alterado!";
}

function adicionarAluno() {
    const nome = prompt("Nome do aluno:");
    if (nome) {
        const li = document.createElement("li");
        li.textContent = nome;
        document.querySelector("#alunos ul").appendChild(li);
    }
}
