const { Router } = require('express')

const routes = Router()

const repositoryController = require('./controllers/RepositoryController')

routes.get('/repositories', repositoryController.list)
routes.post('/repositories', repositoryController.create)
routes.put('/repositories/:id', repositoryController.update)
routes.delete('/repositories/:id', repositoryController.delete)
routes.post('/repositories/:id/like', repositoryController.addLike)

module.exports = routes
