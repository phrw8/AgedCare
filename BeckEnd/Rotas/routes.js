const express = require('express')
const router = express.Router()
const UserController = require('../controller/controller')




router.post('/cadastro',UserController.RotaCadastro)


module.exports = router