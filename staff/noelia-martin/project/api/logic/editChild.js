import { SystemError, NotFoundError, validate } from 'com'
import { Child } from '../data/index.js'

export const editChild = (idPacient, section, field, value) => {
    validate.section(section)
    validate.field(field)
    validate.value(value)

    const updatePath = `${section}.${field}`


    return Child.findOneAndUpdate(
        { idPacient: idPacient },
        { $set: { [updatePath]: value } },
        { new: true } //Devuelve el documento actualizado
    )
        .catch(error => { throw new SystemError(error.message) })
        .then(child => {
            if (!child) throw new NotFoundError('Child no encontrado')
            return child
        })

}