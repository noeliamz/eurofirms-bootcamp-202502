import { Routes, Route, useNavigate, Navigate } from 'react-router'

import { useState } from 'react'

import { Welcome } from './view/Welcome'
import { Landing } from './view/Landing'
import { Login } from './view/Login'
import { Register } from './view/Register'
import { ChoosePacient } from './view/ChoosePacient'
import { Home } from './view/Home'
import { SeeChild } from './view/components/SeeChild'
import { ModifyChild } from './view/components/ModifyChild'


import { Alert } from './view/components/Alert'
import { Confirm } from './view/components/Confirm'
import { Context } from './context'

import { logic } from './logic'

export const App = () => {
    const [alertMessage, setAlertMessage] = useState('')
    const [confirmMessage, setConfirmMessage] = useState('')
    const [confirmAction, setConfirmAction] = useState(null)

    const navigate = useNavigate()

    //Cada función redirige a la ruta indicada cuando ocurre una acción y se le llama (permite cambiar de URL sin recargar la página)
    const handleLandingRegularClicked = () => navigate('/landing')
    const handleLoginDoctorClicked = () => navigate('/login')
    const handleReturnChoosePacientClicked = () => navigate('/choosePacient')
    const handleLogoutUserClicked = () => navigate('/')

    const handleLoginClicked = () => navigate('/login')
    const handleRegisterClicked = () => navigate('/register')

    const handleReturnClicked = () => navigate('/')
    const handleLogginSubmitedRegular = () => navigate('/')
    const handleLogginSubmitedDoctor = () => navigate('/choosePacient')

    const handleRegisterSubmited = () => navigate('/login')

    const handlePacientElectedSubmited = () => navigate('/')

    //Verifica si el usuario está logueado antes de renderizar las rutas
    let loggedIn
    try {
        loggedIn = logic.isUserLoggedIn()
    } catch (error) {
        console.error(error)
        alert(error.mensage)
    }

    //Si se acepta la alerta borra el contenido del mensaje de alert y asi se apaga la cajita 
    const handleAlertAccepted = () => setAlertMessage('')

    //Si confirma borra el contenido del mensaje de confirm y asi se apaga la cajita .Resuelve la promesa con un true
    const handleAcceptConfirm = () => {
        setConfirmMessage('')

        confirmAction.resolve(true)
    }

    //Si no confirma borra el contenido del mensaje de confirm y asi se apaga la cajita .Resuelve la promesa con un false
    const handleCancelConfirm = () => {
        setConfirmMessage('')

        confirmAction.resolve(false)
    }

    const handleShowConfirm = message => {
        //Mete un mensaje en el estado confirmMessage para que aparezca la caja de confirm
        setConfirmMessage(message)
        //Una vez esté la caja se va a los handler acceptconfirm y cancelconfirm, los cuales devolverán un valor booleano utilizado en la siguiente linea

        //La siguiente promesa queda pendiente hasta que el usuario acepte o cancele, y en ese momento se llama a resolve(true) o resolve(false) para almacenar el booleano en confirmAction y este retornarlo para que pueda utilizarlo el componete que lo necesite
        return new Promise((resolve, reject) => {
            setConfirmAction({ resolve })
        })
    }


    console.log('App -> render')

    //Envuelve la aplicación en un context para que cualquier componente pueda llamar a alert() y confirm(). (Recuerda que no son las funciones nativas, sino personalizadas)
    return <Context.Provider value={{
        alert: setAlertMessage,
        confirm: handleShowConfirm
    }}>
        {/* Si hay mensaje se muestra el componente correspondiente */}
        {alertMessage && <Alert message={alertMessage} onAccepted={handleAlertAccepted} />}

        {confirmMessage && <Confirm message={confirmMessage} onCancelled={handleCancelConfirm} onAccepted={handleAcceptConfirm} />}

        <Routes>
            {/* Si no está logueado muestra Welcome y si si lo está muestra home */}
            <Route path='/' element={
                !loggedIn ?
                    <Welcome
                        onLandingRegularClicked={handleLandingRegularClicked}
                        onLoginDoctorClicked={handleLoginDoctorClicked}
                    />
                    :
                    <Home
                        onReturnChoosePacientClicked={handleReturnChoosePacientClicked}
                        onLogoutUser={handleLogoutUserClicked} />
            }
            />

            {/* Las rutas (/landing, /login, /register, etc.) siguen la misma lógica, si está logueado se mueve entre componentes, pero si no lo está redirige a / que será el componente Welcome */}
            <Route path='/landing' element={
                !loggedIn ?
                    <Landing
                        onLoginClicked={handleLoginClicked}
                        onUserRegistered={handleRegisterClicked}
                    />
                    :
                    <Navigate to='/' />
            } />

            <Route path='/login' element={
                !loggedIn ?
                    <Login
                        onReturnClicked={handleReturnClicked}
                        onUserLoggedInRegular={handleLogginSubmitedRegular}
                        onUserLoggedInDoctor={handleLogginSubmitedDoctor}

                    />
                    :
                    <Navigate to='/' />
            } />

            <Route path='/register' element={
                !loggedIn ?
                    <Register
                        onLoginClicked={handleLoginClicked}
                        onUserRegistered={handleRegisterSubmited}
                    />
                    :
                    <Navigate to='/' />
            } />

            <Route path='/choosePacient' element={
                <ChoosePacient
                    onPacientElected={handlePacientElectedSubmited}
                />
            } />

            {/* En las siguientes rutas muestra directamente el componente, no requieren comprobación de login */}
            <Route path='/SeeChild' element={<SeeChild />} />
            <Route path='/ModifyChild' element={<ModifyChild />} />


        </Routes >
    </Context.Provider>
}