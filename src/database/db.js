//Importar a dependência do SQLite 3
const sqlite3 = require("sqlite3").verbose()

//Inicia o objeto de banco de dados, que fará operações dentro do bd
const db = new sqlite3.Database("./src/database/database.db")

//exporta o db
module.exports = db

//Utiliza o obj de banco de dados
db.serialize(() =>{
    /*  
        Utilizando comandos SQl:
            • Cria uma tabela //1
                chamada places
            • Inserir dados na tabela //2
            • Consultar dados na tabela //3
            • Deletar um dado da tabela ↓
    
   
    //1↓
   db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id        INTEGER PRIMARY KEY AUTOINCREMENT,
            image     TEXT,
            name      TEXT,
            address   TEXT,
            address2  TEXT,
            state     TEXT,
            city      TEXT,
            items     TEXT
        ); 
   `)

    //2↓
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
        "https://images.unsplash.com/photo-1516992654410-9309d4587e94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    db.run(query, values, afterInsertData)
    */
    //3↓
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })

    /*
    //4↓
    
        //Quando se usa ?, é necessário ter uma coleção (array) de interrogações
        db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
            if(err){
                return console.log(err)
            }
        
            console.log("Registro deletado com sucesso")
        })
    */
})