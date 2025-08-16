import { Router } from 'express';

import { jsonBodyParser } from '../middlewares/jsonBodyParser.js';
import { logic } from '../logic/index.js';
import jwt from 'jsonwebtoken'

const { JWT_SECRET } = process.env


export const childrenRouter = Router()

childrenRouter.use((request, response, next) => {
    console.log(`📡 ${request.method} ${request.originalUrl}`)
    next()
})

childrenRouter.get('/', (request, response, next) => {
    try {
        const authorization = request.headers.authorization

        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET)

        logic.getChild(userId)
            .then(child => response.status(200).json(child))
            .catch(error => next(error))

    } catch (error) {
        next(error)
    }
})

childrenRouter.put('/edit', jsonBodyParser, (request, response, next) => {
    try {
        const authorization = request.headers.authorization

        const token = authorization.slice(7)

        const { sub: idPacient } = jwt.verify(token, JWT_SECRET)

        const { section, field, value } = request.body

        logic.editChild(idPacient, section, field, value)
            .then((child) => response.status(200).json(child))
            .catch(next)

    } catch (error) {
        next(error)
    }
})
