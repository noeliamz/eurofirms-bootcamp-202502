import { useEffect, useState } from 'react'
import { useContext } from '../../context'
import { logic } from '../../logic'
import { data } from '../../data'


export const UseChild = () => {
    const { alert } = useContext()
    const [child, setChild] = useState(null)
    const [isDoctor, setIsDoctor] = useState(null)

    useEffect(() => {
        try {
            const doctor = logic.isUserDoctor()
            setIsDoctor(doctor)

            const token = doctor ? data.idPacient : undefined

            logic.getChild(token)
                .then(children => setChild(children[0]))
                .catch(error => {
                    console.error(error)
                    alert(error.message)
                })
        } catch (error) {
            console.error(error.message)
            alert(error.message)
            return
        }


    }, [])

    return { child, setChild, isDoctor }
}