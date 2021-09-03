const express = require('express')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})
router.get('/:id', (req, res) => {
    console.log('hello')

})
router.post('/', (req, res) => {
    console.log('hello')

})
router.put('/:id', (req, res) => {
    console.log('hello')

})
router.delete('/:id', (req, res) => {
    console.log('hello')

})
router.get(':id/actions', (req, res) => {
    console.log('hello')

})

module.exports = router