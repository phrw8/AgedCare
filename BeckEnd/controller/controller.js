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
            
            const {
                nome, cpf, datanasc, org, rg, email, fone, sexo, estado, 
                logradouro, numero, cidade, uf, bairro, cep, dia, noite, 
                tarde, fds, pernoite, domicilio, hospital, asilo, clinica, 
                km, obs, avatar, banner
            } = req.body;
    
            // Validação de data no formato DD/MM/YYYY
            const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!dateRegex.test(datanasc)) {
                return res.status(400).json({ error: 'Formato de data inválido. Use DD/MM/YYYY.' });
            }
    
            const query = `
    INSERT INTO tecnico (nome, cpf, datanasc, org, rg, email, fone, sexo, estado, 
        logradouro, numero, cidade, uf, bairro, cep, dia, noite, tarde, fds, 
        pernoite, domicilio, hospital, asilo, clinica, km, obs, avatar, banner, cod_usuario) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

        const values = [
            nome, cpf, datanasc, org, rg, email, fone, sexo, estado, 
            logradouro, numero, cidade, uf, bairro, cep, dia, noite, tarde, 
            fds, pernoite, domicilio, hospital, asilo, clinica, km, obs, avatar, banner, cod_usuario
        ];

    
            connection.query(query, values, function (error, results) {
                if (error) {
                    return res.status(500).json({ error: error.message });
                } 
                res.status(200).json({ message: 'Dados do técnico inseridos com sucesso!' });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
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
                    // Limpar o cookie da sessão
                    res.clearCookie('connect.sid', { path: '/' });
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
            const cod_usuario = req.session.user.cod; // Recupera o código do usuário da sessão
            
            // Extrai os campos enviados no corpo da requisição
            const {
                nome, cpf, datanasc, org, rg, email, fone, sexo, estado,
                logradouro, numero, cidade, uf, bairro, cep,
                dia, noite, tarde, fds, pernoite, domicilio,
                hospital, asilo, clinica, km, obs
            } = req.body;
    
            const updateFields = [];
            const updateValues = [];
    
            // Validação do formato da data, se fornecida
            if (datanasc) {
                const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
                if (!dateRegex.test(datanasc)) {
                    return res.status(400).json({ error: 'Formato de data inválido. Use DD/MM/YYYY.' });
                }
                updateFields.push('datanasc=?');
                updateValues.push(datanasc);
            }
    
            // Adiciona os campos enviados para atualização
            if (nome) {
                updateFields.push('nome=?');
                updateValues.push(nome);
            }
            if (cpf) {
                updateFields.push('cpf=?');
                updateValues.push(cpf);
            }
            if (org) {
                updateFields.push('org=?');
                updateValues.push(org);
            }
            if (rg) {
                updateFields.push('rg=?');
                updateValues.push(rg);
            }
            if (email) {
                updateFields.push('email=?');
                updateValues.push(email);
            }
            if (fone) {
                updateFields.push('fone=?');
                updateValues.push(fone);
            }
            if (sexo) {
                updateFields.push('sexo=?');
                updateValues.push(sexo);
            }
            if (estado) {
                updateFields.push('estado=?');
                updateValues.push(estado);
            }
            if (logradouro) {
                updateFields.push('logradouro=?');
                updateValues.push(logradouro);
            }
            if (numero) {
                updateFields.push('numero=?');
                updateValues.push(numero);
            }
            if (cidade) {
                updateFields.push('cidade=?');
                updateValues.push(cidade);
            }
            if (uf) {
                updateFields.push('uf=?');
                updateValues.push(uf);
            }
            if (bairro) {
                updateFields.push('bairro=?');
                updateValues.push(bairro);
            }
            if (cep) {
                updateFields.push('cep=?');
                updateValues.push(cep);
            }
            if (dia) {
                updateFields.push('dia=?');
                updateValues.push(dia);
            }
            if (noite) {
                updateFields.push('noite=?');
                updateValues.push(noite);
            }
            if (tarde) {
                updateFields.push('tarde=?');
                updateValues.push(tarde);
            }
            if (fds) {
                updateFields.push('fds=?');
                updateValues.push(fds);
            }
            if (pernoite) {
                updateFields.push('pernoite=?');
                updateValues.push(pernoite);
            }
            if (domicilio) {
                updateFields.push('domicilio=?');
                updateValues.push(domicilio);
            }
            if (hospital) {
                updateFields.push('hospital=?');
                updateValues.push(hospital);
            }
            if (asilo) {
                updateFields.push('asilo=?');
                updateValues.push(asilo);
            }
            if (clinica) {
                updateFields.push('clinica=?');
                updateValues.push(clinica);
            }
            if (km) {
                updateFields.push('km=?');
                updateValues.push(km);
            }
            if (obs) {
                updateFields.push('obs=?');
                updateValues.push(obs);
            }
    
            // Se nenhum campo foi enviado para atualização, retorna erro
            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
            }
    
            // Construção dinâmica da query
            const query = `
                UPDATE aged.tecnico
                SET ${updateFields.join(', ')}
                WHERE cod_usuario=?
            `;
            updateValues.push(cod_usuario);
    
            // Execução da query
            connection.query(query, updateValues, function (error, results, fields) {
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

    async RotaAtualizarAvatar(req,res){
        const cod_usuario = req.session.user?.cod; // Verifica se o user existe na sessão
    const { avatar } = req.body; // Obtém avatar do body

    if (!cod_usuario) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    if (!avatar) {
        return res.status(400).json({ error: 'Avatar não informado.' });
    }

    const query = `
        UPDATE tecnico
        SET avatar = ?
        WHERE cod_usuario = ?
    `;

    connection.query(query, [avatar, cod_usuario], (error, results) => {
        if (error) {
            console.error('Erro ao atualizar avatar:', error.message);
            return res.status(500).json({ error: 'Erro ao atualizar avatar.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Técnico não encontrado.' });
        }

        res.status(200).json({ message: 'Avatar atualizado com sucesso!' });
    });
        
    }
    
    

    async RotaAtualizarDisponibilidades(req, res) {
        try {
            const cod_usuario = req.session.user.cod; // Recupera o código do usuário da sessão
    
            // Extrai os campos enviados no corpo da requisição
            const { dia, noite, tarde, fds, pernoite } = req.body;
    
            const updateFields = [];
            const updateValues = [];
    
            // Adiciona os campos de disponibilidade para atualização, caso sejam fornecidos
            if (dia !== undefined) {
                updateFields.push('dia=?');
                updateValues.push(dia ? 'true' : 'false'); // Converte booleano para string
            }
            if (noite !== undefined) {
                updateFields.push('noite=?');
                updateValues.push(noite ? 'true' : 'false'); // Converte booleano para string
            }
            if (tarde !== undefined) {
                updateFields.push('tarde=?');
                updateValues.push(tarde ? 'true' : 'false'); // Converte booleano para string
            }
            if (fds !== undefined) {
                updateFields.push('fds=?');
                updateValues.push(fds ? 'true' : 'false'); // Converte booleano para string
            }
            if (pernoite !== undefined) {
                updateFields.push('pernoite=?');
                updateValues.push(pernoite ? 'true' : 'false'); // Converte booleano para string
            }
    
            // Se nenhum campo foi enviado para atualização, retorna erro
            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'Nenhum campo de disponibilidade para atualizar.' });
            }
    
            // Construção dinâmica da query
            const query = `
                UPDATE tecnico
                SET ${updateFields.join(', ')}
                WHERE cod_usuario=?
            `;
            updateValues.push(cod_usuario);
    
            // Execução da query
            connection.query(query, updateValues, function (error, results, fields) {
                if (error) {
                    return res.status(500).send({ error: error.message });
                }
                res.status(200).send({ message: 'Disponibilidades atualizadas com sucesso!' });
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
    

    async RotaAtualizarLugares(req, res) {
        try {
            const cod_usuario = req.session.user.cod; // Recupera o código do usuário da sessão
    
            // Extrai os campos enviados no corpo da requisição
            const { domicilio,hospital,asilo,clinica} = req.body;
    
            const updateFields = [];
            const updateValues = [];
    
            // Adiciona os campos de disponibilidade para atualização, caso sejam fornecidos
            if (domicilio !== undefined) {
                updateFields.push('domicilio=?');
                updateValues.push(domicilio ? 'true' : 'false'); // Converte booleano para string
            }
            if (hospital !== undefined) {
                updateFields.push('hospital=?');
                updateValues.push(hospital ? 'true' : 'false'); // Converte booleano para string
            }
            if (asilo !== undefined) {
                updateFields.push('asilo=?');
                updateValues.push(asilo ? 'true' : 'false'); // Converte booleano para string
            }
            if (asilo !== undefined) {
                updateFields.push('asilo=?');
                updateValues.push(asilo ? 'true' : 'false'); // Converte booleano para string
            }
            if (clinica !== undefined) {
                updateFields.push('clinica=?');
                updateValues.push(clinica ? 'true' : 'false'); // Converte booleano para string
            }
    
            // Se nenhum campo foi enviado para atualização, retorna erro
            if (updateFields.length === 0) {
                return res.status(400).json({ error: 'Nenhum campo de disponibilidade para atualizar.' });
            }
    
            // Construção dinâmica da query
            const query = `
                UPDATE tecnico
                SET ${updateFields.join(', ')}
                WHERE cod_usuario=?
            `;
            updateValues.push(cod_usuario);
    
            // Execução da query
            connection.query(query, updateValues, function (error, results, fields) {
                if (error) {
                    return res.status(500).send({ error: error.message });
                }
                res.status(200).send({ message: 'Disponibilidades atualizadas com sucesso!' });
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

    async RotaObterUsuario(req, res) {
        try {
            const cod_usuario = req.session.user.cod;

            const query = `
                SELECT nome, email FROM usuarios WHERE cod = ?
            `;

            connection.query(query, [cod_usuario], function (error, results, fields) {
                if (error) {
                    res.status(500).send({ error: error.message });
                } else {
                    res.status(200).json(results[0]);
                }
            });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    async RotaAtualizarUsuario(req, res) {
        try {
            const cod_usuario = req.session.user.cod;
            const { nome, email } = req.body;

            const query = `
                UPDATE usuarios 
                SET nome=?, email=?
                WHERE cod=?
            `;

            connection.query(query, [nome, email, cod_usuario], function (error, results, fields) {
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

    // Nova rota para obter os dados do técnico baseado no ID
async RotaObterTecnicoPorId(req, res) {
    try {
        const { id } = req.params; // Captura o ID do técnico a partir dos parâmetros da URL

        const query = 'SELECT * FROM aged.tecnico WHERE cod = ?';
        connection.query(query, [id], function (error, results, fields) {
            if (error) {
                res.status(500).send({ error: error.message });
            } else if (results.length === 0) {
                res.status(404).send({ error: 'Técnico não encontrado.' });
            } else {
                res.status(200).json(results[0]);
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async RotaRetornaUsuarios(req,res){
    try {
        const dados = await user.MostraUsuarios()
        res.status(200).json(dados)
    } catch (error) {
        console.error('Erro ao exibir usuarios:', error);
        res.status(500).json({ error: 'Erro ao exibir usuarios.' });
    }
}

async RotaDeletarUsuario(req, res) {
    try {
        const { cod } = req.params;

        const query = `
            DELETE FROM usuarios WHERE cod = ?
        `;

        connection.query(query, [cod], function (error, results, fields) {
            if (error) {
                res.status(500).send({ error: error.message });
            } else {
                res.status(200).send({ message: 'Usuário deletado com sucesso!' });
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

async RotaObterUsuarioId(req, res) {
    try {
        const { cod } = req.params; 

        const query = 'SELECT * FROM aged.usuarios WHERE cod = ?';
        connection.query(query, [cod], function (error, results, fields) {
            if (error) {
                res.status(500).send({ error: error.message });
            } else if (results.length === 0) {
                res.status(404).send({ error: 'Usuario nao encontrado.' });
            } else {
                res.status(200).json(results[0]);
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
async RotaAtualizar(req, res) {
    try {
        const { nome, email, permissao } = req.body
        const { cod } = req.params

        const query = `
            UPDATE usuarios 
            SET nome=?, email=?, permissao=?
            WHERE cod=?
        `;

        connection.query(query, [nome, email, permissao, cod], function (error, results, fields) {
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

    
}

module.exports = new UserController();

module.exports.upload = upload;
