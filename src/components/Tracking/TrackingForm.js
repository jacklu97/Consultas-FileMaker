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
                {carga}
                <TrackingComponent/>
            </div>
        )
    }
}

export default TrackingForm