import React from 'react'

import './TrackingComponent.css'

const claseVariable = (status) =>{
    if(status === "POR ENTREGAR"){
        return "fas fa-truck-loading"
    }
    else if(status === "EN AGUA")
        return "fas fa-ship"
    else return "fas fa-dolly"
}

const TrackingComponent = (props) => {

    const contenedores = props.contenedores.split(' ')
    const listItems = contenedores.map( (cont, i) => {
        return <li key={i}>{cont}</li>
    })

    const claseStatus = claseVariable(props.status)

    return(
        <div className="contenedorTrack">
            <h3>ID File: {props.id}</h3>
            <h4>MBL: {props.mbl}</h4>
            <h4>HBL: {props.hbl}</h4>
            <h5>Buque: {props.buque}</h5>
            <h5>POL: {props.pol}</h5>
            <h5>POD: {props.pod}</h5>
            <h5>Destino final:{props.desFin ? props.desFin : "  -"}</h5>
            <h5>Viaje: {props.viaje}</h5>
            <h5>Naviera: {props.navi}</h5>
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
                        <th>{props.dc20}</th>
                        <th>{props.dc40}</th>
                        <th>{props.hq40}</th>
                        <th>{props.lcl}</th>
                    </tr>
                </tbody>
            </table>
            <h5>Lista de contenedores: </h5>
            <ul>
                {listItems}
            </ul>
            <h5>ETA: {props.eta}</h5>
            <h5>ETD: {props.etd}</h5>
            <div className="estatusEmbarque">
                <i className={claseStatus} style={{fontSize: '2.75em', color:'red'}}></i>
                <p style={{marginTop:'4%'}}>{props.status}</p>
            </div>
        </div>
    )
}

export default TrackingComponent