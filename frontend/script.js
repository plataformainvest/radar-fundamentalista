// Configuração da API
const API_BASE_URL = 'http://localhost:8000/api';

// ==================== Funções de Navegação ====================

function carregarAbaPrincipal() {
    mostrarAba('aba-acoes');
}

function carregarAbaFiltros() {
    mostrarAba('aba-filtros');
    carregarSetores();
}

function carregarAbaRecomendacoes() {
    mostrarAba('aba-recomendacoes');
}

function mostrarAba(abaId) {
    // Esconder todas as abas
    const abas = document.querySelectorAll('.aba');
    abas.forEach(aba => aba.classList.remove('aba-ativa'));

    // Mostrar aba selecionada
    const aba = document.getElementById(abaId);
    if (aba) {
        aba.classList.add('aba-ativa');
    }
}

// ==================== Funções de Ações ====================

async function buscarAcao() {
    const ticker = document.getElementById('buscar-ticker').value.trim();
    
    if (!ticker) {
        exibirErro('resultado-acoes', 'Por favor, insira um ticker');
        return;
    }

    mostrarCarregando('resultado-acoes');

    try {
        const resposta = await fetch(`${API_BASE_URL}/acoes/${ticker}`);
        
        if (!resposta.ok) {
            throw new Error(`Ação ${ticker} não encontrada`);
        }

        const acao = await resposta.json();
        exibirAcao('resultado-acoes', acao);
    } catch (erro) {
        exibirErro('resultado-acoes', erro.message);
    }
}

async function listarTodasAcoes() {
    mostrarCarregando('resultado-acoes');

    try {
        const resposta = await fetch(`${API_BASE_URL}/acoes?limit=100`);
        
        if (!resposta.ok) {
            throw new Error('Erro ao carregar ações');
        }

        const acoes = await resposta.json();
        exibirListaAcoes('resultado-acoes', acoes);
    } catch (erro) {
        exibirErro('resultado-acoes', erro.message);
    }
}

function exibirAcao(elementoId, acao) {
    const elemento = document.getElementById(elementoId);
    
    let html = `
        <div class="secao">
            <h3>${acao.nome} (${acao.ticker})</h3>
            <div class="info-acao">
                <p><strong>Setor:</strong> ${acao.setor || 'N/A'}</p>
                <p><strong>Preço Atual:</strong> R$ ${acao.preco_atual ? acao.preco_atual.toFixed(2) : 'N/A'}</p>
                <p><strong>Variação:</strong> <span class="${acao.variacao_percentual >= 0 ? 'positivo' : 'negativo'}">
                    ${acao.variacao_percentual ? acao.variacao_percentual.toFixed(2) : 'N/A'}%
                </span></p>
                <p><strong>P/L:</strong> ${acao.pl ? acao.pl.toFixed(2) : 'N/A'}</p>
                <p><strong>DY:</strong> ${acao.dy ? (acao.dy * 100).toFixed(2) : 'N/A'}%</p>
                <p><strong>ROE:</strong> ${acao.roe ? (acao.roe * 100).toFixed(2) : 'N/A'}%</p>
                <p><strong>VPA:</strong> R$ ${acao.vpa ? acao.vpa.toFixed(2) : 'N/A'}</p>
                <p><strong>EPS:</strong> ${acao.eps ? acao.eps.toFixed(2) : 'N/A'}</p>
            </div>
        </div>
    `;
    
    elemento.innerHTML = html;
}

