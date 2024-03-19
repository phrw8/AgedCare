const express = require('express')
const app = express()
const PORT = 5050
const rota = require('./Rotas/routes.js')

app.use(rota)

app.listen(PORT,()=>{
    try {
        console.log('servidor rodando')
    } catch (error) {
        console.error(error)
    }
})


