const multer = require('multer');
const path = require('path');
const connection = require('../bd/db.js');
const user = require('../models/models');

//aki manipula as imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage }).fields([
  { name: 'foto', maxCount: 1 }, 
  { name: 'identidade', maxCount: 1 }
]);

// a class controller
class UserController {
    // rota do cadastro
    async RotaCadastro(req, res) {
        const { nome, email, senha, permissao } = req.body;
    
        try {
            const message = await user.criarUsuario(nome,email,senha,permissao);
            console.log(message)
            res.status(201).json({ success: true, message });
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
    // rota do login
    async RotaLogin(req, res) {
        const { nome, senha } = req.body; 
        try {
            const usuarioAutenticado = await user.Login(nome, senha);
            
            req.session.user = usuarioAutenticado;

            console.log(req.session.user)
    
            res.status(200).json({ 
                message: 'Login bem-sucedido.',
                user: {
                    cod: usuarioAutenticado.cod,
                    permissao: usuarioAutenticado.permissao
                } 
            }); 
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            res.status(401).json({ error: 'E-mail ou senha incorretos.' });
        }
    }
    
    //rota do cadastro do tec as informaçoes a mais 
    async RotaCadastroTec(req, res) {
        try {
            const cod_usuario = req.session.user.cod;
            const { nome, cpf, datanasc, org, rg, email, fone, sexo, estado, logradouro, numero, cidade, uf, bairro, cep, dia, noite, tarde, fds, pernoite, domicilio, hospital, asilo, clinica, km, obs} = req.body;

            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/

        if (!dateRegex.test(datanasc)) {
            return res.status(400).json({ error: 'Formato de data inválido. Use DD/MM/YYYY.' });
        }

            if (!req.files || !req.files.foto || !req.files.identidade) {
              return res.status(400).json({ error: 'Alguma imagem não foi enviada.' });
            }

            const foto = req.files.foto[0].filename; 
            const identidade = req.files.identidade[0].filename;

            const query = `
                INSERT INTO aged.tecnico (nome, cpf, datanasc, org, rg, email, fone, sexo, estado, 
                    logradouro, numero, cidade, uf, bairro, cep, dia, noite, 
                    tarde, fds, pernoite, domicilio, hospital, asilo, clinica, 
                    km, foto, identidade, obs, cod_usuario) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            
            connection.query(query, [nome, cpf, datanasc, org, rg, email, fone, sexo, estado, 
                logradouro, numero, cidade, uf, bairro, cep, dia, noite, 
                tarde, fds, pernoite, domicilio, hospital, asilo, clinica, 
                km, foto, identidade, obs, cod_usuario], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: error.message });
                } else {
                    res.status(200).send({ message: 'Dados inseridos com sucesso!' });
                }
            });

        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    //rota home que retornar os dados de todos tecnicos
    async RotaHome(req,res){
        try {
            const dados = await user.MostraTecnicos()
            res.status(200).json(dados)
        } catch (error) {
            console.error('Erro ao exibir técnicos:', error);
            res.status(500).json({ error: 'Erro ao exibir técnicos.' });
        }
    }
    //rota de logout
    async RotaLogout(req, res) {
        try {
            req.session.destroy((error) => {
                if (error) {
                    console.error('Erro ao fazer logout:', error);
                    res.status(500).json({ error: 'Erro ao fazer logout.' });
                } else {
                    res.status(200).json({ message: 'Logout bem-sucedido.' });
                }
            });
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            res.status(500).json({ error: 'Erro ao fazer logout.' });
        }
    }
    //rota de atualizar o perfil do tecnico
    async RotaPerfilTec(req, res) {
        try {
            const cod_usuario = req.session.user.cod; 
            
            const { nome, cpf, datanasc, org, rg, email, fone, sexo, estado, logradouro, numero, cidade, uf, bairro, cep, dia, noite, tarde, fds, pernoite, domicilio, hospital, asilo, clinica, km, obs } = req.body;
        
            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/
            
            if (!dateRegex.test(datanasc)) {
                return res.status(400).json({ error: 'Formato de data inválido. Use DD/MM/YYYY.' });
            }
            
            if (!req.files || !req.files.foto || !req.files.identidade) {
                return res.status(400).json({ error: 'Alguma imagem não foi enviada.' });
            }
    
            
            const foto = req.files.foto[0].filename;
            const identidade = req.files.identidade[0].filename;
    
            const query = `
                UPDATE aged.tecnico 
                SET nome=?, cpf=?, datanasc=?, org=?, rg=?, email=?, fone=?, sexo=?, estado=?, 
                logradouro=?, numero=?, cidade=?, uf=?, bairro=?, cep=?, dia=?, noite=?, 
                tarde=?, fds=?, pernoite=?, domicilio=?, hospital=?, asilo=?, clinica=?, 
                km=?, foto=?, identidade=?, obs=? 
                WHERE cod_usuario=?
            `;
            connection.query(query, [nome, cpf, datanasc, org, rg, email, fone, sexo, estado,
                logradouro, numero, cidade, uf, bairro, cep, dia, noite,
                tarde, fds, pernoite, domicilio, hospital, asilo, clinica,
                km, foto, identidade, obs, cod_usuario], function (error, results, fields) {
                    if (error) {
                        res.status(500).send({ error: error.message });
                    } else {
                        res.status(200).send({ message: 'Dados atualizados com sucesso!' });
                    }
                });
    
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    //rota do perfil do tecnico que retorna informaçoes dele baseado no tecnico auntenticado
    async RotaPerfilTecGet(req, res) {
        try {
            const cod_usuario = req.session.user.cod; 
            const query = 'SELECT * FROM aged.tecnico WHERE cod_usuario=?';
            connection.query(query, [cod_usuario], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: error.message });
                } else {
                    res.status(200).json({ data: results[0] });
                }
            });

        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    
}

module.exports = new UserController();

module.exports.upload = upload;
