# TR TURISMO VIAGENS | Site Oficial Comercial & Painel Administrativo

> Website moderno, responsivo e comercial para a agência de viagens **TR TURISMO VIAGENS**, localizada em **Ibirité, Minas Gerais**.

---

## 📌 Sobre a Empresa

* **Nome Comercial:** TR TURISMO VIAGENS
* **Razão Social:** TR TURSIMO VIAGENS LTDA
* **CNPJ:** 62.424.112/0001-27 (Ativo)
* **Localização:** Rua Baré, 92 – Bairro Industrial de Ibirité – Ibirité/MG (CEP: 32415-166)
* **Telefone & WhatsApp Oficial:** (31) 99572-4285
* **Avaliação no Google:** 4,9 ⭐ com mais de 100 avaliações de clientes reais

---

## 🚀 Funcionalidades Principais

### 1. Site Comercial (`index.html`)
* **Hero de Alto Impacto:** Chamada comercial envolvente, fotografia em alta resolução e selos de segurança e credibilidade.
* **Catálogo Dinâmico de Destinos:** Filtros em tempo real por categorias (*Praias, Excursões Rodoviárias, Viagens em Família, Viagens em Grupo, Viagens Nacionais*).
* **Preenchimento Rápido de Cotação:** Ao clicar em *"Solicitar Orçamento"* em qualquer card, a página desliza até o formulário com o destino selecionado automaticamente.
* **Gerador Inteligente de Orçamentos para WhatsApp:** Monta uma mensagem detalhada e direciona diretamente para o WhatsApp oficial da empresa.
* **Prova Social:** Destaque para a nota **4,9 no Google** com depoimentos reais de clientes de Ibirité.
* **Widget Flutuante do WhatsApp:** Atendimento rápido sempre acessível no celular e desktop.
* **SEO Local & Acessibilidade:** Meta tags completas, OpenGraph para prévias no WhatsApp e dados estruturados Schema.org (`TravelAgency`).

### 2. Painel Administrativo Integrado (`admin.html`)
* **Acesso Restrito:** Autenticação via senha (padrão: `tr2026`).
* **Gestão Cadastral:** Edição de telefones, WhatsApp, horários de atendimento, endereço e redes sociais.
* **Gestão do Hero / Banner:** Edição de textos, imagens e chamadas.
* **CRUD de Destinos & Pacotes:** Criar, editar fotos, preços e categorias de roteiros turísticos.
* **Serviços & Depoimentos:** Gestão completa dos serviços e avaliações do Google.
* **Leads Recebidos:** Registro de todos os formulários preenchidos com botão de contato direto no WhatsApp.
* **Backup & Restauração:** Exportação e importação dos dados em formato JSON.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estrutura limpa, acessível e otimizada para buscadores.
* **Vanilla CSS Moderno:** Design system personalizado com variáveis CSS, tipografia Google Fonts (*Outfit* e *Plus Jakarta Sans*), microinterações e responsividade total.
* **JavaScript Modular:** Lógica de manipulação de DOM, persistência de dados em `localStorage` e integração com a API do WhatsApp.
* **Node.js (Opcional para Dev):** Servidor estático leve embutido (`serve.js`).

---

## 💻 Como Executar Localmente

Você pode abrir diretamente o arquivo `index.html` em qualquer navegador ou rodar o servidor local com Node.js:

```bash
# Iniciar o servidor local
node serve.js

# Acessar no navegador:
# Site: http://localhost:3000/
# Painel Admin: http://localhost:3000/admin.html (senha: tr2026)
```

---

## 📂 Estrutura de Arquivos

```text
├── index.html         # Página inicial comercial
├── admin.html         # Painel administrativo
├── serve.js           # Servidor local Node.js
├── css/
│   ├── style.css      # Estilos do site principal
│   └── admin.css      # Estilos do painel de controle
├── js/
│   ├── data.js        # Estado e dados padrão
│   ├── app.js         # Lógica da interface e WhatsApp
│   └── admin.js       # Lógica administrativa e CRUD
└── README.md          # Documentação do projeto
```

---

© 2026 TR TURISMO VIAGENS LTDA. Todos os direitos reservados.
