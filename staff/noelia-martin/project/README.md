# Documento de Salud Infantil Junta de Andalucía

 # Intro

 Una herramienta para ayudaros a madres, padres y profesionales a compartir información importante sobre la salud, el crecimiento y el desarrollo de vuestro hijo o hija.

![Child health document](https://www.juntadeandalucia.es/export/drupaljda/saludbebe_pdaDocSAludInfantil.jpg)
 ## Functional

 ### Use Cases

 pacient (User)
 - Registrar y loguear una vez por menor
 - Ver estado actuál del documento de salud.
 - Editar y eliminar formularios reservados para madres, padres o tutores

 doctor (User)
 - No registrar, se le proporciona datos de acceso para poder loguearse.
 - Ver estado actuál del documento de salud.
 - Editar y eliminar formularios reservados para personal sanitario.

 ### Prototype
 [figma](https://www.figma.com/proto/zK3AsY7a7Vf8M0jt721H5a/Proyecto?node-id=5-41&t=PlzesSSVCMkHcFAF-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=5%3A41) cambiar
 
 [Documento de Salud Infantil (Original)](https://juntadeandalucia.es/export/drupaljda/csafa_documentoSaludInfantil_SE1740-2019v2.pdf)

## Technical

### Architecture

[App] -> [API] -> [DB]

App
- components
- logic
- data

API
- routes
- logic
- data

### UI Components

```
App
 |- Welcome
 |- Landing
 |- Register
 |- Login
 |- Home
 |- ChooseChild


Components
 |- Alert
 |- Confirm
 |- ModifyChild
 |- SeeChild
 |- UseChild
 |- UseChildFields

```

### Data Model

User
- id (UUID)
- username (string, required, unique)
- password (string, required)
- name (string, required)
- healthCareNumber (string, required, unique)
- dateOfBirth (date, required)
- role (string, required, enum: [pacient, doctor], default: pacient)

Child
- id (UUID)
- idPacient [objectId, ref: User, required]
- pacient {
    - name (string)
    - surnames (string)
    - birthdate (string)
    - address (string)
    - healthCenterName (string)
    - healthCenterTfno (string)
    - healthPediatricianName (string)
    - healthPediatricianTfno (string)
    - healthHospitalName (string)
    - healthHospitalTfno (string)
    - healthEmergenciesName (string)
    - healthEmergenciesTfno (string)
}
- doctor {
    - pregnancyDuration (string)
    - controlledPregnancy (string)
    - maternalSerology (string)
    - problemsDuringPregnancy (string)
    - birthPlace (string)
    - entryDateBirth (string)
    - departureDateBirth (string)
    - typeOfBirth (string)
    - earlyBreastfeelingInTheDeliveryRoom (string)
    - childbirthIncidentschildbirth (string)
    - birthWeight (string)
    - sex (string)
    - birthLenght (string)
    - cephalicPerimeterAtBirth (string)
    - bloodGroup (string)
}


### Technologies

- React
- Express
- Mongo
- Node
- Tailwind
- JWT
- Bcrypt
- ...

## Management

[Issues](https://github.com/b00tc4mp/eurofirms-bootcamp-202502/issues/82)