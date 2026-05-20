/**
 * RADAR FUNDAMENTALISTA - Database Mock
 * 
 * Estrutura preparada para integração com Supabase
 * Por enquanto usa dados mockados locais
 * 
 * Schema esperado no Supabase:
 * - empresas (id, ticker, nome, setor, resumo, ri_url)
 * - indicadores (id, empresa_id, pl, pvp, ev_ebitda, roe, roic, margem_liquida, divida_liq_ebitda, liquidez_corrente, dy, data_atualizacao)
 */

// Base de dados mockada - Substituir por query Supabase futuramente
const MOCK_EMPRESAS = [
    {
        id: 1,
        ticker: 'BBAS3',
        empresa: 'Banco do Brasil',
        setor: 'Financeiro',
        resumo: 'Maior banco público do Brasil, oferece serviços financeiros completos',
        ri_url: 'https://www.bb.com.br/pbb/pagina-inicial/relacoes-com-investidores'
    },
    {
        id: 2,
        ticker: 'ITUB4',
        empresa: 'Itaú Unibanco',
        setor: 'Financeiro',
        resumo: 'Maior banco privado do Brasil com forte presença internacional',
        ri_url: 'https://www.itau.com.br/para-voce/relacoes-com-investidores'
    },
    {
        id: 3,
        ticker: 'PETR4',
        empresa: 'Petrobras',
        setor: 'Energia',
        resumo: 'Maior empresa de energia do Brasil, líder em exploração de petróleo',
        ri_url: 'https://www.petrobras.com.br/pt/quem-somos/relacoes-com-investidores'
    },
    {
        id: 4,
        ticker: 'VALE3',
        empresa: 'Vale',
        setor: 'Mineração',
        resumo: 'Maior empresa de mineração do Brasil, produtora de minério de ferro',
        ri_url: 'https://www.vale.com/pt/conteudos/investidores'
    },
    {
        id: 5,
        ticker: 'WEGE3',
        empresa: 'WEG',
        setor: 'Indústria',
        resumo: 'Fabricante de motores elétricos, geradores e equipamentos eletrônicos',
        ri_url: 'https://www.weg.net/institutional/relacoes-com-investidores'
    },
    {
        id: 6,
        ticker: 'GOLL4',
        empresa: 'Gol Linhas Aéreas',
        setor: 'Aviação',
        resumo: 'Maior companhia aérea do Brasil em número de passageiros',
        ri_url: 'https://www.voegol.com.br/pt/relacoes-com-investidores'
    },
    {
        id: 7,
        ticker: 'MGLU3',
        empresa: 'Magazine Luiza',
        setor: 'Varejo',
        resumo: 'Varejista omnichannel de eletrônicos e eletrodomésticos',
        ri_url: 'https://www.magazineluiza.com.br/relacoes-com-investidores'
    },
    {
        id: 8,
        ticker: 'RAIL3',
        empresa: 'Rumo',
        setor: 'Logística',
        resumo: 'Operadora de malha ferroviária, líder em transporte de commodities',
        ri_url: 'https://www.rumo.com.br/relacoes-com-investidores'
    },
    {
        id: 9,
        ticker: 'KLBN11',
        empresa: 'Klabin',
        setor: 'Papel e Celulose',
        resumo: 'Produtora de papéis e embalagens de celulose',
        ri_url: 'https://www.klabin.com.br/relacoes-com-investidores'
    },
    {
        id: 10,
        ticker: 'SANB11',
        empresa: 'Santander Brasil',
        setor: 'Financeiro',
        resumo: 'Instituição financeira com forte atuação em banking digital',
        ri_url: 'https://www.santander.com.br/relacoes-com-investidores'
    },
    {
        id: 11,
        ticker: 'JBSS3',
        empresa: 'JBS',
        setor: 'Alimentos',
        resumo: 'Maior empresa de proteína do Brasil, processadora de carnes',
        ri_url: 'https://ri.jbslojas.com.br'
    },
    {
        id: 12,
        ticker: 'BBDC4',
        empresa: 'Bradesco',
        setor: 'Financeiro',
        resumo: 'Um dos maiores bancos privados do Brasil com forte presença digital',
        ri_url: 'https://www.bradesco.com.br/relacoes-com-investidores'
    },
    {
        id: 13,
        ticker: 'COGN3',
        empresa: 'Cogna Educação',
        setor: 'Educação',
        resumo: 'Maior empresa de educação superior do Brasil',
        ri_url: 'https://www.cogna.com.br/relacoes-com-investidores'
    },
    {
        id: 14,
        ticker: 'LREN3',
        empresa: 'Lojas Renner',
        setor: 'Varejo',
        resumo: 'Varejista de roupas e acessórios com forte presença no e-commerce',
        ri_url: 'https://www.lojasrenner.com.br/relacoes-com-investidores'
    },
    {
        id: 15,
        ticker: 'BPAC11',
        empresa: 'BTG Pactual',
        setor: 'Financeiro',
        resumo: 'Banco de investimentos com foco em gestão de ativos e advisory',
        ri_url: 'https://www.btgpactual.com/relacoes-com-investidores'
    }
];

