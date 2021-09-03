
const express = require('express');
const Actions = require('./actions-model')
const { ActionID, ActionBody } = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res, next)=>{
    Actions.get()
    .then(actions => {
        console.log(actions)
        res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id',ActionID, ( req, res)=>{
    res.json(req.actions)
})

router.post('/', ActionBody, async (req, res, next) => {
    try {
        const newAction = await Actions.insert({
            project_id: req.project_id,
            description: req.description,
            notes: req.notes,
            completed: req.completed
    })
            res.status(201).json(newAction)
    } catch (err) {
            next(err)
    }
    })


router.put('/:id',ActionID, ActionBody,( req, res, next)=>{
    Actions.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed

    })
    .then(() => {
        return Actions.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', ActionID, async ( req, res, next)=>{
    try{
       const daddy = await Actions.remove(req.params.id)
        res.json(daddy)
    }catch (err) {
        next(err)
    }
    
})





module.exports = router