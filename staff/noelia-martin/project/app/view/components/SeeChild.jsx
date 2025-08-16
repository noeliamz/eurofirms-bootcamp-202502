import { UseChild } from './UseChild'
import { UseChildFields } from './UseChildFields'


export const SeeChild = () => {
    const { child } = UseChild()
    const { sections } = UseChildFields()

    if (!child) return null

    return (
        <div className="flex flex-col justify-between items-center min-h-screen px-4 bg-white text-center mt-6">
            <h1 className="text-xl font-bold mb-8">Documento de Salud</h1>

            <div className="w-full max-w-md space-y-4 text-left">
                {sections.map(({ section, fields, labelMap }) =>
                    //currentField: representa el nombre de cada campo definido en el array 'fields' para esta sección 
                    //Almacena el nombre de la propiedad del objeto child que se renderiza en ese momento
                    fields.map(currentField => {
                        // Guarda el valor actual de la base de datos (obtenido del objeto child)
                        // Si no existe, se asigna '(sin dato)'
                        const currentValue =
                            (section === 'doctor' && child.doctor && child.doctor[currentField])
                            ||
                            (section === 'pacient' && child.pacient && child.pacient[currentField])


                        return (
                            // Al estar dentro de un map, react necesita una key única para optimizar el renderizado
                            // Combinamos section y currentfield para asegurar unicidad
                            <div className="flex justify-between border-b pb-2" key={`${section}-${currentField}`} >
                                {/* Primera columna: nombre del campo */}
                                <div className="font-medium w-1/2">{labelMap[currentField]}</div>
                                {/* Segunda columna: valor actual del campo */}
                                <div className="w-1/2 text-right">{currentValue || '(sin dato)'}</div>
                            </div>
                        )
                    })
                )}
            </div>

            <div className="w-full flex justify-center pb-4 mt-6">
                <img
                    src="public/img/logo-JuntaAndalucia.png"
                    alt="Logo Junta de Andalucía"
                    className="h-30"
                />
            </div>
        </div>
    )
}