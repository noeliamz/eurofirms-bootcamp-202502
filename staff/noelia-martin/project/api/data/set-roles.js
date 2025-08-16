import mongoose from 'mongoose'
import { User, Child } from './models.js'

const { connect, disconnect } = mongoose

connect('mongodb://localhost:27017/test-ChildHealthDocument')
    .then(() => {
        return User.findById('689f1c0d508abc4ff2adc80d')
            .catch(error => { throw new Error(error.message) })
            .then(user => {
                user.role = 'doctor'

                // Elimino su Child ya que deja de ser pacient
                return Child.deleteMany({ idPacient: user._id })
                    .then(() => user.save())
                    .catch(error => { throw new Error(error.message) })
            })
            .then(() => console.log('roles set and Child removed'))
    })
    .catch(error => console.error(error))
    .finally(() => disconnect())