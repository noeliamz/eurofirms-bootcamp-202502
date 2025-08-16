import bcrypt from 'bcryptjs'

import { User, Child } from '../data/index.js'
import { validate, SystemError, DuplicityError } from 'com'

export const registerUser = (username, password, name, healthCareNumber, dateOfBirth) => {
    validate.username(username)
    validate.password(password)
    validate.name(name)
    validate.healthCareNumber(healthCareNumber)
    validate.dateOfBirth(dateOfBirth)


    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            return User.create({ username, password: hash, name, healthCareNumber, dateOfBirth })
                .catch(error => {
                    if (error.code === 11000) throw new DuplicityError('user already exists') //

                    throw new SystemError('mongo error')
                })
        })
        .then(user => {
            // Creo el child asociado al nuevo usuario
            return Child.create({
                idPacient: [user._id],
                // pacient: { name: '', surnames: '', birthdate: null, address: '', healthCareNumber: '' },
                // doctor: { pregnancyDuration: '', controlledPregnancy: '', maternalSerology: '', problemsDuringPregnancy: '' }
            })
                .catch(error => {
                    throw new SystemError('mongo error')
                })
                .then(() => { })
        })
}