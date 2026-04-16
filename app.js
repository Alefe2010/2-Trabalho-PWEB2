const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

// Array com alguns livros para melhor aproveitamento do código 
let livros = [
    { id: 1, nome: "Dom Casmurro", autor: "Machado de Assis" },
    { id: 2, nome: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry" },
    { id: 3, nome: "1984", autor: "George Orwell" },
    { id: 4, nome: "O Alquimista", autor: "Paulo Coelho" },
    { id: 5, nome: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis" },
    { id: 6, nome: "Cem Anos de Solidão", autor: "Gabriel García Márquez" },
    { id: 7, nome: "A Revolução dos Bichos", autor: "George Orwell" },
    { id: 8, nome: "O Hobbit", autor: "J.R.R. Tolkien" },
    { id: 9, nome: "Orgulho e Preconceito", autor: "Jane Austen" },
    { id: 10, nome: "Grande Sertão: Veredas", autor: "Guimarães Rosa" }
]

app.get("/add", (req, res) => {
    res.send(`
        <h1> Adicionar Livros </h1>
        <form action="/add" method="POST">
            <div>
                <label for="nm">Nome</label>
                <input type="text" name="nomeLivro" id="nm">
            </div>
            <button type="submit">Enviar</button>
        </form>
    `)
})
app.post("/add", (req, res) => {
    const nome = req.body.nomeLivro
    const novolivro = {
        id: livros.length,
        nome: nome
    }
    livros.push(novolivro)
    console.log(`O livro ${nome}, foi adicionado ao sistema!`)
    console.log(livros)
    res.send(`Livro adicionado com sucesso!
        <p>Você será redirecionado em 3 segundos...</p>
        <script>
            setTimeout(() => {
                window.location.href = "/"
            }, 3000);
        </script>
    `)
})
app.get("/listar", (req, res) => {
    let html = "<h1>Lista de Livros</h1><ul>"
    
    livros.forEach(livro => {
        html += `
            <li>
                ${livro.nome} 
                <a href="/del/${livro.id}">[Remover]</a>
            </li>`
    })
    res.send(html
        + `<a href="/">Voltar</a>`
    )
})
app.get("/del/:id", (req, res) => {
    const { id } = req.params

    // Encontra o índice do livro no array pelo ID
    const index = livros.findIndex(l => l.id == id)

    if (index !== -1) {
        const livroRemovido = livros[index]
        livros.splice(index, 1)
        res.send(`Livro com ID ${id} removido com sucesso! <a href="/listar">Voltar</a>`)

        console.log(`O livro [${livroRemovido.nome}]foi removido!`)
    }
    else {
        res.send("Livro não encontrado!")
    }
})
app.listen(3000, () => {
    console.log("Servidor Rodando em http://localhost:3000")
})