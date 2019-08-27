import React from 'react'

import './TrackingComponent.css'

const claseVariable = (status) =>{
    if(status === "POR ENTREGAR"){
        return "fas fa-truck-loading"
    }
    else if(status === "EN AGUA")
        return "fas fa-ship"
    else if(status === "EN PUERTO")
        return "fas fa-warehouse"
    else return "fas fa-dolly"
}

const TrackingComponent = (props) => {

    const contenedores = props.objeto.contenedores.split(' ')
    const listItems = contenedores.map( (cont, i) => {
        return <li key={i}>{cont}</li>
    })

    const claseStatus = claseVariable(props.objeto.status)

    return(
        <div className="contenedorTrack">
            <h3>ID File: {props.objeto.idFile}</h3>
            <h4>MBL: {props.objeto.mbl}</h4>
            <h4>HBL: {props.objeto.hbl}</h4>
            <h5>Buque: {props.objeto.buque}</h5>
            <h5>POL: {props.objeto.pol}</h5>
            <h5>POD: {props.objeto.pod}</h5>
            <h5>Destino final:{props.objeto.destinoFinal ? props.objeto.destinoFinal : "  -"}</h5>
            <h5>Viaje: {props.objeto.viaje}</h5>
            <h5>Naviera: {props.objeto.naviera}</h5>
            <h5>Contenedores</h5>
            <table>
                <tbody>
                    <tr>
                        <th>20 DC</th>
                        <th>40 DC</th>
                        <th>40 HQ</th>
                        <th>LCL</th>
                    </tr>
                    <tr>
                        <th>{props.objeto.cntr20DC}</th>
                        <th>{props.objeto.cntr40DC}</th>
                        <th>{props.objeto.cntr40HQ}</th>
                        <th>{props.objeto.cntrLCL}</th>
                    </tr>
                </tbody>
            </table>
            <h5>Lista de contenedores: </h5>
            <ul>
                {listItems}
            </ul>
            <h5>ETA: {props.objeto.eta}</h5>
            <h5>ETD: {props.objeto.etd}</h5>
            <div className="estatusEmbarque">
                <i className={claseStatus} style={{fontSize: '2.75em', color:'red'}}></i>
                <p style={{marginTop:'4%'}}>{props.objeto.status}</p>
            </div>
        </div>
    )
}

export default TrackingComponent