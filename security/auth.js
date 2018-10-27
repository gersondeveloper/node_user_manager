const jwt = require('jsonwebtoken')

exports.signIn = function(user){
    return jwt.sign({
        username: user.username,
        admin: user.admin}, 
        global.SALT_KEY, 
        {
            expiresIn: 1440 //Expires in 24 horas
    })
}

exports.authorize = function(req, resp, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token){
        resp.status(401).json({
            message: 'Acesso restrito!'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                resp.status(401).json({
                    message: 'Token inválido!'
                })
            } else {
                next()
            }
        })
    }
}

exports.isAdmin = function(req, resp, next){
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token){
        resp.status(401).json({
            message: 'Token inválido!'
        })
    } else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                resp.status(401).json({
                    message: 'Token inválido!'
                })
            } else {
                if(decoded.admin){
                    next()
                } else {
                    resp.status(401).json({
                        message: 'Você não temn permissão para esta funcionalidade!'
                    })
                }
            }
        })
    }
}