const MOCK_INDICADORES = [
    {
        empresa_id: 1,
        pl: 8.5,
        pvp: 0.95,
        ev_ebitda: 5.2,
        roe: 18.5,
        roic: 15.2,
        margem_liquida: 22.3,
        divida_liq_ebitda: 0.8,
        liquidez_corrente: 1.45,
        dy: 9.8,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 2,
        pl: 9.2,
        pvp: 1.05,
        ev_ebitda: 6.1,
        roe: 19.8,
        roic: 16.5,
        margem_liquida: 24.5,
        divida_liq_ebitda: 0.7,
        liquidez_corrente: 1.52,
        dy: 8.9,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 3,
        pl: 6.8,
        pvp: 1.25,
        ev_ebitda: 3.5,
        roe: 28.4,
        roic: 22.1,
        margem_liquida: 31.2,
        divida_liq_ebitda: 0.3,
        liquidez_corrente: 1.82,
        dy: 12.5,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 4,
        pl: 7.2,
        pvp: 0.88,
        ev_ebitda: 4.1,
        roe: 25.6,
        roic: 19.8,
        margem_liquida: 28.9,
        divida_liq_ebitda: 1.2,
        liquidez_corrente: 1.65,
        dy: 11.2,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 5,
        pl: 28.5,
        pvp: 4.2,
        ev_ebitda: 18.3,
        roe: 26.8,
        roic: 21.5,
        margem_liquida: 14.2,
        divida_liq_ebitda: 1.5,
        liquidez_corrente: 1.35,
        dy: 1.8,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 6,
        pl: 12.3,
        pvp: 1.45,
        ev_ebitda: 7.8,
        roe: 12.4,
        roic: 8.9,
        margem_liquida: 5.2,
        divida_liq_ebitda: 2.1,
        liquidez_corrente: 1.18,
        dy: 3.5,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 7,
        pl: 15.8,
        pvp: 2.1,
        ev_ebitda: 9.5,
        roe: 8.9,
        roic: 5.2,
        margem_liquida: -2.5,
        divida_liq_ebitda: 2.8,
        liquidez_corrente: 1.05,
        dy: 2.1,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 8,
        pl: 11.5,
        pvp: 3.2,
        ev_ebitda: 6.8,
        roe: 22.5,
        roic: 18.3,
        margem_liquida: 35.8,
        divida_liq_ebitda: 1.8,
        liquidez_corrente: 1.42,
        dy: 6.8,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 9,
        pl: 9.8,
        pvp: 1.35,
        ev_ebitda: 5.2,
        roe: 20.3,
        roic: 16.8,
        margem_liquida: 18.5,
        divida_liq_ebitda: 1.4,
        liquidez_corrente: 1.28,
        dy: 8.2,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 10,
        pl: 10.2,
        pvp: 0.98,
        ev_ebitda: 6.5,
        roe: 17.8,
        roic: 14.2,
        margem_liquida: 20.1,
        divida_liq_ebitda: 0.9,
        liquidez_corrente: 1.38,
        dy: 9.1,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 11,
        pl: 13.5,
        pvp: 1.68,
        ev_ebitda: 8.2,
        roe: 15.6,
        roic: 12.3,
        margem_liquida: 6.8,
        divida_liq_ebitda: 1.6,
        liquidez_corrente: 1.22,
        dy: 5.4,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 12,
        pl: 9.5,
        pvp: 1.02,
        ev_ebitda: 6.2,
        roe: 18.2,
        roic: 15.5,
        margem_liquida: 21.8,
        divida_liq_ebitda: 0.85,
        liquidez_corrente: 1.48,
        dy: 9.5,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 13,
        pl: 8.2,
        pvp: 0.75,
        ev_ebitda: 4.8,
        roe: 14.5,
        roic: 11.2,
        margem_liquida: 8.9,
        divida_liq_ebitda: 2.2,
        liquidez_corrente: 1.15,
        dy: 4.2,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 14,
        pl: 14.8,
        pvp: 1.92,
        ev_ebitda: 8.9,
        roe: 16.3,
        roic: 13.1,
        margem_liquida: 9.5,
        divida_liq_ebitda: 1.7,
        liquidez_corrente: 1.32,
        dy: 4.8,
        data_atualizacao: '2026-05-20'
    },
    {
        empresa_id: 15,
        pl: 11.2,
        pvp: 1.15,
        ev_ebitda: 7.1,
        roe: 21.4,
        roic: 17.8,
        margem_liquida: 26.5,
        divida_liq_ebitda: 0.6,
        liquidez_corrente: 1.62,
        dy: 7.5,
        data_atualizacao: '2026-05-20'
    }
];

