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

router.get("/limit", (req, res) => {
    db.select("*").from("accounts").orderBy(req.body.sortby).limit(req.body.limit)
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(error => {
            res.status(500).json({ message: 'this went wrong: ' + error.message });
        })

})

router.get('/:id',(req,res)=>{
    db('accounts').where({id: req.params.id})
        .then(account =>{
            if(account.length > 0){
                res.status(200).json(account)
            }else{
                res.status(400).json({message: "Account with that specific ID does not exist in the DataBase"})
            }        
        }) 
        .catch (error => {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
        })
})

router.post('/', checkRequiredField, async (req, res) => {
    accountInfo = req.body;
    try {
        const result = await db('accounts').insert(accountInfo)
        res.json('New Account got created with an id of ' + result[0]);
      } catch (error) {
        res.status(500).json({ message: 'this went wrong: ' + error.message });
      }
})

router.delete('/:id', (req, res)=>{
    db('accounts').where({id : req.params.id}).del()
        .then(deleted =>{
            if(deleted.length > 0){
                res.json(deleted + " account infomation got DELETED!")
            }else{
                res.status(400).json({message: "Account with that specific ID does not exist in the DataBase"})
            } 
        })
        .catch (error => {
            res.status(500).json({ message: 'this went wrong: ' + error.message });
        })
})

router.put('/:id', checkRequiredField, (req,res)=>{
    accountInfo = req.body;
    db('accounts').where({id: req.params.id}).update(accountInfo)
        .then(updated =>{
            if(updated.length > 0){
                res.json(updated + " Account information got UPDATED! ")
            }else{
                res.status(400).json({message: "Account with that specific ID does not exist in the DataBase"})              
            }
        })
        .catch (error => {
            res.status(500).json({ message: 'this went wrong: ' + error.message });
        })
})

module.exports = router;