export const UseChildFields = () => {
    const sections = [
        {
            section: 'pacient',
            fields: [
                'name',
                'surnames',
                'birthdate',
                'address',
                'healthCenterName',
                'healthCenterTfno',
                'healthPediatricianName',
                'healthPediatricianTfno',
                'healthHospitalName',
                'healthHospitalTfno',
                'healthEmergenciesName',
                'healthEmergenciesTfno'
            ],
            labelMap: {
                name: 'Nombre',
                surnames: 'Apellidos',
                birthdate: 'Fecha nacimiento',
                address: 'Dirección',
                healthCenterName: 'Centro de salud',
                healthCenterTfno: 'Teléfono del centro de salud',
                healthPediatricianName: 'Nombre pediatra',
                healthPediatricianTfno: 'Teléfono pediatra',
                healthHospitalName: 'Nombre hospital',
                healthHospitalTfno: 'Teléfono hospital',
                healthEmergenciesName: 'Nombre emergencias',
                healthEmergenciesTfno: 'Teléfono emergencias'
            }
        },
        {
            section: 'doctor',
            fields: [
                'pregnancyDuration',
                'controlledPregnancy',
                'maternalSerology',
                'problemsDuringPregnancy',
                'birthPlace',
                'entryDateBirth',
                'departureDateBirth',
                'typeOfBirth',
                'earlyBreastfeelingInTheDeliveryRoom',
                'childbirthIncidentschildbirth',
                'birthWeight',
                'sex',
                'birthLenght',
                'cephalicPerimeterAtBirth',
                'bloodGroup'
            ],
            labelMap: {
                pregnancyDuration: 'Duración embarazo',
                controlledPregnancy: 'Embarazo controlado',
                maternalSerology: 'Serología maternal',
                problemsDuringPregnancy: 'Problemas durante embarazo',
                birthPlace: 'Lugar de nacimiento',
                entryDateBirth: 'Fecha entrada parto',
                departureDateBirth: 'Fecha salida parto',
                typeOfBirth: 'Tipo de parto',
                earlyBreastfeelingInTheDeliveryRoom: 'Lactancia temprana en sala de parto',
                childbirthIncidentschildbirth: 'Incidencias durante parto',
                birthWeight: 'Peso al nacer',
                sex: 'Sexo',
                birthLenght: 'Longitud al nacer',
                cephalicPerimeterAtBirth: 'Perímetro cefálico al nacer',
                bloodGroup: 'Grupo sanguíneo'
            }
        }
    ];

    return { sections };
};