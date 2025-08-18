import express from 'express'
import cors from 'cors'
import { connect } from './data/index.js'

import { usersRouter } from './routes/usersRouter.js'
import { childrenRouter } from './routes/childrenRouter.js'

import { errorHandler } from './middlewares/errorHandler.js'



const { MONGO_URL, PORT } = process.env

connect(MONGO_URL)
    .then(() => {
        const api = express()

        api.use(cors())

        api.get('/', (request, response) => {
            response.send('Hello! API here 😉')
        })
        api.use('/users', usersRouter)
        api.use('/children', childrenRouter)

        api.use(errorHandler)

        api.listen(PORT, () => console.log(`API listening on port ${PORT}`))

    })
    .catch(error => console.error(error.message))