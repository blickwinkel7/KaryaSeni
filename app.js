"use strict"

const express = require("express")
const app = express()
const port = 3000
const session = require("express-session")
const routes = require("./routes")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true
    }
}))

app.use(routes)

app.use("/", routes)

app.listen(port, () =>{
    console.log(`Listening to port : ${port}`)
})