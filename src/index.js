let express = require('express');
let mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017`, {
    useNewUrlParser: true, useUnifiedTopology: true
}, err => {
    console.log('Database Connected')
})


let app = express()

let path = require('path')

let bodyParser = require('body-parser');

let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let imageRoute = require('./routes/image')

var cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    // console.log(`${new Date().toString()}  => ${req.originalUrl} `);
    next()
})

app.use(personRoute)
app.use(customerRoute)
app.use(imageRoute)

app.use(express.static('public'))

app.use((req, res, next) => {
    res.status(404).send('We think you are lost!')
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.sendFile(path.join(__dirname, '..public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is start on ${PORT}`))