const express = require('express')
const userController = require('../controllers/userController')
const accountController = require('../controllers/accountController')
const auth = require('../security/auth')

let router = express.Router();



//Post user
router.post('/users', auth.authorize, userController.create)
router.get('/users', auth.authorize, userController.get)
router.get('/users/:id', auth.isAdmin, userController.getById)
router.put('/users/:id', auth.isAdmin, userController.update)
router.delete('/users/:id', auth.isAdmin, userController.remove)

router.post('/login', accountController.authenticate)

module.exports = router
