const express = require("express")
const server = express()

//Pega o db
//Para eu utilizar o require, preciso usar o module.exports, no db.js
const db = require("./database/db.js")

//Configurar pasta publica
server.use(express.static("public"))

//Habilita o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

/* 
    Configurar as rotas da aplicação
    
    "/" → Home/Página Inicial
    req → Requisição 
    res → Resposta 
*/
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})

// O parâmetro "/create-point", vai ser o recurso que aparece no navegador
server.get("/create-point", (req, res) => {

    /*
        req.query → Query Strings da URL
        console.log(req.query)
    */

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    /*
        req.body → O corpo da requisição
        console.log(req.body)
    */

    //Inserir dados no db
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

// O parâmetro "/search", vai ser o recurso que aparece no navegador
server.get("/search", (req, res) => {

    const search = req.query.search

    // Se a pesquisa for vazia
    if(search == ""){
        return res.render("search-results.html", {total: 0})
    }

    //Pegar os dados do db
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
        if(err){
            return console.log(err)
        }

        const total = rows.length

        //Returns HTMl page with data from database
        return res.render("search-results.html", {places: rows, total}) //Poderia ser total: total
    })
})

// Ligar o servidor ↓
server.listen(3000)