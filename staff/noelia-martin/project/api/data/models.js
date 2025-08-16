import mongoose from 'mongoose'

const { Schema, model } = mongoose
const { Types } = Schema
const { ObjectId } = Types

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    healthCareNumber: {
        type: String,
        required: true,
        unique: true
    },

    dateOfBirth: {
        type: Date,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['pacient', 'doctor'],
        default: 'pacient'
    }
})

const child = new Schema({
    idPacient: [{ //id del niño que almacenará información
        type: ObjectId,
        ref: 'User',
        required: true
    }],
    pacient: {
        name: {
            type: String
        },
        surnames: {
            type: String
        },
        birthdate: {
            type: String
        },
        address: {
            type: String
        },
        healthCenterName: {
            type: String
        },
        healthCenterTfno: {
            type: String,
        },
        healthPediatricianName: {
            type: String
        },
        healthPediatricianTfno: {
            type: String
        },
        healthHospitalName: {
            type: String
        },
        healthHospitalTfno: {
            type: String
        },
        healthEmergenciesName: {
            type: String
        },
        healthEmergenciesTfno: {
            type: String
        }
    },

    doctor: {
        pregnancyDuration: {
            type: String
        },
        controlledPregnancy: {
            type: String
        },
        maternalSerology: {
            type: String
        },
        problemsDuringPregnancy: {
            type: String
        },
        birthPlace: {
            type: String
        },
        entryDateBirth: {
            type: String
        },
        departureDateBirth: {
            type: String
        },
        typeOfBirth: {
            type: String
        },
        earlyBreastfeelingInTheDeliveryRoom: {
            type: String
        },
        childbirthIncidentschildbirth: {
            type: String
        },
        birthWeight: {
            type: String
        },
        sex: {
            type: String
        },
        birthLenght: {
            type: String
        },
        cephalicPerimeterAtBirth: {
            type: String
        },
        bloodGroup: {
            type: String
        },
    }
})



const User = model('User', user)
const Child = model('Child', child)

export {
    User, Child
}