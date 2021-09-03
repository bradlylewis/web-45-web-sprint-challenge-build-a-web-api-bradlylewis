const Project = require('./projects-model');

async function validateID(req, res, next) {
    try{
        const { id } = req.params
        const project = await Project.get(id)
        if(!project){
            next({
                status: 404,
                message: 'user not found'
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
          message: 'project not found',
      })
}};

async function validateBody(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !name.trim()) {
        res.status(400).json({
        message: 'missing required name field'
})
    } else if (!description || !description.trim()) {
        res.status(400).json({
        message: 'missing required description field'
})}
    else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
        }
    }

module.exports = { validateID, validateBody }