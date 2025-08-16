import { getChild } from './getChild.js'
import { connect, disconnect } from '../data/index.js'

connect('mongodb://localhost:27017/test-ChildHealthDocument')
    .then(() => { return getChild('68925914d50c4b99af9c0c51') })
    .then(child => console.log('child gotten', child))
    .catch(error => console.error(error.message))
    .finally(() => disconnect())