/**
 * Função auxiliar para mesclar dados de empresas e indicadores
 */
function mergeCompanyData() {
    return MOCK_EMPRESAS.map(empresa => {
        const indicadores = MOCK_INDICADORES.find(ind => ind.empresa_id === empresa.id);
        return {
            ...empresa,
            ...indicadores
        };
    });
}

/**
 * Simula requisição ao banco de dados
 * Futuramente será substituído por query Supabase
 */
async function fetchCompanies(filters = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let data = mergeCompanyData();
            
            // Aplicar filtros
            data = applyFilters(data, filters);
            
            resolve(data);
        }, 300); // Simular latência de rede
    });
}

/**
 * Aplica filtros aos dados
 */
function applyFilters(data, filters) {
    return data.filter(empresa => {
        // Filtro por setor
        if (filters.setor && filters.setor !== 'Todos' && empresa.setor !== filters.setor) {
            return false;
        }

        // Filtro por busca (ticker ou empresa)
        if (filters.busca) {
            const busca = filters.busca.toLowerCase();
            const temMatch = empresa.ticker.toLowerCase().includes(busca) ||
                           empresa.empresa.toLowerCase().includes(busca);
            if (!temMatch) return false;
        }

        // Filtros de indicadores min/max
        const indicadores = [
            'pl', 'pvp', 'ev_ebitda', 'roe', 'roic', 
            'margem_liquida', 'divida_liq_ebitda', 'liquidez_corrente', 'dy'
        ];

        for (let ind of indicadores) {
            const min = filters[`${ind}_min`];
            const max = filters[`${ind}_max`];
            const valor = empresa[ind];

            if (min !== undefined && min !== '' && valor < parseFloat(min)) {
                return false;
            }
            if (max !== undefined && max !== '' && valor > parseFloat(max)) {
                return false;
            }
        }

        return true;
    });
}

/**
 * Retorna setores únicos disponíveis
 */
function getSetores() {
    return ['Todos', ...new Set(MOCK_EMPRESAS.map(e => e.setor))];
}

/**
 * Retorna configuração dos indicadores para a UI
 */
const INDICADORES_CONFIG = {
    pl: {
        nome: 'P/L',
        descricao: 'Preço/Lucro',
        tooltip: 'Quanto o mercado paga por cada real de lucro. Menor é melhor.',
        formato: 'numero'
    },
    pvp: {
        nome: 'P/VP',
        descricao: 'Preço/Valor Patrimonial',
        tooltip: 'Razão entre preço e patrimônio líquido. < 1 pode indicar subavaliação.',
        formato: 'numero'
    },
    ev_ebitda: {
        nome: 'EV/EBITDA',
        descricao: 'Enterprise Value/EBITDA',
        tooltip: 'Múltiplo de valor da empresa. Útil para comparar empresas de setores diferentes.',
        formato: 'numero'
    },
    roe: {
        nome: 'ROE',
        descricao: 'Retorno sobre o Patrimônio',
        tooltip: 'Rentabilidade do capital dos acionistas. Maior é melhor (>15% é bom).',
        formato: 'percentual'
    },
    roic: {
        nome: 'ROIC',
        descricao: 'Retorno sobre o Capital Investido',
        tooltip: 'Eficiência na utilização de capital. > WACC indica criação de valor.',
        formato: 'percentual'
    },
    margem_liquida: {
        nome: 'Margem Líquida',
        descricao: 'Margem de Lucro Líquido',
        tooltip: 'Percentual de lucro em relação às receitas. Maior é melhor.',
        formato: 'percentual'
    },
    divida_liq_ebitda: {
        nome: 'Dívida Líq./EBITDA',
        descricao: 'Dívida Líquida/EBITDA',
        tooltip: 'Anos necessários para pagar dívida com EBITDA. < 3 é considerado saudável.',
        formato: 'numero'
    },
    liquidez_corrente: {
        nome: 'Liquidez Corrente',
        descricao: 'Ativo Circulante/Passivo Circulante',
        tooltip: 'Capacidade de pagar obrigações de curto prazo. Entre 1 e 2 é ideal.',
        formato: 'numero'
    },
    dy: {
        nome: 'DY',
        descricao: 'Dividend Yield',
        tooltip: 'Rendimento anual em dividendos. Maior é melhor para rentistas.',
        formato: 'percentual'
    }
};
