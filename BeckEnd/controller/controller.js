const user = require('../models/models');

class UserController {
    async RotaCadastro(req, res) {
        try {
            const { nome, fone, email, isTec, password } = req.body; 

            const userCriado = await user.criarUsuario(nome, fone, email, isTec, password);

            if (userCriado) {
                res.status(201).json({ message: 'Usuário criado com sucesso.' });
            } else {
                
                res.status(500).json({ message: 'Falha ao criar usuário.' });
            }
        } catch (error) {
           
            console.error('Erro ao cadastrar usuário:', error);
            res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
        }
    }
    
}

module.exports = new UserController();
