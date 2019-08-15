import React from 'react'

import './Home.css'

import logo from '../../logo-certificacion.svg'

const Home = () => {
    return (
        <div className="general">
            <h1 className="cabecera">Bienvenido a Central Cargo</h1>
            <p>Estimado cliente, le damos la bienvenida a esta página en la cuál usted podra hacer lo siguiente: </p>
            <ul>
                <li>Poder tener una vista rápida de sus facturas</li>
                <li>Descargar los archivos pdf y xml de cada una de ellas</li>
                <li>Poder tener una vista rápida de sus embarques</li>
            </ul>
            <p>Lo invitamos a explorar nuestro sitio web para poder hacer uso de las funcionalidades que tenemos para usted, todo lo anteriormente mencionado
                está disponible desde nuestro menú ubicado en la parte superior derecha de la pantalla.
                No importa si nos visita desde un celular, la información siempre está disponible para usted.
            </p>
            <footer className="piso">
                <img className="logoCC" src="http://www.centralcargo.mx/images/logo.png" alt="logo central cargo b/n"></img>
                <img className="logoCer" src={logo} alt="logo certificacion"></img>
                <h1 className="frase">Logística a tu medida</h1>
            </footer>
        </div>
    )
}

export default Home