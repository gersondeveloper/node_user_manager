const User = require('../models/user.js').User
const md5 = require('MD5')

exports.create = function (req, resp) {
    const user = new User();
    user.name = req.body.name
    user.username = req.body.username
    user.password = md5(req.body.password + global.SALT_KEY)

    user.save(function (error) {
        if (error) {
            resp.status(500).json(error);
            return;
        }

        resp.status(201).json({
            name: user.name,
            username: user.username,
            image: user.image
        });
    });
}

exports.get = function (req, resp) {
    User.find({}, function (error, result){
        if (error) {
            resp.status(500).json(error);
            return;
        }

        resp.status(200).json(result)
    })
}

exports.getById = function (req, resp) {
    let id = req.params.id
    User.findOne({ }, function (error, result){
        if (error) {
            resp.status(500).json(error);
            return;
        }

        resp.status(200).json(result)
    })
}

exports.remove = function (req, resp) {
    let id = req.params.id
    User.remove({ _id: id }, function (error, user){
        if(error){
            resp.status(500).json(error)
            return
        }

        if(!user){
            resp.status(404).json({
                message: 'Usuário não encontrado'
            })
            return
        }

        resp.status(200).json({
            message: 'Usuário apagado com sucesso!'
        })
    })
}

exports.update = function(req, resp){
    let id = req.params.id
    User.findById(id, function(error, user){
        if(error){
            resp.status(500).json(error)
            return
        }

        if(!user){
            resp.status(404).json({
                message: 'Usuário não encontrado'
            })
            return
        }
        
        user.name = req.body.name
        user.image = req.body.image

        user.save(function(error){
            if(error){
                resp.status(500).json(error)
                return
            }

            resp.status(200).json({
                message: 'Usuário alterado com sucesso'
            })
        })

    })
}