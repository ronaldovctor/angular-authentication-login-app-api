const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
let app = express()
let api = require('./routes/api')
let auth = require('./routes/auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

mongoose.connect('mongodb://localhost:27017/auth_test',
                { useNewUrlParser: true })

app.use('/api', api)
app.use('/auth', auth)

app.use((req, res, next) => {
    res.status(404).send('Not found.')
})

app.listen(9000)