# 🏟️ Sistema de Gerenciamento de Eventos Esportivos

Sistema web para gerenciamento de eventos e aluguéis de quadras esportivas, permitindo cadastrar, consultar, editar e excluir eventos.

## 🚀 Tecnologias utilizadas

### Frontend

- Next.js
- React
- JavaScript
- Bootstrap

### Backend

- Node.js
- Express
- API REST
- Armazenamento de dados em arquivo JSON

## ⚙️ Funcionalidades

- Cadastro de novos eventos.
- Listagem dos eventos cadastrados.
- Visualização dos detalhes de cada evento.
- Edição das informações dos eventos.
- Exclusão de eventos.
- Registro do responsável, data, horário e duração.
- Controle do valor e do status do pagamento.

## 📋 Requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- npm, instalado junto com o Node.js.

## 📦 Como executar o projeto

### 1. Clone o repositório

```bash
git clone ATV_PFEND1_INDIVIDUAL
```

Entre na pasta do projeto:

```bash
cd ATV_PFEND1_INDIVIDUAL
```

### 2. Configure o backend

Entre na pasta do backend e instale as dependências:

```bash
npm install
```

Inicie a API:

```bash
node server.js
```

A API estará disponível em:

`http://localhost:3001`

### 3. Configure o frontend

Em outro terminal, entre na pasta do frontend e instale as dependências:

```bash
npm install
```

Inicie o Next.js:

```bash
npm run dev
```

Acesse o sistema pelo navegador:

`http://localhost:3000`

## 🔗 Rotas da API

| Método | Rota               | Descrição              |
| ------ | ------------------ | ---------------------- |
| GET    | `/api/eventos`     | Lista todos os eventos |
| GET    | `/api/eventos/:id` | Consulta um evento     |
| POST   | `/api/eventos`     | Cadastra um evento     |
| PUT    | `/api/eventos/:id` | Atualiza um evento     |
| DELETE | `/api/eventos/:id` | Exclui um evento       |

## 📁 Estrutura do projeto

```text
projeto/
├── backend/
│   ├── server.js
│   ├── eventos.json
│   └── package.json
│
└── frontend/
    ├── src/
    │   └── app/
    │       ├── page.jsx
    │       └── eventos/
    │       └── addEvento/
    │       └── components/
    ├── package.json
    └── ...
```

*Observação: ajuste a estrutura acima caso os arquivos estejam organizados de outra forma no seu projeto.*

## 💡 Objetivo

O projeto tem como objetivo facilitar o gerenciamento de eventos e locações de quadras esportivas, centralizando informações sobre horários, responsáveis, valores e pagamentos em uma aplicação web simples e intuitiva.
