const express = require('express');
const router = express.Router();
const UserController = require('../controller/controller.js');
const { verificarPermissaoTecnico, verificarPermissaoUsuario, VerificaAutenticacao } = require('../middlewear/verify.js');
const upload = require('../controller/controller.js').upload;

// Rota dos usuarios
router.post('/cadastro', UserController.RotaCadastro);
router.post('/login', UserController.RotaLogin);
router.patch('/usuario', UserController.RotaAtualizarUsuario); 

// Tecnico rotas
router.post('/cadastro-tec', verificarPermissaoTecnico, upload, UserController.RotaCadastroTec); 
router.post('/perfilTecAtualiza', upload, UserController.RotaPerfilTec); 
router.get('/perfilTec', verificarPermissaoTecnico, UserController.RotaPerfilTecGet); 
router.get('/tecnico/:id', UserController.RotaObterTecnicoPorId); 

//  Rotas padrão
router.get('/home', UserController.RotaHome);
router.get('/logout', UserController.RotaLogout); 
router.get('/usuario', UserController.RotaObterUsuario); 

module.exports = router;
