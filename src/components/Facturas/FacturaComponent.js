import React from 'react'
import Popup from "reactjs-popup"
import './FacturaComponent.css'

import classnames from 'classnames'

const FacturaComponent = (props) =>{
    return (
        <tr>
            <th>{props.idFac}</th>
            <th>{props.file}</th>
            <th>{props.empresa}</th>
            <th>{props.divisa}</th>
            <th className="text-center">
                <Popup trigger={<button className="botones" style={{fontSize: '2.75rem'}}><i className="fas fa-info-circle"></i></button>} modal>
                    <div className="content">
                        <div className="factura-caja">
                            <div className="factura-texto">
                                <h2>No fact: {props.idFac}</h2>
                                <h3>File: {props.file}</h3>
                                <h3>Empresa: </h3>
                                <h4>{props.empresa}</h4>
                                <h4>Divisa: {props.divisa}</h4>
                                <h4>Tipo de comprobante: {props.tipoCom}</h4>
                                <h4>Importe: {'$'+props.importe}</h4>
                                <p>Fecha de factura: {props.fechaFact}</p>
                            </div>
                        </div>
                    </div>
                </Popup>
                
                <button className="botones" style={{fontSize: '2.75rem'}}><a download={props.fileName.toString()} href={'data:application/octet-stream;base64,' + props.pdf}><i className="fas fa-file-pdf" style={{color: '#e03b16'}}></i></a></button>
                <button disabled={!props.xml} onClick={() => props.descarga(props.fileName.toString(), props.idFac)} className="botones" style={{fontSize: '2.75rem'}}><i className={classnames ("fas fa-file-code", props.xml ? "xml1" : "xml2")} ></i></button>
            </th>
        </tr>
    )
}


/*
Para poder descargar no es más que necesario pasar el contenido codificado
*/

export default FacturaComponent