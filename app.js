const express = require("express")
const app = express()
const path = require("path")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get("/users", (req, res) => {
    res.send("<h1> Lista de Usuários </h1>")
})

app.listen(3000, () => {
    console.log("Servidor Rodando em http://localhost:3000")
})