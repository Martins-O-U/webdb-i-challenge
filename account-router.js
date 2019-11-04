const express = require('express');
const db = require('./data/dbConfig.js');

const router = express.Router()

function checkRequiredField(req, res, next) {
    if (req.body.name && req.body.budget) {
        next();
    } else {
        res.status(400).json({ error: "please provide all the needed values (Name and Budget)" })
    }
}

router.get('/', (req, res)=>{
    db('accounts')
    .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(500).json({ message: 'this went wrong: ' + error.message });
    });
})

module.exports = router;