const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"books"
})
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//get
app.get("/api/get", (req,res) => {
    const sqlSelect = "SELECT * FROM books;"
    db.query(sqlSelect,(err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
})
/// insert
app.post("/api/insert", (req, res)=>{

    const id = req.body.id
    const Name = req.body.Name
    const Publish_Date = req.body.Publish_Date
    const Type = req.body.Type
    const Publisher = req.body.Publisher
    const sqlInsert = "INSERT INTO books (id, Name, Publish_Date, Type,Publisher) VALUES (?,?,?,?,?);"
    db.query(sqlInsert,[id, Name, Publish_Date, Type, Publisher], (err,result)=>{
        console.log(result)
    })
    
})

// delete 
app.delete("/api/delete/:id", (req,res) =>{
    const id = req.params.id
    const sqlDelete = "DELETE FROM books WHERE id = ?"
    console.log(id)
    db.query(sqlDelete, id, (err,result) =>{
       if (err) console.log(err)
    })
})
// update 
app.put("/api/update", (req,res) =>{
    const id = req.body.id
    const Name = req.body.Name
    const Publisher = req.body.Publisher
    const Publish_Date = req.body.Publish_Date
    const Type = req.body.Type
    
    const sqlUpdate = "UPDATE books SET Name = ?,Publisher = ?,Publish_Date=?,Type=?  WHERE id= ?;";
    db.query(sqlUpdate , [Name,Publisher,Publish_Date,Type, id], (err, result) => {
        if(err) console.log(err)
        console.log(result)
    })
})
// app listen 
app.listen('3002', ()=>{
    console.log("server in 3002")
})
