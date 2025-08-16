import { useState } from 'react'
import { logic } from '../../logic'
import { useContext } from '../../context'
import { data } from '../../data'
import { UseChild } from './UseChild'
import { UseChildFields } from './UseChildFields'

export const ModifyChild = () => {
    const { alert, confirm } = useContext()

    const [editField, setEditField] = useState(null)//Almacena el campo que se está editando
    const [editValue, setEditValue] = useState('')//Almacena el valor a enviar a la BD

    const { child, setChild, isDoctor } = UseChild()
    const { sections } = UseChildFields()
    //const {section, fields, labelMap} = sections


    const handleEdit = (currentField, currentValue) => { //Recibe el campo renderizado y su valor actual contenido en la base de datos (con el término campo renderizado me refiero el campo que React está procesando y mostrando en ese instante dentro del .map().)
        setEditField(currentField)
        setEditValue(currentValue)
    }

    const handleSave = () => {//No recibe nada ya que utilizamos las variables de estado actualizadas previamente por el handleEdit
        //Almacena la sección que utilizará segun el role logueado
        const currentSection = isDoctor ? 'doctor' : 'pacient'

        //Almacena el token que utilizará segun el role logueado, si es doctor idPacient y si es paciente lo deja indefined ya que en la lógica está configurado que si no se indica token utiliza por defecto el almacenado en SessionStorage
        const token = isDoctor ? data.idPacient : undefined

        //Llama a lógica editChild indicando sección, el campo y el valor que se van a actualizar en la base de datos
        //De no hacerlo, supone que todo el objeto es el valor de section, dejando a field y value undefined
        //Luego actualiza el estado del child y resetea los estados de edición.
        logic.editChild(token, { section: currentSection, field: editField, value: editValue })
            .then((updateChild) => {
                setChild(updateChild)//Actualiza el child
                alert('Campo actualizado')
                setEditField(null) //Borra el campo que se está editando
                setEditValue('') //Limpia el valor temporal
            })

            .catch(error => {
                alert(error.message)
            })
    }

    const handleDelete = (currentField) => { //Recibe el campo renderizado que eliminará

        confirm('¿Seguro que quieres eliminar?')
            .then(result => {
                if (result) {
                    const currentSection = isDoctor ? 'doctor' : 'pacient'

                    const token = isDoctor ? data.idPacient : undefined

                    //Borra el valor del campo actual pasando value vacío y actualiza el estado del child
                    logic.editChild(token, { section: currentSection, field: currentField, value: '' })
                        .then((updateChild) => {
                            setChild(updateChild)
                            alert('Campo eliminado')
                            setEditField(null)
                            setEditValue('')
                        })

                        .catch(error => {
                            alert(error.message)
                        })
                }
            })

    }

    if (!child) return null


    return (
        <div className="flex flex-col justify-between items-center min-h-screen px-4 bg-white text-center mt-6">
            <h1 className="text-xl font-bold mb-8">Modificar Documento de Salud</h1>

            <div className="w-full max-w-md space-y-4 text-left">
                {(isDoctor ?
                    sections[1].fields :
                    sections[0].fields

                    //currentField:  se inicializa automáticamente en el siguiente map 
                    //Almacena el nombre de la propiedad del objeto child que se renderiza en ese momento
                ).map(currentField => {
                    //Mapeo de cada campo a un texto legible para mostrar en la inferfaz
                    const labelMap = isDoctor ? sections[1].labelMap : sections[0].labelMap

                    //Guarda el valor actual de la base de datos, si no existe le asignamos uno vacio
                    const currentValue = isDoctor
                        ? (child.doctor && child.doctor[currentField]) || ''
                        : (child.pacient && child.pacient[currentField]) || ''

                    return (
                        <div className="flex justify-between items-center border-b pb-2" key={currentField}>
                            {/* Primera columna: nombre del campo */}
                            <div className="font-medium w-1/2">{labelMap[currentField]}</div>
                            {/* Segunda columna: valor actual del campo */}
                            <div className="w-1/2 text-right">
                                {/* Condiciona para decidir si el campo se muestra en modo lectura o en modo edición: */}
                                {editField === currentField ? (

                                    //Modo edición, si editField y currentField son iguales se muestra un input para introducir texto y un botón para guardar ese nuevo valor en la BD (si el campo renderizado en ese instante en el .map y el campo que se está editando coinciden)
                                    //Para que esto llegara a suceder primero se verá en modo lectura y una vez clicado el botón edit, este actualiza el estado editField (se renderiza de nuevo, ya que cambia estados) y así podría ser verdadero este condicional
                                    <div className="flex justify-end gap-2">
                                        {/*Los proximos value corresponden a la propiedad del input (no el parametro value de la logica editChild)*/}
                                        <input
                                            className="border rounded px-2 py-1 w-2/3"
                                            type="text"

                                            // Al usuario le aparece el contenido actuál que tiene el campo (el de la BD)
                                            value={editValue}

                                            // Al escribir en el input se dispara un evento (e). 
                                            // `e.target` es el input donde ocurrió el cambio y `e.target.value` es el texto actual. 
                                            // Se actualiza la variable de estado editValue con ese valor.
                                            onChange={e => setEditValue(e.target.value)}
                                        />
                                        <button
                                            className="bg-green-700 text-white px-2 py-1 text-sm rounded"
                                            onClick={handleSave}
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                ) : (
                                    //Modo lectura, si editField y currentField no son iguales se muestra un botón para editar y eliminar
                                    <div className="flex justify-end gap-2 items-center">
                                        {currentValue || '(sin dato)'}
                                        <button
                                            className="text-blue-600 text-sm underline"
                                            onClick={() => handleEdit(currentField, currentValue)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="text-red-600 text-sm underline"
                                            onClick={() => handleDelete(currentField)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="w-full flex justify-center pb-4 mt-6">
                <img
                    className="h-30"
                    src="public/img/logo-JuntaAndalucia.png"
                    alt="Logo Junta de Andalucía"
                />
            </div>
        </div>
    )
}