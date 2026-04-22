const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base de dados
let livros = [
    { id: "1234-1899", nome: "Dom Casmurro", autor: "Machado de Assis", categoria: "Clássico", lancamento: "1899", nota: 9.5, paginas: 256 },
    { id: "5678-1949", nome: "1984", autor: "George Orwell", categoria: "Distopia", lancamento: "1949", nota: 9.8, paginas: 336 },
    { id: "4321-1937", nome: "O Hobbit", autor: "J.R.R. Tolkien", categoria: "Fantasia", lancamento: "1937", nota: 9.2, paginas: 310 },
    { id: "8765-1988", nome: "O Alquimista", autor: "Paulo Coelho", categoria: "Autoajuda", lancamento: "1988", nota: 8.5, paginas: 208 }
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