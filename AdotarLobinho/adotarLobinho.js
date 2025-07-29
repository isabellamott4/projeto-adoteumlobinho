let lobinhos = JSON.parse(localStorage.getItem('lobinhos'));

const idLoboAtual = document.getElementById("idLobo").textContent.replace("ID: ", "").trim();

let lobo = lobinhos.find(l => l.id === idLoboAtual);

document.querySelector(".formulario").addEventListener("submit", function (event) {
    event.preventDefault(); 
    const nome = document.getElementById("nome").value.trim();
    const idade = document.getElementById("idade").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !idade || !email) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    if (lobo) {
        lobo.adotado = true;
        lobo.adotante = {
            nome: nome,
            idade: idade,
            email: email
        };

        localStorage.setItem('lobinhos', JSON.stringify(lobinhos));

        window.location.href = "lista-lobinhos.html";
    } else {
        alert("Erro: Lobo não encontrado!");
    }
});
