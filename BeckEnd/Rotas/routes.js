const express = require('express');
const router = express.Router();
const UserController = require('../controller/controller.js');
const {verificarPermissaoTecnico,verificarPermissaoUsuario,VerificaAutenticacao} = require('../middlewear/verify.js');
const upload = require('../controller/controller.js').upload;

router.post('/cadastro', UserController.RotaCadastro);
router.post('/login', UserController.RotaLogin);
router.post('/perfilTecAtualiza',upload,UserController.RotaPerfilTec)
router.post('/cadastro-tec', verificarPermissaoTecnico, upload, UserController.RotaCadastroTec); 
router.get('/home',VerificaAutenticacao,UserController.RotaHome);
router.get('/logout', UserController.RotaLogout);
router.get('/perfilTec',verificarPermissaoTecnico,UserController.RotaPerfilTecGet)

module.exports = router;
