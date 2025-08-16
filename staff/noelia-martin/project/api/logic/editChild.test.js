import { editChild } from './editChild.js'
import { connect, disconnect } from '../data/index.js'

connect('mongodb://localhost:27017/test-ChildHealthDocument')
    .then(() => { return editChild('689f1c02e7019f845f7e3a72', 'doctor', 'pregnancyDuration', '38semanas') })
    .then(child => console.log('child actualizado'))
    .catch(error => console.error(error.message))
    .finally(() => disconnect())