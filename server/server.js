const express = require('express')
const server = express()
const graphHTTP = require('express-graphql')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('./routes/routes')
const schema = require('./schema/schema')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: true}))
server.use('/graphql', graphHTTP({
    schema,
    graphiql: true
}))
server.use('/', routes)
const port = 4000
server.listen(port, () => {
    console.log(`Bank clone is using ${port}`)
})

mongoose.connect('mongodb://localhost:27017/Bvnclone', { useNewUrlParser: true, useUnifiedTopology: true })