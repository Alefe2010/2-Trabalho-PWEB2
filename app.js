const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Base de dados
let livros = [
    { id: "1001-1899", nome: "Dom Casmurro", autor: "Machado de Assis", categoria: "Clássico", lancamento: "1899", nota: 9.5, paginas: 256 },
    { id: "1002-1949", nome: "1984", autor: "George Orwell", categoria: "Distopia", lancamento: "1949", nota: 9.8, paginas: 336 },
    { id: "1003-1937", nome: "O Hobbit", autor: "J.R.R. Tolkien", categoria: "Fantasia", lancamento: "1937", nota: 9.2, paginas: 310 },
    { id: "1004-1988", nome: "O Alquimista", autor: "Paulo Coelho", categoria: "Ficção", lancamento: "1988", nota: 8.5, paginas: 208 },
    { id: "1005-1943", nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", categoria: "Fábula", lancamento: "1943", nota: 9.9, paginas: 96 },
    { id: "1006-1813", nome: "Orgulho e Preconceito", autor: "Jane Austen", categoria: "Romance", lancamento: "1813", nota: 9.4, paginas: 424 },
    { id: "1007-1954", nome: "A Sociedade do Anel", autor: "J.R.R. Tolkien", categoria: "Fantasia", lancamento: "1954", nota: 9.7, paginas: 576 },
    { id: "1008-1967", nome: "Cem Anos de Solidão", autor: "Gabriel García Márquez", categoria: "Realismo", lancamento: "1967", nota: 9.6, paginas: 448 },
    { id: "1009-1951", nome: "O Apanhador no Campo de Centeio", autor: "J.D. Salinger", categoria: "Clássico", lancamento: "1951", nota: 8.8, paginas: 214 },
    { id: "1010-2011", nome: "Sapiens", autor: "Yuval Noah Harari", categoria: "História", lancamento: "2011", nota: 9.5, paginas: 464 },
    { id: "1011-1997", nome: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", categoria: "Fantasia", lancamento: "1997", nota: 9.3, paginas: 223 },
    { id: "1012-1945", nome: "A Revolução dos Bichos", autor: "George Orwell", categoria: "Distopia", lancamento: "1945", nota: 9.5, paginas: 152 },
    { id: "1013-1862", nome: "Os Miseráveis", autor: "Victor Hugo", categoria: "Clássico", lancamento: "1862", nota: 9.8, paginas: 1511 },
    { id: "1014-1605", nome: "Dom Quixote", autor: "Miguel de Cervantes", categoria: "Clássico", lancamento: "1605", nota: 9.4, paginas: 1033 },
    { id: "1015-1953", nome: "Fahrenheit 451", autor: "Ray Bradbury", categoria: "Distopia", lancamento: "1953", nota: 9.1, paginas: 256 },
    { id: "1016-1847", nome: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", categoria: "Romance", lancamento: "1847", nota: 9.0, paginas: 368 },
    { id: "1017-1897", nome: "Drácula", autor: "Bram Stoker", categoria: "Terror", lancamento: "1897", nota: 9.2, paginas: 416 },
    { id: "1018-1932", nome: "Admirável Mundo Novo", autor: "Aldous Huxley", categoria: "Distopia", lancamento: "1932", nota: 9.3, paginas: 312 },
    { id: "1019-1881", nome: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", categoria: "Realismo", lancamento: "1881", nota: 9.7, paginas: 224 },
    { id: "1020-1960", nome: "O Sol é para Todos", autor: "Harper Lee", categoria: "Clássico", lancamento: "1960", nota: 9.8, paginas: 384 },
    { id: "1021-1925", nome: "O Grande Gatsby", autor: "F. Scott Fitzgerald", categoria: "Clássico", lancamento: "1925", nota: 9.1, paginas: 180 },
    { id: "1022-1851", nome: "Moby Dick", autor: "Herman Melville", categoria: "Aventura", lancamento: "1851", nota: 8.7, paginas: 656 },
    { id: "1023-1952", nome: "O Velho e o Mar", autor: "Ernest Hemingway", categoria: "Aventura", lancamento: "1952", nota: 9.0, paginas: 128 },
    { id: "1024-2003", nome: "O Caçador de Pipas", autor: "Khaled Hosseini", categoria: "Drama", lancamento: "2003", nota: 9.4, paginas: 368 },
    { id: "1025-1947", nome: "O Diário de Anne Frank", autor: "Anne Frank", categoria: "Biografia", lancamento: "1947", nota: 9.9, paginas: 352 }
];

// função que gera os ids
function gerarId(ano) {
    let id;
    do {
        const random = Math.floor(1000 + Math.random() * 9000);
        id = `${random}-${ano}`;
    } while (livros.some(l => l.id === id));

    return id;
}

// GET - listar (com filtro)
app.get("/api/livros", (req, res) => {
    const { cat } = req.query;

    if (cat) {
        const filtrados = livros.filter(l =>
            l.categoria.toLowerCase().trim() === cat.toLowerCase().trim()
        );
        return res.json(filtrados);
    }

    res.json(livros);
});

// GET - buscar por ID
app.get("/api/livros/:id", (req, res) => {
    const livro = livros.find(l => l.id === req.params.id);

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.json(livro);
});

// POST - adicionar livro
app.post("/api/livros", (req, res) => {
    const { nome, autor, categoria, paginas, lancamento } = req.body;

    const ano = lancamento || new Date().getFullYear().toString();

    const novoLivro = {
        id: gerarId(ano),
        nome,
        autor,
        categoria: categoria.trim(), // normalização aqui
        lancamento: ano,
        nota: 0,
        paginas: Number(paginas)
    };

    livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

// DELETE - remover
app.delete("/api/livros/:id", (req, res) => {
    const index = livros.findIndex(l => l.id === req.params.id);

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    livros.splice(index, 1);
    res.json({ mensagem: "Livro removido" });
});

// Formulário
app.get("/add", (req, res) => {
    res.send(`
        <h1>Adicionar Livro</h1>
        <form action="/add" method="POST">
            <input name="nome" placeholder="Nome" required><br>
            <input name="autor" placeholder="Autor" required><br>
            <input name="categoria" placeholder="Categoria" required><br>
            <input name="lancamento" placeholder="Ano"><br>
            <input name="paginas" placeholder="Páginas"><br>
            <button>Enviar</button>
        </form>
        <a href="/listar">Ver lista</a>
    `);
});

// Recebe formulário
app.post("/add", (req, res) => {
    const { nome, autor, categoria, paginas, lancamento } = req.body;

    const ano = lancamento || new Date().getFullYear().toString();

    const novoLivro = {
        id: gerarId(ano),
        nome,
        autor,
        categoria: categoria.trim(), // normalização aqui também
        lancamento: ano,
        nota: 0,
        paginas: Number(paginas)
    };

    livros.push(novoLivro);

    res.redirect("/listar");
});

// Listagem com categorias
app.get("/listar", (req, res) => {
    const { cat } = req.query;

    let filtrados = livros;

    if (cat) {
        filtrados = livros.filter(l =>
            l.categoria.toLowerCase().trim() === cat.toLowerCase().trim()
        );
    }

    // normaliza categorias (sem duplicar Fantasia / fantasia / Fantasia )
    const categorias = [...new Set(
        livros.map(l => l.categoria.trim().toLowerCase())
    )];

    let html = `<h1>Biblioteca Digital</h1>`;

    html += `<p>Filtrar por: `;
    categorias.forEach(c => {
        html += `<a href="/listar?cat=${c}">${c}</a> | `;
    });
    html += `<a href="/listar">Todos</a></p><ul>`;

    filtrados.forEach(l => {
        html += `
            <li>
                <strong>${l.nome}</strong> (${l.id}) <br>
                Autor: ${l.autor} | Categoria: ${l.categoria} <br>
                Ano: ${l.lancamento} | Nota: ${l.nota} | Páginas: ${l.paginas} <br>
                <a href="/del/${l.id}">Remover</a>
                <hr>
            </li>
        `;
    });

    html += `</ul><a href="/add">Adicionar</a>`;

    res.send(html);
});

// Remove via o link
app.get("/del/:id", (req, res) => {
    livros = livros.filter(l => l.id !== req.params.id);
    res.redirect("/listar");
});

app.listen(3000, () => {
    console.log("Rodando em http://localhost:3000/listar");
});