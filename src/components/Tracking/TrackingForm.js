import React, {Component} from 'react'
import axios from 'axios'

import './TrackingForm.css'
import TrackingComponent from './TrackingComponent';


class TrackingForm extends Component {
    state={
        busqueda: '',
        filtrados: [],
        embarques: [],
        cargado: false,
        error: false
    }

    componentWillMount = () => {
        axios.get('https://cors-anywhere.herokuapp.com/http://fmaker.dynalias.com/RESTfm/EASYLOAD/layout/FacturasApi.json?RFMfind=SELECT%20%27_NO FACTURA%27%2CCFDI.UUID%2CCERTIFICADO.FECHA%2CFILE%2CEMPRESA_QUE_FACTURARA%2CRFC%2CNombrePdf%2CXmlEncode%2CPdfEncode%2CSERIE%2CCODIGO_DIVISA%2C%27IMPORTE FACT%27%2CTIPO.COMPROBANTE%20WHERE%20STATUS_PAGO%3D%27SIN PAGAR%27%20AND%20ID_CLIENTE%3DCRM4379',
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({embarques: response.data.data, filtrados: response.data.data, cargado: true})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })
    }

    handleFinderChange = (e) =>{
        let dato = e.target.value.toLowerCase()
        this.setState({
            busqueda: dato,
            filtrados: this.state.embarques.filter( e => {
                return Object.values(e)
                .join(" ")
                .toLowerCase()
                .match(dato)
            })
        })
    }
    
    render() {
        const carga = (<div className="spinner-box">
                      <div className="circle-border">
                        <div className="circle-core"></div>
                      </div>  
                    </div>)


        return(
            <div>
                <h1>Listado de embarques</h1>
                <div className="wrap">
                    <div className="search">
                        <input onChange={this.handleFinderChange} type="text" className="searchTerm" placeholder="Ingresa ID File, MBL, HBL..."/>
                        <button type="submit" className="searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
                
                {this.state.cargado ? 
                 this.state.filtrados.map( (e, i) => {
                    return <TrackingComponent
                     key = {i}
                     id={e.ID_FILE}
                     mbl={e.MBL}
                     hbl={e.HBL}
                     buque={e.BUQUE}
                     pol={e.POL}
                     pod={e.POD}
                     desFin={e["DESTINO FINAL"]}
                     viaje={e.VIAJE}
                     navi={e.NAVIERA}
                     dc20={e["CNTR 20DC"]}
                     dc40={e["CNTR 40DC"]}
                     hq40={e["CNTR 40HQ"]}
                     lcl={e["CNTR LCL"]}
                     contenedores={e.CONTENEDORES}
                     etd={e.ETD}
                     eta={e.ETA}
                     status={e["STATUS EMBARQUES"]}/>
                 })
                 : carga}
                
            </div>
        )
    }
}

export default TrackingForm