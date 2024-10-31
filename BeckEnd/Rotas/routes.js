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
router.patch('/perfilTecAtualiza', upload, UserController.RotaPerfilTec); 
router.patch('/disponibilidade', UserController.RotaAtualizarDisponibilidade)
router.get('/perfilTec', UserController.RotaPerfilTecGet); 
router.get('/tecnico/:id', UserController.RotaObterTecnicoPorId); 

//  Rotas padrão
router.get('/home', UserController.RotaHome);
router.get('/logout', UserController.RotaLogout); 
router.get('/usuario', UserController.RotaObterUsuario); 

//admin
router.get('/adm',UserController.RotaRetornaUsuarios)
router.delete('/delete/:cod',UserController.RotaRetornaUsuarios)
router.get('/user/:cod',UserController.RotaObterUsuarioId)
router.put('/atualiza/:cod',UserController.RotaAtualizar)

module.exports = router;