function exibirListaAcoes(elementoId, acoes) {
    const elemento = document.getElementById(elementoId);
    
    if (acoes.length === 0) {
        elemento.innerHTML = '<div class="vazio">Nenhuma ação encontrada</div>';
        return;
    }

    let html = `
        <table class="tabela-acoes">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Variação</th>
                    <th>P/L</th>
                    <th>DY</th>
                    <th>ROE</th>
                </tr>
            </thead>
            <tbody>
    `;

    acoes.forEach(acao => {
        const variacao = acao.variacao_percentual || 0;
        html += `
            <tr>
                <td><strong>${acao.ticker}</strong></td>
                <td>${acao.nome}</td>
                <td>R$ ${acao.preco_atual ? acao.preco_atual.toFixed(2) : 'N/A'}</td>
                <td><span class="${variacao >= 0 ? 'positivo' : 'negativo'}">
                    ${variacao.toFixed(2)}%
                </span></td>
                <td>${acao.pl ? acao.pl.toFixed(2) : 'N/A'}</td>
                <td>${acao.dy ? (acao.dy * 100).toFixed(2) : 'N/A'}%</td>
                <td>${acao.roe ? (acao.roe * 100).toFixed(2) : 'N/A'}%</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    elemento.innerHTML = html;
}

// ==================== Funções de Filtros ====================

async function carregarSetores() {
    try {
        const resposta = await fetch(`${API_BASE_URL}/filtros/setores`);
        const dados = await resposta.json();

        const selectSetor = document.getElementById('setor-select');
        selectSetor.innerHTML = '<option value="">-- Todos os Setores --</option>';

        dados.setores.forEach(setor => {
            const opcao = document.createElement('option');
            opcao.value = setor;
            opcao.textContent = setor;
            selectSetor.appendChild(opcao);
        });
    } catch (erro) {
        console.error('Erro ao carregar setores:', erro);
    }
}

async function aplicarFiltros() {
    mostrarCarregando('resultado-filtros');

    const filtro = {
        preco_min: parseFloat(document.getElementById('preco-min').value) || null,
        preco_max: parseFloat(document.getElementById('preco-max').value) || null,
        pl_min: parseFloat(document.getElementById('pl-min').value) || null,
        pl_max: parseFloat(document.getElementById('pl-max').value) || null,
        dy_min: parseFloat(document.getElementById('dy-min').value) / 100 || null,
        dy_max: parseFloat(document.getElementById('dy-max').value) / 100 || null,
        roe_min: parseFloat(document.getElementById('roe-min').value) / 100 || null,
        roe_max: parseFloat(document.getElementById('roe-max').value) / 100 || null,
        setor: document.getElementById('setor-select').value || null,
        variacao_min: parseFloat(document.getElementById('variacao-min').value) || null,
        variacao_max: parseFloat(document.getElementById('variacao-max').value) || null,
        limite: 100
    };

    // Remover valores null
    Object.keys(filtro).forEach(chave => {
        if (filtro[chave] === null) {
            delete filtro[chave];
        }
    });

    try {
        const resposta = await fetch(`${API_BASE_URL}/filtros/buscar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filtro)
        });

        if (!resposta.ok) {
            throw new Error('Erro ao aplicar filtros');
        }

        const resultado = await resposta.json();
        exibirResultadoFiltros('resultado-filtros', resultado);
    } catch (erro) {
        exibirErro('resultado-filtros', erro.message);
    }
}

function limparFiltros() {
    document.getElementById('form-filtros').reset();
    document.getElementById('resultado-filtros').innerHTML = '<div class="vazio">Filtros limpos</div>';
}

