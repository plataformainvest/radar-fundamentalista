# 📈 Radar Fundamentalista

Pesquisa fundamentalista de ações brasileiras com análise de 9 indicadores financeiros. Sistema moderno, responsivo e pronto para integração com banco de dados em produção.

## ✨ Características

### 📊 Indicadores Completos
- **P/L** (Preço/Lucro) - Múltiplo de avaliação
- **P/VP** (Preço/Valor Patrimonial) - Relação com patrimônio
- **EV/EBITDA** - Enterprise Value sobre EBITDA
- **ROE** (Retorno sobre Patrimônio) - Rentabilidade do capital
- **ROIC** (Retorno sobre Capital Investido) - Eficiência de capital
- **Margem Líquida** - Rentabilidade operacional
- **Dívida Líquida/EBITDA** - Saúde financeira
- **Liquidez Corrente** - Capacidade de pagamento de curto prazo
- **DY** (Dividend Yield) - Rendimento de dividendos

### 🔍 Recursos Avançados
- ✅ Filtros min/max para todos os 9 indicadores
- ✅ Filtro por setor (11 setores)
- ✅ Busca por ticker ou nome da empresa
- ✅ Ordenação dinâmica por qualquer coluna
- ✅ Classificação visual (Excelente/Neutro/Alerta)
- ✅ Copiar ticker para clipboard
- ✅ Links diretos para Relações com Investidores

### 🎨 Design & UX
- ✅ Dark theme moderno e profissional
- ✅ 100% responsivo (mobile, tablet, desktop)
- ✅ Animações suaves e feedback visual
- ✅ Acessibilidade otimizada
- ✅ Suporte para impressão
- ✅ Notificações em tempo real

### 🏗️ Arquitetura
- ✅ Estrutura preparada para Supabase
- ✅ Separação clara entre dados e apresentação
- ✅ Código modular e fácil de manter
- ✅ Dados mockados locais (substituíveis)
- ✅ 15 empresas brasileiras pré-carregadas

## 🚀 Como Usar

### 1. Instalação Local

```bash
# Clone ou baixe o repositório
git clone https://github.com/plataformainvest/radar-fundamentalista.git
cd radar-fundamentalista

# Acesse um dos modos abaixo:

# Modo 1: Python (recomendado)
python -m http.server 8000

# Modo 2: Node.js
npx http-server

# Modo 3: Node Live Server
npx live-server
```

Acesse: `http://localhost:8000`

### 2. Uso da Interface

1. **Filtre por Setor**: Selecione um dos 11 setores disponíveis
2. **Busque por Nome**: Digite ticker ou nome da empresa
3. **Defina Critérios**: Configure os limites min/max dos indicadores
4. **Pesquise**: Clique em "🔍 Pesquisar Empresas"
5. **Explore**: 
   - Clique nos cabeçalhos para ordenar
   - 📋 Copie tickers
   - 🔗 Acesse páginas de RI

### 3. Interpretar os Indicadores

| Indicador | Excelente | Bom | Cautela | Como Interpretar |
|-----------|-----------|-----|---------|------------------|
| P/L | < 15 | 15-25 | > 25 | Menor = mais barato (ganho/preço) |
| P/VP | < 1 | 1-2 | > 2 | < 1 = potencial subavaliação |
| EV/EBITDA | < 8 | 8-12 | > 12 | Múltiplo de valor da empresa |
| ROE (%) | > 15% | 10-15% | < 10% | Maior = melhor rentabilidade |
| ROIC (%) | > 15% | 10-15% | < 10% | Eficiência no uso de capital |
| Margem (%) | > 15% | 5-15% | < 5% | Lucro em relação às receitas |
| Dívida/EBITDA | < 2x | 2-3x | > 3x | Anos para pagar dívida com EBITDA |
| Liquidez | 1-2x | > 0.8x | < 0.8x | Capacidade de pagar contas |
| DY (%) | > 6% | 3-6% | < 3% | Rendimento anual em dividendos |

## 📦 Estrutura de Arquivos

```
radar-fundamentalista/
├── index.html                  # Interface HTML completa
├── styles/
│   ├── main.css               # Estilos principais (dark theme)
│   └── responsive.css         # Media queries (mobile/tablet/desktop)
├── js/
│   ├── data.js                # Dados mockados + funções de filtro
│   └── app.js                 # Lógica da aplicação (classe RadarApp)
├── README.md                  # Este arquivo
└── .gitignore                 # Configuração Git
```

## 🗄️ Dados Incluídos

### 15 Empresas Brasileiras

