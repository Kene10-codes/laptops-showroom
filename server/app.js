require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()

require('./services/routes')(app)

const myapp = http.createServer(app)

module.exports = myapp
