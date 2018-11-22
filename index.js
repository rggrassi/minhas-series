const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const pagesRouter = require('./routes/pages')
const seriesRouter = require('./routes/series')

const port = process.env.PORT || 3000
const mongo = process.env.MONGODB || 'mongodb://localhost/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', pagesRouter)
app.use('/series', seriesRouter)

mongoose
    .connect(mongo,  { useNewUrlParser: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Listening on port: ${port}`)
        })
    })
    .catch( err => {
        console.log(err)
    } )