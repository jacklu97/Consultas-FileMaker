import React from 'react'

import './FacturaComponent.css'

const FacturaComponent = (props) =>{
    let xmlColor = props.xml ? '#d9d9d9' : '##e6884e'
    return (
        <div className="col-md-5">
            <div className="factura-caja">
                <div className="factura-texto">
                    <h2>No fact: {props.idFac}</h2>
                    <h3>File: {props.file}</h3>
                    <h3>Empresa: {props.empresa}</h3>
                    <h4>Divisa: {props.divisa}</h4>
                    <h4>Tipo de comprobante: {props.tipoCom}</h4>
                    <h4>Importe: {'$'+props.importe}</h4>
                    <div className="descargaFact">
                        <button onClick={() => props.descarga("pdf", props.idFac)} className="botones" style={{fontSize: '2.75rem'}}><i className="fas fa-file-pdf" style={{color: '#e03b16'}}></i></button>
                        <button disabled={props.xml} onClick={() => props.descarga("xml", props.idFac)} className="botones" style={{fontSize: '2.75rem'}}><i className="fas fa-file-code" style={{color: xmlColor}}></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FacturaComponent