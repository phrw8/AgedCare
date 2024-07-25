const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5050;
const rota = require('./Rotas/routes.js');
const session = require("express-session");
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

app.use(session({
    secret: 'mysecretkey', 
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, 
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(rota);

app.listen(PORT, () => {
    try {
        console.log('Servidor rodando na porta:', PORT);
    } catch (error) {
        console.error(error);
    }
});
