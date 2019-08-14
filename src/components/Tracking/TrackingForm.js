import React, {Component} from 'react'
import axios from 'axios'

import './TrackingForm.css'
import TrackingComponent from './TrackingComponent';


class TrackingForm extends Component {
    state={
        embarques: [],
        cargado: false,
        error: false
    }

    componentWillMount = () => {
        axios.get('https://cors-anywhere.herokuapp.com/http://fmaker.dynalias.com/RESTfm/EASYLOAD/layout/EmbarquesApi.json?RFMfind=SELECT%20ID_FILE%2CMBL%2CHBL%2CBUQUE%2CPOL%2CPOD%2C%27DESTINO FINAL%27%2CVIAJE%2CNAVIERA%2CTIPO%2CCLIENTE%2C%27CNTR 20DC%27%2C%27CNTR 40DC%27%2C%27CNTR 40HQ%27%2C%27CNTR LCL%27%2CCONTENEDORES%2CETD%2CETA%2C%27STATUS EMBARQUES%27%20WHERE%20STATUS_REPORTE%3DACTIVA%20AND%20_ID_CLIENTE%3DCRM4379',
                    {
                        'auth':{
                            username: 'jcardenas',
                            password: 'Car_0905'
                        }
                    })
        .then( response => {
            this.setState({embarques: response.data.data, cargado: true})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
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
                <h1>Hola Tracking</h1>
                {this.state.cargado ? 
                 this.state.embarques.map( (e, i) => {
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