| Ticker | Empresa | Setor |
|--------|---------|-------|
| BBAS3 | Banco do Brasil | Financeiro |
| ITUB4 | Itaú Unibanco | Financeiro |
| PETR4 | Petrobras | Energia |
| VALE3 | Vale | Mineração |
| WEGE3 | WEG | Indústria |
| GOLL4 | Gol Linhas Aéreas | Aviação |
| MGLU3 | Magazine Luiza | Varejo |
| RAIL3 | Rumo | Logística |
| KLBN11 | Klabin | Papel e Celulose |
| SANB11 | Santander Brasil | Financeiro |
| JBSS3 | JBS | Alimentos |
| BBDC4 | Bradesco | Financeiro |
| COGN3 | Cogna Educação | Educação |
| LREN3 | Lojas Renner | Varejo |
| BPAC11 | BTG Pactual | Financeiro |

## 🔌 Integração com Supabase (Futura)

O projeto está **100% preparado** para integração com Supabase. Aqui está como fazer:

### 1. Criar Tabelas no Supabase

```sql
-- Tabela de Empresas
CREATE TABLE empresas (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  ticker VARCHAR(10) NOT NULL UNIQUE,
  nome VARCHAR(255) NOT NULL,
  setor VARCHAR(100) NOT NULL,
  resumo TEXT,
  ri_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Indicadores
CREATE TABLE indicadores (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  empresa_id BIGINT REFERENCES empresas(id) ON DELETE CASCADE,
  pl DECIMAL(10, 2),
  pvp DECIMAL(10, 2),
  ev_ebitda DECIMAL(10, 2),
  roe DECIMAL(10, 2),
  roic DECIMAL(10, 2),
  margem_liquida DECIMAL(10, 2),
  divida_liq_ebitda DECIMAL(10, 2),
  liquidez_corrente DECIMAL(10, 2),
  dy DECIMAL(10, 2),
  data_atualizacao DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX idx_empresas_setor ON empresas(setor);
CREATE INDEX idx_indicadores_empresa ON indicadores(empresa_id);
```

### 2. Substituir Função fetchCompanies()

Em `js/data.js`, substitua:

```javascript
// ANTES (dados mockados)
async function fetchCompanies(filters = {}) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let data = mergeCompanyData();
            data = applyFilters(data, filters);
            resolve(data);
        }, 300);
    });
}

// DEPOIS (com Supabase)
async function fetchCompanies(filters = {}) {
    try {
        const { createClient } = window.supabase;
        const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
        
        let query = supabase
            .from('empresas')
            .select(`*,indicadores(*)`);
        
        if (filters.setor && filters.setor !== 'Todos') {
            query = query.eq('setor', filters.setor);
        }
        
        if (filters.busca) {
            const busca = filters.busca;
            query = query.or(`ticker.ilike.%${busca}%,nome.ilike.%${busca}%`);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        
        let resultado = data.map(empresa => ({
            ...empresa,
            ...empresa.indicadores[0]
        }));
        
        resultado = applyIndicatorFilters(resultado, filters);
        return resultado;
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        return [];
    }
}
```

### 3. Adicionar Script Supabase no HTML

```html
<!-- No final do body, antes dos scripts -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- Configuração (substitua pelos seus valores) -->
<script>
    const SUPABASE_URL = 'https://seu-projeto.supabase.co';
    const SUPABASE_KEY = 'sua-chave-publica-aqui';
</script>
```

## 🎯 Roadmap Futuro

- [ ] Integração completa com Supabase
- [ ] Atualização automática de dados
- [ ] Gráficos e análises técnicas
- [ ] Exportar para Excel/PDF
- [ ] Alertas customizados
- [ ] Análise de sentimento de notícias
- [ ] Previsões de preço com IA
- [ ] Dark/Light mode toggle
- [ ] PWA (Progressive Web App)
- [ ] Autenticação de usuários

## 🛠️ Desenvolvido Com

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Dark theme responsivo
- **Dados**: Mock local (Supabase ready)
- **Deploy**: GitHub Pages / Vercel / Netlify

## 📝 Licença

MIT License - Sinta-se livre para usar, modificar e distribuir.

## 👨‍💼 Autor

**Plataforma Invest** - Análise fundamentalista de ações brasileiras

## 🤝 Contribuições

Sugestões e contribuições são bem-vindas! Abra uma issue ou pull request.

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação acima
2. Abra uma issue no repositório
3. Consulte a documentação do Supabase para integração

---

**Desenvolvido com ❤️ para investidores brasileiros**
