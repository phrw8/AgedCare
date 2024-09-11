const connection = require('../bd/db');
//aki é a class do model
class User {
    //funçao utilizada para criar o usuario no caso o cadastro
    criarUsuario(nome, email,senha,permissao) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO aged.usuarios (nome,email,senha,permissao) VALUES (?, ?, ?, ?)';
            connection.query(query, [nome,email,senha,permissao], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve('Usuário criado com sucesso.');
                    } else {
                        reject(new Error('Falha ao criar usuário.'));
                    }
                }
            });
        });
    }


    //funçao para login do usuario
    Login(nome, senha) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM aged.usuarios WHERE nome = ? AND senha = ?';
            connection.query(query, [nome,senha], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.length > 0) {
                        resolve(results[0]);
                    } else {
                        reject(new Error('E-mail ou senha incorretos.'));
                    }
                }
            });
        });
    }
    //  nao esta sendo utilizada!!!
    CriarTecnico(nome,cpf,datanasc,org,rg,email,fone,sexo,estado,logradouro,numero,cidade,uf,bairro,cep,dia,noite,tarde,fds,pernoite,domicilio,hospital,asilo,clinica,km,foto,identidade,obs,cod_usario) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO aged.tecnico (nome,cpf,datanasc,org,rg,email,fone,sexo,estado,logradouro,numero,cidade,uf,bairro,cep,dia,noite,tarde,fds,pernoite,domicilio,hospital,asilo,clinica,km,foto,identidade,obs,cod_usario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(query, [nome,cpf,datanasc,org,rg,email,fone,sexo,estado,logradouro,numero,cidade,uf,bairro,cep,dia,noite,tarde,fds,pernoite,domicilio,hospital,asilo,clinica,km,foto,identidade,obs,cod_usario], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve('Técnico criado com sucesso.');
                    } else {
                        reject(new Error('Falha ao criar técnico.'));
                    }
                }
            });
        });
    }
    //função de mostrar os tecnicos
    MostraTecnicos() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM aged.tecnico';
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
    MostraUsuarios() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM aged.usuarios';
            connection.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }
   
}

module.exports = new User();