import { useEffect, useState } from 'react'
import { logic } from '../logic'
import { useContext } from '../context'
import { data } from '../data'
import { useNavigate } from 'react-router'
import { UseChild } from './components/UseChild'

export const Home = ({ onReturnChoosePacientClicked, onLogoutUser }) => {


    const navigate = useNavigate()

    const { alert } = useContext()
    const { isDoctor } = UseChild()

    const [name, setName] = useState('World')
    const [nameElected, setNameElected] = useState('World')

    useEffect(() => {
        try {
            logic.getNamePacient()
                .then(name => setName(name))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })

            if (isDoctor) {
                logic.getNamePacient(data.idPacient)
                    .then(nameElected => setNameElected(nameElected))
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            }
        } catch (error) {
            console.error(error)
            alert(error.message)
        }
    }, [isDoctor])//Con esta línea se indica que useEffect vuelva a ejecutarse cada vez que isDoctor cambie de valor. Es necesario ya que inicialmente isDoctor es null hasta que se ejecute el useEffect de dentro de UseChild
    const handleReturnChoosePacientClick = () => onReturnChoosePacientClicked()
    const handleLogoutUserClick = () => {
        try {
            logic.logoutUser()
            onLogoutUser()
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Home -> render')

    return <div className="flex flex-col justify-between items-center min-h-screen px-4 bg-white text-center mt-6">
        <div className="w-full max-w-xs space-y-6">
            <h1 className="text-xl font-bold mb-8">Home</h1>
            <div className="bg-green-700 text-white text-sm p-4 w-full max-w-md rounded">
                {isDoctor ?
                    <div>Hola Doctor {name}. <br></br> Ha accedido al usuario del menor {nameElected} . <br></br> Puede ver el estado actuál del documento de salud o si lo desea modificar los campos que están reservados para el personal sanitario
                    </div>
                    :
                    <div>Hola, ha accedido al usuario del menor {name}. <br></br> Puede ver el estado actuál del documento de salud o si lo desea modificar los campos que están reservados para madres, padres o tutores .</div>
                }

            </div>
            {/* Configuro directamente en los botones para que navege al componente indicado, cuya ruta está creada en App*/}
            <button
                className="bg-black text-white px-2 mx-1"
                type="button"
                onClick={() => navigate('/SeeChild')}
            >
                Ver estado actuál del documento de salud
            </button>
            <button
                className="bg-black text-white px-2 mx-1"
                type="button"
                onClick={() => navigate('/ModifyChild')}
            >
                Modificar documento de salud
            </button>
            <div>
                {isDoctor ?
                    <div className="flex justify-between items-center mt-4">
                        <a className="underline font-medium text-sm" href="#" onClick={handleReturnChoosePacientClick}>Cambiar de Menor</a>
                        <button className="bg-black text-white px-4 py-2 text-sm font-semibold rounded" type='button' onClick={handleLogoutUserClick}>Cerrar Sesión</button>
                    </div>
                    :
                    <button className="bg-black text-white px-4 py-2 text-sm font-semibold rounded" type='button' onClick={handleLogoutUserClick}>Cerrar Sesión</button>
                }


            </div>

        </div>
        <div className="w-full flex justify-center pb-4">
            <img
                src="public/img/logo-JuntaAndalucia.png"
                alt="Logo Junta de Andalucía"
                className="h-30"
            />
        </div>

    </div>
}