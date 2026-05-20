/**
 * RADAR FUNDAMENTALISTA - Aplicação Principal
 * 
 * Gerencia a lógica da interface, filtros e renderização
 */

class RadarApp {
    constructor() {
        this.currentData = [];
        this.filtrosAtivos = {};
        this.colunaOrdenacao = null;
        this.ordemAscendente = true;
        this.init();
    }

    /**
     * Inicializa a aplicação
     */
    async init() {
        try {
            this.setupEventListeners();
            await this.loadInitialData();
            this.setupResponsiveness();
        } catch (error) {
            console.error('Erro ao inicializar aplicação:', error);
            this.showNotification('Erro ao carregar dados', 'error');
        }
    }

    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Botão de pesquisa
        document.getElementById('btnPesquisar').addEventListener('click', () => this.pesquisar());

        // Enter para pesquisar
        document.getElementById('inputBusca').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.pesquisar();
        });

        // Botão de limpar filtros
        document.getElementById('btnLimpar').addEventListener('click', () => this.limparFiltros());

        // Ordenação na tabela
        const tabela = document.getElementById('tabelaResultados');
        tabela.addEventListener('click', (e) => {
            if (e.target.tagName === 'TH' && e.target.dataset.coluna) {
                this.ordenar(e.target.dataset.coluna);
            }
        });
    }

    /**
     * Carrega dados iniciais
     */
    async loadInitialData() {
        document.getElementById('containerResultados').innerHTML = '<div class="loading"><p>⏳ Carregando dados...</p></div>';
        
        try {
            this.currentData = await fetchCompanies();
            this.renderTabela(this.currentData);
            this.updateResultCount(this.currentData.length);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            this.showEmptyState();
        }
    }

    /**
     * Executa a pesquisa com filtros
     */
    async pesquisar() {
        this.coletarFiltros();
        document.getElementById('containerResultados').innerHTML = '<div class="loading"><p>🔍 Pesquisando empresas...</p></div>';
        
        try {
            this.currentData = await fetchCompanies(this.filtrosAtivos);
            
            if (this.currentData.length === 0) {
                this.showEmptyState();
            } else {
                this.renderTabela(this.currentData);
            }
            
            this.updateResultCount(this.currentData.length);
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            this.showNotification('Erro ao executar pesquisa', 'error');
        }
    }

    /**
     * Coleta os valores dos filtros do formulário
     */
    coletarFiltros() {
        this.filtrosAtivos = {
            setor: document.getElementById('selectSetor').value,
            busca: document.getElementById('inputBusca').value,
            pl_min: document.getElementById('pl_min').value,
            pl_max: document.getElementById('pl_max').value,
            pvp_min: document.getElementById('pvp_min').value,
            pvp_max: document.getElementById('pvp_max').value,
            ev_ebitda_min: document.getElementById('ev_ebitda_min').value,
            ev_ebitda_max: document.getElementById('ev_ebitda_max').value,
            roe_min: document.getElementById('roe_min').value,
            roe_max: document.getElementById('roe_max').value,
            roic_min: document.getElementById('roic_min').value,
            roic_max: document.getElementById('roic_max').value,
            margem_liquida_min: document.getElementById('margem_liquida_min').value,
            margem_liquida_max: document.getElementById('margem_liquida_max').value,
            divida_liq_ebitda_min: document.getElementById('divida_liq_ebitda_min').value,
            divida_liq_ebitda_max: document.getElementById('divida_liq_ebitda_max').value,
            liquidez_corrente_min: document.getElementById('liquidez_corrente_min').value,
            liquidez_corrente_max: document.getElementById('liquidez_corrente_max').value,
            dy_min: document.getElementById('dy_min').value,
            dy_max: document.getElementById('dy_max').value
        };
    }

    /**
     * Limpa todos os filtros
     */
    limparFiltros() {
        // Resetar inputs
        document.getElementById('selectSetor').value = 'Todos';
        document.getElementById('inputBusca').value = '';
        
        // Resetar todos os filtros de indicadores
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });

        this.filtrosAtivos = {};
        this.colunaOrdenacao = null;
        this.ordemAscendente = true;
        
        this.loadInitialData();
        this.showNotification('✓ Filtros limpos', 'success');
    }

    /**
     * Ordena a tabela por coluna
     */
    ordenar(coluna) {
        if (this.colunaOrdenacao === coluna) {
            this.ordemAscendente = !this.ordemAscendente;
        } else {
            this.colunaOrdenacao = coluna;
            this.ordemAscendente = true;
        }

        this.currentData.sort((a, b) => {
            let valorA = a[coluna];
            let valorB = b[coluna];

            // Tratar valores nulos/undefined
            if (valorA === null || valorA === undefined) valorA = '';
            if (valorB === null || valorB === undefined) valorB = '';

            // Ordenação numérica
            if (!isNaN(valorA) && !isNaN(valorB)) {
                valorA = parseFloat(valorA);
                valorB = parseFloat(valorB);
                return this.ordemAscendente ? valorA - valorB : valorB - valorA;
            }

            // Ordenação alfabética
            valorA = String(valorA).toLowerCase();
            valorB = String(valorB).toLowerCase();
            return this.ordemAscendente 
                ? valorA.localeCompare(valorB) 
                : valorB.localeCompare(valorA);
        });

        this.renderTabela(this.currentData);
    }

    /**
     * Renderiza a tabela de resultados
     */
    renderTabela(dados) {
        const tbody = document.querySelector('#tabelaResultados tbody');
        tbody.innerHTML = '';

        dados.forEach(empresa => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="ticker-col">${this.escapeHtml(empresa.ticker)}</td>
                <td class="empresa-col">
                    <div class="empresa-info">
                        <strong>${this.escapeHtml(empresa.empresa)}</strong>
                        <small>${this.escapeHtml(empresa.setor)}</small>
                    </div>
                </td>
                <td>${this.escapeHtml(empresa.setor)}</td>
                <td class="numero">${this.formatarNumero(empresa.pl, 2)}</td>
                <td class="numero">${this.formatarNumero(empresa.pvp, 2)}</td>
                <td class="numero">${this.formatarNumero(empresa.ev_ebitda, 2)}</td>
                <td class="numero ${this.getClasseIndicador(empresa.roe, 'roe')}">${this.formatarPercentual(empresa.roe)}</td>
                <td class="numero ${this.getClasseIndicador(empresa.roic, 'roic')}">${this.formatarPercentual(empresa.roic)}</td>
                <td class="numero ${this.getClasseIndicador(empresa.margem_liquida, 'margem')}">${this.formatarPercentual(empresa.margem_liquida)}</td>
                <td class="numero ${this.getClasseIndicador(empresa.divida_liq_ebitda, 'divida')}">${this.formatarNumero(empresa.divida_liq_ebitda, 2)}</td>
                <td class="numero">${this.formatarNumero(empresa.liquidez_corrente, 2)}</td>
                <td class="numero ${this.getClasseIndicador(empresa.dy, 'dy')}">${this.formatarPercentual(empresa.dy)}</td>
                <td class="acoes">
                    <button class="btn-acao btn-copiar" title="Copiar ticker">📋</button>
                    <button class="btn-acao btn-ri" title="Relações com investidores">🔗</button>
                </td>
            `;

            // Event listeners para botões de ação
            tr.querySelector('.btn-copiar').addEventListener('click', () => {
                this.copiarTicker(empresa.ticker);
            });

            tr.querySelector('.btn-ri').addEventListener('click', () => {
                if (empresa.ri_url) {
                    window.open(empresa.ri_url, '_blank');
                }
            });

            tbody.appendChild(tr);
        });

        // Atualizar estado dos headers de ordenação
        this.atualizarIconesOrdenacao();
    }

    /**
     * Atualiza ícones de ordenação nos headers
     */
    atualizarIconesOrdenacao() {
        document.querySelectorAll('#tabelaResultados th[data-coluna]').forEach(th => {
            th.classList.remove('ordenando-asc', 'ordenando-desc');
            
            if (th.dataset.coluna === this.colunaOrdenacao) {
                if (this.ordemAscendente) {
                    th.classList.add('ordenando-asc');
                } else {
                    th.classList.add('ordenando-desc');
                }
            }
        });
    }

    /**
     * Copia o ticker para o clipboard
     */
    copiarTicker(ticker) {
        navigator.clipboard.writeText(ticker).then(() => {
            this.showNotification(`✓ ${ticker} copiado!`, 'success');
        }).catch(() => {
            this.showNotification('Erro ao copiar', 'error');
        });
    }

    /**
     * Define classe CSS baseada no valor do indicador
     */
    getClasseIndicador(valor, tipo) {
        if (tipo === 'roe' || tipo === 'roic') {
            if (valor >= 15) return 'indicador-bom';
            if (valor >= 10) return 'indicador-neutro';
            return 'indicador-alerta';
        }
        if (tipo === 'margem') {
            if (valor >= 15) return 'indicador-bom';
            if (valor >= 5) return 'indicador-neutro';
            if (valor < 0) return 'indicador-alerta';
            return '';
        }
        if (tipo === 'divida') {
            if (valor <= 2) return 'indicador-bom';
            if (valor <= 3) return 'indicador-neutro';
            return 'indicador-alerta';
        }
        if (tipo === 'dy') {
            if (valor >= 6) return 'indicador-bom';
            if (valor >= 3) return 'indicador-neutro';
            return '';
        }
        return '';
    }

    /**
     * Formata números para exibição
     */
    formatarNumero(valor, casas = 2) {
        if (valor === null || valor === undefined) return '-';
        return parseFloat(valor).toFixed(casas);
    }

    /**
     * Formata percentuais
     */
    formatarPercentual(valor, casas = 1) {
        if (valor === null || valor === undefined) return '-';
        return parseFloat(valor).toFixed(casas) + '%';
    }

    /**
     * Escapa caracteres HTML para segurança
     */
    escapeHtml(texto) {
        const div = document.createElement('div');
        div.textContent = texto;
        return div.innerHTML;
    }

    /**
     * Atualiza o contador de resultados
     */
    updateResultCount(total) {
        const texto = total === 1 
            ? '1 empresa encontrada' 
            : `${total} empresas encontradas`;
        document.getElementById('resultadosCount').textContent = texto;
    }

    /**
     * Exibe estado vazio
     */
    showEmptyState() {
        document.getElementById('containerResultados').innerHTML = `
            <div class="empty-state">
                <p>😕 Nenhuma empresa encontrada</p>
                <small>Tente ajustar seus filtros</small>
            </div>
        `;
        this.updateResultCount(0);
    }

    /**
     * Exibe notificação
     */
    showNotification(message, type = 'info') {
        const notif = document.createElement('div');
        notif.className = `notificacao notificacao-${type}`;
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.classList.add('visible');
        }, 10);

        setTimeout(() => {
            notif.classList.remove('visible');
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    /**
     * Configura responsividade
     */
    setupResponsiveness() {
        // Detecta mudanças de tamanho de tela
        window.addEventListener('resize', () => {
            // Pode adicionar lógica específica se necessário
        });
    }
}

/**
 * Inicia a aplicação quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    window.app = new RadarApp();
});
