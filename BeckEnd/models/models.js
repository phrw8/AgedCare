const connection = require('../bd/db');

class User {
    async criarUsuario(nome,fone, email,isTec,password) {
        try {
            const query = 'INSERT INTO agedcare.clientes (nome,fone, email, isTec,password) VALUES (?, ?, ?, ?, ?)';
            const result = await connection.query(query, [nome, fone,email,isTec,password]);

            if (result.affectedRows > 0) {
                console.log('Usuário criado com sucesso.');
                return true;
            } else {
                console.log('Falha ao criar usuário.');
                return false;
            }
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    }
}

module.exports = new User();
