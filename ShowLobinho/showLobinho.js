
function getParamFromURL(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const idLobo = getParamFromURL("id");
const lobinhos = JSON.parse(localStorage.getItem("lobinhos")) || [];
const lobo = lobinhos.find(l => l.id === idLobo);

if (lobo) {
    document.getElementById("nome-lobo").textContent = lobo.nome;
    document.getElementById("fotoLobo").src = lobo.imagem;
    document.getElementById("textoLobo").textContent = lobo.descricao;

    document.getElementById("botaoAdotar").addEventListener("click", () => {
        if (lobo.adotado) {
            alert("Esse lobinho já foi adotado!");
            return;
        }

        const nome = prompt("Seu nome:");
        const idade = prompt("Sua idade:");
        const email = prompt("Seu e-mail:");

        if (!nome || !idade || !email) {
            alert("Todos os campos devem ser preenchidos.");
            return;
        }

        lobo.adotado = true;
        lobo.adotante = { nome, idade, email };

        localStorage.setItem("lobinhos", JSON.stringify(lobinhos));

        alert(`Parabéns, você adotou ${lobo.nome}!`);
        window.location.href = "lista-lobinhos.html";
    });

    document.getElementById("botaoExcluir").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir esse lobinho?")) {
            const novosLobinhos = lobinhos.filter(l => l.id !== idLobo);
            localStorage.setItem("lobinhos", JSON.stringify(novosLobinhos));
            alert("Lobinho excluído com sucesso.");
            window.location.href = "lista-lobinhos.html";
        }
    });

} else {
    alert("Lobinho não encontrado.");
}
