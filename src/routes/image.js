let ImageModel = require('../models/image.model');
let express = require('express');
let router = express.Router();
let fs = require('fs');
let path = require('path');
let multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

router.post('/image', upload.single('image'), (req, res) => {

    console.log(process.cwd() + '/uploads/' + req.file.filename)

    var obj = {
        name: req.body.name,
        desc: req.body.desc,
        img: {
            data: fs.readFileSync(path.join(process.cwd() + '/uploads/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    ImageModel.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200)
            console.log('Upload file ok');
        }
    })
})

router.get('/image', (req, res) => {
    ImageModel.find({})
        .then(doc => {
            res.status(200).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;
