const express = require('express')
const { validateID, validateBody } = require('./projects-middleware')
const Project = require('./projects-model')
const router = express.Router()

router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get("/:id" ,validateID, (req, res) =>{
    res.json(req.project)
})
    
router.post("/", validateBody, async (req, res, next) => {
    try {
        const newProject = await Project.insert({
            name: req.name,
            description: req.description,
            completed: req.completed,
        })
        res.status(201).json(newProject)
    } catch (err){
        next(err)
    }
}) 

router.put('/:id', validateID, validateBody, (req, res, next) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.completed
    })
    .then(() => {
        return Project.get(req.params.id)
    })
    .then(project => {
        res.json(project)
    })
    .catch(next)
})

router.delete("/:id", validateID, async (req, res, next) => {
    const id = req.params.id
    try {
        const results = await Project.remove(id)
        res.json(results)
    } catch (err) {
        next(err)
    }
});

router.get(':id/actions', (req, res) => {
    router.get("/:id/actions",validateID, (req, res, next) => {
        Project.getProjectActions(req.params.id)
        .then(actions => {
            {res.json(actions)}
        })
        .catch(next)
    }) 
})

module.exports = router