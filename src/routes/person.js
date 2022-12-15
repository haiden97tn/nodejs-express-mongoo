let express = require('express')
let router = express.Router()

router.get('/person', (req, res) => {
    if (req.query.name) {
        res.send(`You have req a person ${req.query.name} `)
    } else {
        res.send('You have req a person')
    }
})

router.get('/person/:name', (req, res) => {
    res.send(`You have req a person ${req.params.name} `)
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error')
})

module.exports = router