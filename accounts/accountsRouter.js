const express = require('express')
const router = express.Router();
const db = require('../data/dbConfig.js')

const Accounts = {
    create(account) {
        return db('accounts')
        .insert(account)
    },
    delete(id) {
        return db('accounts')
        .where({ id })
        .del()
    }
}

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.json(accounts)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "error rerieving accounts", err});
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const account = await db.select('*').from('accounts').where({id}).first();
        if(!account) {
            res.status(400).json({
                message: "Account not found"
            })
        } else {
            res.status(200).json(account)
        } 
        }catch (error) {
            res.status(500).json({
                message: error.message,
            })
    }
})

router.post('/', async (req, res) => {
    Accounts.create(req.body)
        .then(([id]) => {
          return db('accounts').where({ id })
        })
        .then(data => {
          res.json(data)
        })
        .catch(error => {
          res.json({ message: error.message })
        })
})

router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    db('accounts').where({id}).update(changes)
    .then(count => {
        if (count) {
            res.status(200).json({ updated: count});
        } else {
            res.status(404).json({message: "invalid id"});
        }
    })
    .catch(err => {
        res.status(500).json({ message: "db problem"});
    });
});

router.delete('/:id', async (req, res) => {
const {id} = req.params

try {
    const deleted = await db.del().from('accounts').where({id});
    if(!deleted){
        res.status(404).json({
            message: "Invalid ID"
        })
    } else {
        res.status(200).json({
            Message: "Successfully deleted account"
        })
    }
} catch (error) {
    res.status(500).json({
        message: 'There was an error reaching the database'
    })
}
});





module.exports = router;