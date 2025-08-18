import { data } from '../data'
import { SystemError, errors, validate } from 'com'

export const editChild = (token = data.getToken(), { section, field, value }) => {
    validate.section(section)
    validate.field(field)
    validate.value(value)

    return fetch(import.meta.env.VITE_API_URL + '/children/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token

        },
        body: JSON.stringify({ section, field, value })
    })
        .then(response => {
            const { status } = response

            if (status === 200)
                return response.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(child => child)

            return response.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error] || SystemError
                    throw new constructor(message)
                })
        }
        )
}