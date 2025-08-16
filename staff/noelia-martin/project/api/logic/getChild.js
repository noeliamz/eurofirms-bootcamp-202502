import { Child } from '../data/index.js'

export const getChild = (userId) => {
    return Child.find({ idPacient: userId })
        .then(child => {
            return child
        })
        .catch(error => {
            console.error('Error:', error)
            throw error
        })
}