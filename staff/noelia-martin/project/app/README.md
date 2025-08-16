Versión 0 de APP:

1º Instalo y preparo todo lo necesario para hacer funcionar app
    -Instalo vite, react, tailwindcss , react-route y com.
    - Modifico el fichero package-json para que utilice la versión 0.0.0 e indico que es type:module.

2º Configuro la primera parte de app (sin posibilidad de integrar los input de child de api)
    2.1. Creo data
        Configuro sessionStorage para que guarde, modifique y elimine token. 
            Este token, recibido de la lógica loginUser, contiene el user.id y el user.role del usuario conectado independientemente de su role.
        Creo idPacient el cuál tendrá un valor null.
            Cuándo se llame a la lógica getChoosePacient.js (de app) en idPacient se almacenará el token recibido (de esta lógica) que contiene el user.id del usuario pacient elegido por el doctor. (Elegido a través de un user.healthCareNumber).

    2.2 Lógicas
        -registerUser: utilizo el método fetch para llamar a la lógica del mismo nombre de API.
        -loginUser: fetch y si el logueo es correcto almaceno en sessionStorage el token recibido. (Api nos envía en un token: user.id y user.role del usuario logueado)
        -isUserLoggedIn.js: devuelve un booleano que indica si hay o no token en sessionStorage (si hay o no usuario conectado).
        -isUserDoctor: obtenemos la carga útil del token almacenado en sessionStorage y devolvemos el valor de user.role. Gracias a esta lógica sabremos si es un doctor o no.
            Para esta lógica hemos creado una lógica de ayuda, getPayloadFromToken.js: devuelve el payload de un token recibido como parámetro de entrada.
        -getChoosePacient.js: fetch y si todo es correcto, devolverá un token que contendrá el user.id del paciente que el doctor ha elegido. Este token lo almacenamos en data (en idPacient).
        -getNamePacient.js: fetch y si todo es correcto, habrá dos opciones:
            1. Si NO se ha indicado parámetro de entrada en su llamada, cogerá por defecto el token almacenado en sessionStorage. (Recuerda: este token tiene user.id y user.role del usuario conectado)
            2. Si SI se ha indicado parámetro de entrada en su llamada, cogerá el token indicado (Recuerda: el token que enviaremos será el almacenado en idPacient que tiene user.id del paciente)
            La ruta configurada en api se encargará de extraer el user.id del token para pasárselo a la lógica de api. Está devolverá una cadena json con el contenido de user.name
        -logoutUser: borro el token de sessionStorage y el token de idPacient lo pongo a null (independientemente que se haya deslogueado doctor o pacient).

    3.3 Vistas
        -Welcome: pantalla de Bienvenida donde el usuario indicará si es un familiar(un usuario pacient) o un personal sanitario (un usuario Doctor)
        -Landing: vista exclusiva para el usuario pacient, en ella tendrá opción de elegir dos caminos: loguearse o registrarse
        (Recuerda los doctores NO se pueden registrar, solo el administrador de la aplicación podrá)
        -Register: vista exclusiva para el usuario pacient, en ella podrá registrarse un familiar por niño (un usuario por cada user.healthCareNumber)
        -Login: en ella se procederá al inicio de sesión
        -ChoosePacient: vista exclusiva para el usuario Doctor, primera pantalla tras el inicio de sesión, en ella el doctor indicará el user.healthCareNumber del paciente (del niño, del user pacient) con el que quiere trabajar.
        -Home: una vez logueados ambos tipos de usuarios y el doctor haber elegido el paciente se muestra esta pantalla, de momento con un mensaje de bienvenida personalizado.
        -Component: contiene cajitas para mostrar mensajes de alerta y confirmación.

    3.4 App.jsx
        Configuro las rutas, las navegaciones y contexto para enviar cajitas alert y confirm (previo a este paso creo y configuro el fichero context.js).

    3.5 Creo y configuro .env con la variable VITE_API_URL.


Me voy a API a terminar de configurarla.


3º Configuro la segunda parte de app (Configuración completa, en home se tendrá acceso a los formularios del paciente)
    3.1 Lógicas
        -getChild.js: fetch y si todo es correcto, habrá dos opciones:
            1. Si NO se ha indicado parámetro de entrada en su llamada, cogerá por defecto el token almacenado en sessionStorage. (Recuerda: este token tiene user.id y user.role del usuario conectado)
            2. Si SI se ha indicado parámetro de entrada en su llamada, cogerá el token indicado (Recuerda: el token que enviaremos será el almacenado en idPacient que tiene user.id del paciente)
            La ruta configurada en api se encargará de extraer el user.id del token para pasárselo a la lógica de api. Está devolverá una cadena json con un array que contiene un solo objeto, el child del usuario indicado.
        -editChild.js: fetch pasando de parámetro de entrada token, section, field y value
            Para el parámetro token habrá dos opciones:
            1. Si NO se ha indicado parámetro, cogerá por defecto el token almacenado en sessionStorage. (Recuerda: este token tiene user.id y user.role del usuario conectado)
            2. Si SI se ha indicado parámetro, cogerá el token indicado (Recuerda: el token que enviaremos será el almacenado en idPacient que tiene user.id del paciente)
            La ruta configurada en api se encargará de extraer el user.id del token y los demás parámetros para pasárselo a la lógica de api. Está devolverá una cadena json con un array que contiene el child actualizado.

        3.2 Vistas
            -Home: Utilizo UseChild para la constante isDoctor y creo dos botones que harán que navegue a los nuevos componentes explicados a continuación
            -SeeChild: Muestra el documento de salud en modo lectura. (Completo)
            -ModifyChild: Muestra una versión editable del documento de salud. (Solo la parte correspondiente según el role del usuario)
                Esta podrá editar y eliminar uno a uno cada campo.
            -UseChild: hook que encapsula la lógica de obtener y manejar un child y el rol del usuario.
            -UseChildFiels: hook que organiza la estructura de los campos de un child para mostrarlo o editarlos en la interfaz.
        
        3.3 App.jsx
            Configuro rutas para que me lleve directamente a los componentes SeeChild y EditChild. Estas rutas las utilizo en home.

        Comentarios detallados en App, Home, SeeChild y ModifyChild.