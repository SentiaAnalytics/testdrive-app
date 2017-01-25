//@flow weak
const express = require('express')
const proxy = require('express-http-proxy')
const path = require('path')
const app = express()
const {API_SERVER, PORT} = process.env

app.use(express.static('build'))
app.use('/api', proxy(API_SERVER))
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'build/index.html')))

app.listen(PORT, () => console.log(`server listening on port ${PORT}`))
