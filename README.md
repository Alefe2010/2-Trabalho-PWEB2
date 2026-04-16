## 👨‍💻 Autores
- Álefe Matheus Silva dos Santos
- Vinicius Rodrigues da Silva
- Vitor Miguel Rocha Calheiros

# 📚 Biblioteca de Livros - API REST

## 📌 Descrição

Este projeto consiste no desenvolvimento de uma API REST para gerenciamento de uma biblioteca de livros. A aplicação permite realizar operações básicas como adicionar, remover e filtrar livros por categoria.

O backend foi desenvolvido utilizando **Node.js** e **Express**, seguindo os princípios de arquitetura REST.

---

## 🎯 Objetivos

### Objetivo Geral
Desenvolver um backend utilizando **Express**, **Node.js** e **API REST**.

### Objetivos Específicos
- Compreender os conceitos de servidores Web e de aplicação  
- Praticar a criação de servidores com Node.js  
- Implementar uma API REST na prática  

---

## ⚙️ Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- (Opcional) Nodemon

---

## 📚 Estrutura dos Dados

Cada livro possui os seguintes atributos:

- `id` → Identificador único  
- `autor` → Nome do autor  
- `dataLancamento` → Data de lançamento  
- `nota` → Avaliação do livro  
- `paginas` → Quantidade de páginas  
- `categoria` → Categoria do livro  

---

## 🚀 Funcionalidades

- ✅ Adicionar livros na biblioteca  
- ✅ Remover livros da biblioteca  
- ✅ Listar todos os livros  
- ✅ Filtrar livros por categoria  

---

## 📡 Endpoints da API

### 📥 Adicionar livro
POST /livros

### 📄 Listar todos os livros
GET /livros

### 🔍 Filtrar por categoria
GET /livros?categoria=nomeCategoria

### ❌ Remover livro
DELETE /livros/:id

---

## 🛠️ Como executar o projeto

### 1. Clonar o repositório
git clone <url-do-repositorio>

### 2. Acessar a pasta
cd nome-do-projeto

### 3. Instalar dependências
npm install

### 4. Rodar o servidor
npm start

ou (com nodemon):
npm run dev
