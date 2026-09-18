async function buscarAlbum(consulta) {

    try {

        // =========================
        // 1. BUSCAR O ÁLBUM
        // =========================

        const urlDeezer =
            `https://api.deezer.com/search/album?q=${encodeURIComponent(consulta)}`;

        const urlProxy =
            `https://corsproxy.io/?key=225511ec9&url=${encodeURIComponent(urlDeezer)}`;

        console.log("URL Deezer:", urlDeezer);
        console.log("URL Proxy:", urlProxy);

        const resposta = await fetch(urlProxy);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP: ${resposta.status}`);
        }

        const dados = await resposta.json();

        console.log("Álbuns encontrados:", dados);

        if (!dados.data || dados.data.length === 0) {
            console.log("Nenhum álbum encontrado.");
            return;
        }

        const album = dados.data[0];

        // =========================
        // 2. PREENCHER INFORMAÇÕES
        // =========================

        document.querySelector(".titulo-album").innerText =
            album.title;

        document.querySelector(".titulo-artista").innerText =
            album.artist.name;

        document.getElementById("capa-album").src =
            album.cover_big;

        // =========================
        // 3. PEGAR AS MÚSICAS
        // =========================

        const urlFaixas =
            `https://api.deezer.com/album/${album.id}/tracks`;

        const urlFaixasProxy =
            `https://corsproxy.io/?key=SUA_NOVA_CHAVE&url=${encodeURIComponent(urlFaixas)}`;

        console.log("URL das faixas:", urlFaixasProxy);

        const respostaFaixas =
            await fetch(urlFaixasProxy);

        if (!respostaFaixas.ok) {
            throw new Error(
                `Erro HTTP nas faixas: ${respostaFaixas.status}`
            );
        }

        const dadosFaixas =
            await respostaFaixas.json();

        console.log("Faixas do álbum:", dadosFaixas);

        // =========================
        // 4. GERAR AS MÚSICAS
        // =========================

        const listaFaixas =
            document.getElementById("lista-faixas");

        listaFaixas.innerHTML = "";

        dadosFaixas.data.forEach((faixa, index) => {

            const infoMusica =
                document.createElement("div");

            infoMusica.classList.add("info-musica");

            const numTitulo =
                document.createElement("div");

            numTitulo.classList.add("num-titulo-musica");

            const numero =
                document.createElement("span");

            numero.innerText =
                `${index + 1}.`;

            const titulo =
                document.createElement("a");

            titulo.innerText =
                faixa.title;

            titulo.href =
                faixa.link;

            titulo.target =
                "_blank";

            const duracao =
                document.createElement("span");

            duracao.classList.add("duracao-musica");

            duracao.innerText =
                formatarDuracao(faixa.duration);

            numTitulo.appendChild(numero);
            numTitulo.appendChild(titulo);

            infoMusica.appendChild(numTitulo);
            infoMusica.appendChild(duracao);

            listaFaixas.appendChild(infoMusica);
        });

    } catch (erro) {

        console.error(
            "Erro ao buscar álbum:",
            erro
        );
    }
}


// =========================
// CONVERTER SEGUNDOS → MM:SS
// =========================

function formatarDuracao(segundos) {

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        segundos % 60;

    return `${minutos}:${segundosRestantes
        .toString()
        .padStart(2, "0")}`;
}


// =========================
// PESQUISA COM ENTER
// =========================

const campoPesquisa =
    document.querySelector(".input-pesquisa");

campoPesquisa.addEventListener(
    "keydown",
    function (evento) {

        if (evento.key === "Enter") {

            const consulta =
                campoPesquisa.value.trim();

            if (consulta !== "") {
                buscarAlbum(consulta);
            }
        }
    }
);