function exibirResultadoFiltros(elementoId, resultado) {
    const elemento = document.getElementById(elementoId);

    if (resultado.acoes.length === 0) {
        elemento.innerHTML = '<div class="vazio">Nenhuma ação encontrada com esses filtros</div>';
        return;
    }

    let html = `
        <h3>Resultados (${resultado.total} encontradas)</h3>
        <table class="tabela-acoes">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Variação</th>
                    <th>P/L</th>
                    <th>DY</th>
                    <th>ROE</th>
                    <th>Setor</th>
                </tr>
            </thead>
            <tbody>
    `;

    resultado.acoes.forEach(acao => {
        const variacao = acao.variacao_percentual || 0;
        html += `
            <tr>
                <td><strong>${acao.ticker}</strong></td>
                <td>${acao.nome}</td>
                <td>R$ ${acao.preco_atual ? acao.preco_atual.toFixed(2) : 'N/A'}</td>
                <td><span class="${variacao >= 0 ? 'positivo' : 'negativo'}">
                    ${variacao.toFixed(2)}%
                </span></td>
                <td>${acao.pl ? acao.pl.toFixed(2) : 'N/A'}</td>
                <td>${acao.dy ? (acao.dy * 100).toFixed(2) : 'N/A'}%</td>
                <td>${acao.roe ? (acao.roe * 100).toFixed(2) : 'N/A'}%</td>
                <td>${acao.setor || 'N/A'}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    elemento.innerHTML = html;
}

// ==================== Funções de Recomendações ====================

async function obterRecomendacoes() {
    mostrarCarregando('resultado-recomendacoes');

    try {
        const resposta = await fetch(`${API_BASE_URL}/filtros/recomendacoes`, {
            method: 'POST'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao obter recomendações');
        }

        const resultado = await resposta.json();
        exibirRecomendacoes('resultado-recomendacoes', resultado);
    } catch (erro) {
        exibirErro('resultado-recomendacoes', erro.message);
    }
}

async function obterAltosDiv() {
    mostrarCarregando('resultado-recomendacoes');

    try {
        const resposta = await fetch(`${API_BASE_URL}/filtros/altos-dividendos?dy_minimo=4`, {
            method: 'POST'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao obter ações com altos dividendos');
        }

        const resultado = await resposta.json();
        exibirRecomendacoes('resultado-recomendacoes', resultado);
    } catch (erro) {
        exibirErro('resultado-recomendacoes', erro.message);
    }
}

async function obterBaixoPL() {
    mostrarCarregando('resultado-recomendacoes');

    try {
        const resposta = await fetch(`${API_BASE_URL}/filtros/baixo-pl?pl_maximo=12`, {
            method: 'POST'
        });

        if (!resposta.ok) {
            throw new Error('Erro ao obter ações com baixo P/L');
        }

        const resultado = await resposta.json();
        exibirRecomendacoes('resultado-recomendacoes', resultado);
    } catch (erro) {
        exibirErro('resultado-recomendacoes', erro.message);
    }
}

function exibirRecomendacoes(elementoId, resultado) {
    const elemento = document.getElementById(elementoId);

    if (resultado.acoes.length === 0) {
        elemento.innerHTML = '<div class="vazio">Nenhuma ação encontrada com esses critérios</div>';
        return;
    }

    let html = `
        <h3>${resultado.titulo}</h3>
        <p><small>Total: ${resultado.total} ações</small></p>
        <table class="tabela-acoes">
            <thead>
                <tr>
                    <th>Ticker</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>P/L</th>
                    <th>DY</th>
                    <th>ROE</th>
                    <th>Setor</th>
                </tr>
            </thead>
            <tbody>
    `;

    resultado.acoes.forEach(acao => {
        html += `
            <tr>
                <td><strong>${acao.ticker}</strong></td>
                <td>${acao.nome}</td>
                <td>R$ ${acao.preco_atual ? acao.preco_atual.toFixed(2) : 'N/A'}</td>
                <td>${acao.pl ? acao.pl.toFixed(2) : 'N/A'}</td>
                <td>${acao.dy ? (acao.dy * 100).toFixed(2) : 'N/A'}%</td>
                <td>${acao.roe ? (acao.roe * 100).toFixed(2) : 'N/A'}%</td>
                <td>${acao.setor || 'N/A'}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    elemento.innerHTML = html;
}

// ==================== Funções Utilitárias ====================

function mostrarCarregando(elementoId) {
    const elemento = document.getElementById(elementoId);
    elemento.innerHTML = `
        <div class="carregando">
            <div class="spinner"></div>
            <p>Carregando...</p>
        </div>
    `;
}

function exibirErro(elementoId, mensagem) {
    const elemento = document.getElementById(elementoId);
    elemento.innerHTML = `
        <div class="vazio">
            <p style="color: #cc0000;">❌ Erro: ${mensagem}</p>
        </div>
    `;
}

// ==================== Inicialização ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Aplicação Radar Fundamentalista carregada!');
    carregarAbaPrincipal();
});
