const { v4: uuid } = require('uuid')
const repositories = require('../model/Repository')

const repositoryController = {
    list: (req, res) => {
        return res.json(repositories)
    },

    create: (req, res) => {
        const { title, url, techs } = req.body

        const repository = {
            id: uuid(),
            title,
            url,
            techs,
            likes: 0,
        }

        repositories.push(repository)

        return res.status(201).json(repository)
    },

    update: (req, res) => {
        const { id } = req.params
        const { title, url, techs } = req.body

        repositoryIndex = repositories.findIndex(
            repository => repository.id === id
        )

        if (repositoryIndex < 0) {
            return res.status(404).json({ error: 'Repository not found' })
        }

        const repository = {
            ...repositories[repositoryIndex],
            title,
            url,
            techs,
        }

        repositories[repositoryIndex] = repository

        return res.json(repository)
    },

    delete: (req, res) => {
        const { id } = req.params

        repositoryIndex = repositories.findIndex(
            repository => repository.id === id
        )

        if (repositoryIndex < 0) {
            return res.status(404).json({ error: 'Repository not found' })
        }

        repositories.splice(repositoryIndex, 1)

        return res.status(204).send()
    },

    addLike: (request, response) => {
        const { id } = request.params

        repositoryIndex = repositories.findIndex(
            repository => repository.id === id
        )

        if (repositoryIndex < 0) {
            return response.status(404).json({ error: 'Repository not found' })
        }

        const likes = ++repositories[repositoryIndex].likes

        return response.json(repositories[repositoryIndex])
    },
}

module.exports = repositoryController
