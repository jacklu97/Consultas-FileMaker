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

    const contenedores = props.objeto.CONTENEDORES.split(' ')
    const listItems = contenedores.map( (cont, i) => {
        return <li key={i}>{cont}</li>
    })

    const claseStatus = claseVariable(props.objeto["STATUS EMBARQUES"])

    return(
        <div className="contenedorTrack">
            <h3>ID File: {props.objeto.ID_FILE}</h3>
            <h4>MBL: {props.objeto.MBL}</h4>
            <h4>HBL: {props.objeto.HBL}</h4>
            <h5>Buque: {props.objeto.BUQUE}</h5>
            <h5>POL: {props.objeto.POL}</h5>
            <h5>POD: {props.objeto.POD}</h5>
            <h5>Destino final:{props.objeto["DESTINO FINAL"] ? props.objeto["DESTINO FINAL"] : "  -"}</h5>
            <h5>Viaje: {props.objeto.VIAJE}</h5>
            <h5>Naviera: {props.objeto.NAVIERA}</h5>
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
                        <th>{props.objeto["CNTR 20DC"]}</th>
                        <th>{props.objeto["CNTR 40DC"]}</th>
                        <th>{props.objeto["CNTR 40HQ"]}</th>
                        <th>{props.objeto["CNTR LCL"]}</th>
                    </tr>
                </tbody>
            </table>
            <h5>Lista de contenedores: </h5>
            <ul>
                {listItems}
            </ul>
            <h5>ETA: {props.objeto.ETA}</h5>
            <h5>ETD: {props.objeto.ETD}</h5>
            <div className="estatusEmbarque">
                <i className={claseStatus} style={{fontSize: '2.75em', color:'red'}}></i>
                <p style={{marginTop:'4%'}}>{props.objeto["STATUS EMBARQUES"]}</p>
            </div>
        </div>
    )
}

export default TrackingComponent