
function verificarPermissaoTecnico(req, res, next) {
    if (req.session.user && req.session.user.permissao === 'tecnico') {
        next();
    } else {
        res.status(403).json({ error: 'Você não tem permissão de acesso como técnico.' });
    }
}

function verificarPermissaoUsuario(req, res, next) {
    if (req.session.user && req.session.user.permissao === 'usuario') {
        next();
    } else {
        res.status(403).json({ error: 'Você não tem permissão de acesso como usuário.' });
    }
}

module.exports = { verificarPermissaoTecnico, verificarPermissaoUsuario };

