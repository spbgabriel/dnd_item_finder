let itemBox = document.querySelector(".items-box");
let data = [];

let inputBusca = document.querySelector("input[type='text']");

// Adiciona um event listener para o input de busca para pesquisar enquanto digita
inputBusca.addEventListener('input', iniciarBusca);

// Função para carregar os dados iniciais
async function carregarDados() {
    try {
        let answer = await fetch("data.json");
        data = await answer.json();
        renderCards(data); // Renderiza todos os itens inicialmente
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
    }
}

async function iniciarBusca() {
    // Obtenha o termo de pesquisa do input
    let termoPesquisa = inputBusca.value.toLowerCase();

    // Filtre os dados com base no termo de pesquisa
    let resultadosFiltrados = data.filter(item =>
        item.name.toLowerCase().includes(termoPesquisa) ||
        (item.properties && item.properties.toLowerCase().includes(termoPesquisa))
    );
    renderCards(resultadosFiltrados);
}
    
function renderCards(data) {
    itemBox.innerHTML = ""; // Limpa o conteúdo anterior antes de renderizar os novos cards

    for (let item of data) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <ul>
                <h2>${item.name}</h2>
                <li>Cost: ${item.cost}</li>
                <li>Damage: ${item.damage}</li>
                <li>Properties: ${item.properties}</li>
                <li>Weapon mastery: ${item.weapon_mastery}</li>
            </ul>
        `;
        itemBox.appendChild(article);
    }
}

// Chama a função para carregar os dados quando o script é executado
carregarDados();