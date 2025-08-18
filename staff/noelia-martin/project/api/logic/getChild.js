import { Child } from '../data/index.js'
import { NotFoundError, SystemError } from 'com'


export const getChild = (userId) => {
    return Child.find({ idPacient: userId })
        .catch(error => { throw new SystemError(error.message) })
        .then(child => {
            if (!child || child.length === 0) throw new NotFoundError('Child no encontrado')
            return child
        })
}