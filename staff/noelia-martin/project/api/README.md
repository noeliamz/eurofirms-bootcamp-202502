Versión 0 de API

1º Instalo y preparo todo lo necesario para hacer funcionar com y api
    Fuera de API: 
        - com -> en la carpeta de project creo com, indico que sea un paquete y lo configuro con todos los controladores de errores que voy a necesitar.

    En API:
        - Indico que sea un paquete. 
        - Instalo express, mongoose, bcryptjs, jwt, cors y com
        - Modifico el fichero package-json: 
            Indico que utilice la versión 0.0.0
            Indico que es type:module
            Configuro scripts de arranque: normal, con reinicio y modo inspector.
        - Creo la base de datos test-ChildHealthDocument.
        - Creo la carpeta data con models y populate para comprobar que funciona correctamente.

2º Configuro la primera parte de api (sin posibilidad de integrar en app los input de child)
    - Creo dos modelos en data: 
        User: almacena los usuarios de la aplicaciones usando roles pacient y doctor
        Child: almacena los input de la aplicación (todos, los de pacient y doctor)

    La idea a implementar es: 
        - Un User Pacient es un usuario controlado por un adulto creado para un niño en concreto. 
            Un User pacient tendrá asignado un Child, el cuál es un modelo con los input que contiene información del niño. 
            Los input se rellenarán entre el usuario pacient y el usuario doctor.
        - Un user Doctor es un usuario para el doctor, el cuál a través del NUHSA del paciente accederá a su Child y rellenará los input que le corresponda.

    - Role Doctor
        Los doctores no se podrán registrar.
        En data creo set-roles que coge un usuario ya registrado, modifica su role a doctor y borra su Child. Esto SOLO lo hará el administrador de la aplicación. (Ejecutando con node ese fichero)

    - Creo las lógicas:
        -registerUser: Registra un usuario y le crea un Child (el role lo configura por defecto models como pacient)
        -authenticateUser: Autentica independientemente del role que tenga el usuario y devuelve un token con su user.id y user.role
        -getChoosePacient: Utilizada solo por el doctor. Se introduce un NUHSA (id.healthCareNumber) y devuelve un token con su user.id correspondiente
        -getNamePacient: Se introduce un user.id y devuelve user.name
        En cada lógica implemento un pequeño test js, dentro de la misma carpeta de lógica.

    - Creo rutas en usersRouter y todos los test sh en la carpeta test

    - Creo y configuro .env con las variables MONGO_URL, PORT y JWT_SECRET.

    - Creo y configuro la carpeta middlewares con errorHandler(controlador de errores de index de api) y jsonBodyParser.

    
Me voy a app y la configuro hasta llegar a la home con un mensaje de bienvenida personalizado utilizando lógicas de api.


3º Configuro la segunda parte de api (configuración completa, en app se podrá crear los formularios de cada tipo de usuario y sus input se almacenarán en Child)
    - Creo las lógicas: 
        -getChild: Se introduce un user.id de un user Pacient y devuelve el child que le corresponde.
        -getChild: Se introduce idPacient, section, field y value a actualizar de un child y devuelve el child actualizado
        En cada lógica implemento un pequeño test js, dentro de la misma carpeta de lógica.
    
    -Creo rutas en childrenRouter y todos los test sh en la carpeta test.


Me voy a app y termino de configurarla.        