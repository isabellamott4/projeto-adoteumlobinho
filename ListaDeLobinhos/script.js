let lobos = JSON.parse(localStorage.getItem("lobos"));

const cardsPorPagina = 4;
let paginaAtual = 1;
const paginas = document.querySelector(".paginas");
const totalPaginas = Math.ceil(lobos.length / cardsPorPagina);
const maxBotoesPaginacao = 5;
let mostrarAdotados = false;
let filtroNome = "";

const html = {
  get(elemento) {
    return document.querySelector(elemento);
  },
};

function getLobosFiltrados() {
  let resultado = lobos;
  if (mostrarAdotados) {
    resultado = resultado.filter((lobo) => lobo.adotado === true);
  }
  if (filtroNome.trim() !== "") {
    resultado = resultado.filter((lobo) =>
      lobo.nome.toLowerCase().includes(filtroNome.trim().toLowerCase())
    );
  }
  return resultado;
}

function criarCardLobinho(lobo, lado) {
  const botaoAdotado = lobo.adotado
    ? `<button class="adotado" disabled>Adotado</button>`
    : `<button><a href="../ShowLobinho/showLobinho.html?id=${lobo.id}">Adotar</a></button>`;
  return `<div class="card-lobinho-lado-${lado}">
          <div class="lobinho-img-${lado}">
            <img class="img-azul" src="../img/quadradoazul.png" alt="" />
            <img
              class="img-principal-${lado}"
              src="${lobo.imagem}"
              alt="Imagem do lobo"
            />
          </div>
          <div class="conteudo-lobinho">
            <div class="header-card-lobinho-lado-${lado}">
              <div class="info-lobinho">
                <h2>${lobo.nome}</h2>
                <p>Idade: ${lobo.idade} anos</p>
              </div>
              ${botaoAdotado}
            </div>
            <p>
              ${lobo.descricao}
            </p>
          </div>
        </div>`;
}

const controlesPaginacao = {
  proximaPagina() {
    paginaAtual++;
    const ultimaPagina = paginaAtual > totalPaginas;
    if (ultimaPagina) {
      paginaAtual--;
    }
    lista.atualizar();
    botoes.atualizar();
  },
  paginaAnterior() {
    paginaAtual--;
    if (paginaAtual < 1) {
      paginaAtual++;
    }
    lista.atualizar();
    botoes.atualizar();
  },
  irParaPagina(pagina) {
    if (pagina < 1) {
      pagina = 1;
    }
    paginaAtual = +pagina;

    if (pagina > totalPaginas) {
      paginaAtual = totalPaginas;
    }
    lista.atualizar();
  },
  criarEvento() {
    html.get(".proxima-pagina").addEventListener("click", (e) => {
      e.preventDefault();
      controlesPaginacao.proximaPagina();
    });
    html.get(".pagina-anterior").addEventListener("click", (e) => {
      e.preventDefault();
      controlesPaginacao.paginaAnterior();
    });
  },
};

const lista = {
  criar(lobo, i) {
    const lado = i % 2 === 0 ? "esquerdo" : "direito";
    html.get(".cards").innerHTML += criarCardLobinho(lobo, lado);
  },
  atualizar() {
    html.get(".cards").innerHTML = "";
    let pagina = paginaAtual - 1;
    let inicio = pagina * cardsPorPagina;
    let final = inicio + cardsPorPagina;

    const itemsPaginados = getLobosFiltrados().slice(inicio, final);
    itemsPaginados.forEach((lobo, i) => lista.criar(lobo, i));
  },
};

const botoes = {
  criar(numero) {
    const botao = document.createElement("a");
    botao.innerHTML = numero;

    if (paginaAtual == numero) {
      botao.classList.add("ativo");
    }

    botao.addEventListener("click", (evento) => {
      const pagina = evento.target.innerText;
      controlesPaginacao.irParaPagina(pagina);
      lista.atualizar();
      botoes.atualizar();
    });
    html.get(".paginas").appendChild(botao);
  },
  atualizar() {
    html.get(".paginas").innerHTML = "";
    const lobosFiltrados = getLobosFiltrados();
    const totalPaginasFiltrado = Math.ceil(
      lobosFiltrados.length / cardsPorPagina
    );
    const { numerosAEsquerda, numerosADireita } =
      botoes.calcularBotoesPaginacao(totalPaginasFiltrado);
    for (let pagina = numerosAEsquerda; pagina <= numerosADireita; pagina++) {
      botoes.criar(pagina);
    }
  },
  calcularBotoesPaginacao(totalPaginasParametro) {
    const totalPaginasCalculadas = totalPaginasParametro || totalPaginas;
    let numerosAEsquerda = paginaAtual - Math.floor(maxBotoesPaginacao / 2);
    let numerosADireita = paginaAtual + Math.floor(maxBotoesPaginacao / 2);
    if (numerosAEsquerda < 1) {
      numerosAEsquerda = 1;
      numerosADireita = maxBotoesPaginacao;
    }
    if (numerosADireita > totalPaginasCalculadas) {
      numerosAEsquerda = totalPaginasCalculadas - (maxBotoesPaginacao - 1);
      numerosADireita = totalPaginasCalculadas;
      if (numerosAEsquerda < 1) {
        numerosAEsquerda = 1;
      }
    }
    return { numerosAEsquerda, numerosADireita };
  },
};

document.addEventListener("DOMContentLoaded", () => {
  botoes.atualizar();
  lista.atualizar();
  controlesPaginacao.criarEvento();

  const inputBusca = document.querySelector(
    '.busca-lobinho input[type="text"]'
  );
  inputBusca.addEventListener("input", function () {
    filtroNome = this.value;
    paginaAtual = 1;
    botoes.atualizar();
    lista.atualizar();
  });

  const checkbox = document.querySelector(
    '.check-lobos-adotados input[type="checkbox"]'
  );
  checkbox.addEventListener("change", function () {
    mostrarAdotados = this.checked;
    paginaAtual = 1;
    botoes.atualizar();
    lista.atualizar();
  });
});
