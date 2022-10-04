const express=require('express')
const app = express()
const path = require('path')

app.use('/', express.static(path.join(__dirname, 'folderr/sasha')))
app.listen(3000)