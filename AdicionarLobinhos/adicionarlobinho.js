document.addEventListener("DOMContentLoaded", function () {
    const botao = document.querySelector("button");
    botao.addEventListener("click", function () {
        const nome = document.getElementById("nome").value;
        const anos = document.getElementById("anos").value;
        const foto = document.getElementById("foto").value;
        const descricao = document.getElementById("descricao").value;
        let novoLobo = {};
        novoLobo.nome = nome;
        novoLobo.idade = anos;
        novoLobo.foto = foto;
        novoLobo.descricao = descricao;

        let lobos = localStorage.getItem("lobos");
        let lista = [];
        if (lobos) {
            lista = JSON.parse(lobos);
        }

        lista.push(novoLobo);
        localStorage.setItem("lobos", JSON.stringify(lista));
    });
});