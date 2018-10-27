const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config/config')
const routes = require('./routes/routes')

const app = express()
mongoose.connect(config.connectionString)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use('/api', routes)

module.exports = app