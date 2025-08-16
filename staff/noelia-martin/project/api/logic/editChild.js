import mongoose from 'mongoose'

const { Schema, model } = mongoose
const { Types } = Schema
const { ObjectId } = Types
import { Child } from '../data/index.js'

export const editChild = (idPacient, section, field, value) => {
    const updatePath = `${section}.${field}`


    return Child.findOneAndUpdate(
        { idPacient: idPacient },
        { $set: { [updatePath]: value } },
        { new: true } //Devuelve el documento actualizado

    ).then(child => {
        if (!child) throw new Error('Child no encontrado o sin permiso')
        return child
    })
}