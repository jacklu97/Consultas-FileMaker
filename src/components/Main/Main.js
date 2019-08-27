import React, {Component} from 'react'
import axios from 'axios'

import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";


import './Main.css'
import Facturas from '../Facturas/Facturas';
import Home from '../Home/Home';
import TrackingForm from '../Tracking/TrackingForm';
import requireAuth from '../../utils/requireAuth'


class Main extends Component {

    state={
        embarques: [],
        facturas: [],
        cargado: false
    }
    
    componentDidMount = () =>{
        //Hacemos el fetch de embarques
        /*axios.get('https://cors-anywhere.herokuapp.com/http://fmaker.dynalias.com/RESTfm/EASYLOAD/layout/EmbarquesApi.json?RFMfind=SELECT%20ID_FILE%2CMBL%2CHBL%2CBUQUE%2CPOL%2CPOD%2C%27DESTINO FINAL%27%2CVIAJE%2CNAVIERA%2CTIPO%2CCLIENTE%2C%27CNTR 20DC%27%2C%27CNTR 40DC%27%2C%27CNTR 40HQ%27%2C%27CNTR LCL%27%2CCONTENEDORES%2CETD%2CETA%2C%27STATUS EMBARQUES%27%20WHERE%20STATUS_REPORTE%3DACTIVA%20AND%20_ID_CLIENTE%3DCRM4379',
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({embarques: response.data.data})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })
        //Hacemos el fetch de facturas
        axios.get('https://cors-anywhere.herokuapp.com/http://fmaker.dynalias.com/RESTfm/EASYLOAD/layout/FacturasApi.json?RFMfind=SELECT%20%27_NO FACTURA%27%2CCFDI.UUID%2CCERTIFICADO.FECHA%2CFILE%2CEMPRESA_QUE_FACTURARA%2CRFC%2CNombrePdf%2CXmlEncode%2CPdfEncode%2CSERIE%2CCODIGO_DIVISA%2C%27IMPORTE FACT%27%2C%27FECHA FACT%27%2CTIPO.COMPROBANTE%20WHERE%20STATUS_PAGO%3D%27SIN PAGAR%27%20AND%20ID_CLIENTE%3DCRM4379',
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({facturas: response.data.data, cargado: true})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })*/
        axios.get(`http://127.0.0.1:5000/embarque/${JSON.parse(localStorage.getItem("identidad")).clave}`,
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({embarques: response.data})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })
        axios.get(`http://127.0.0.1:5000/getFacturas/${JSON.parse(localStorage.getItem("identidad")).clave}`,
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({facturas: response.data, cargado: true})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })
    }
    
    
    salida = () =>{
        localStorage.clear();
        this.props.history.push('/')
    }

    render() {
        const carga = (<div ><div className="spinner-box">
                      <div className="circle-border">
                        <div className="circle-core"></div>
                      </div>  
                    </div> 
                    <h1 className="cabecera">Estamos cargando tu información...</h1>
                    </div>)
        return(
            <HashRouter>
                {this.state.cargado ? <div>
                    
                    <nav className="navbar navbar-inverse navbar-fixed-top" >
                        <div className="container-fluid" style={{alignItems: 'center'}}>
                            <div className="navbar-header">
                                <NavLink to="/" className="navbar-brand" style={{marginTop:'5px'}}><p style={{color: 'red'}}>Central <span style={{color:'white'}}>Cargo</span> </p></NavLink>
                                <button style={{color:'white'}}  type="button" className="navbar-toggle collapsed fas fa-bars" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"></button>
                            </div>
                        
                        <ul className="nav navbar-nav navbar-right collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><NavLink to="/facturas"><i className="fas fa-file-invoice" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Facturas</NavLink></li>
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><NavLink to="/tracking"><i className="fas fa-chart-line" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Tracking</NavLink></li>
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><NavLink onClick={this.salida} to=' '><i className="fas fa-door-open" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Salir</NavLink></li>
                        </ul>
                        </div>
                    </nav>
                    <div className="container" style={{marginTop: '60px'}}>
                        <Route exact path="/" component={requireAuth(Home)}/>
                        <Route path="/tracking" render={(props) => (<TrackingForm {...props} paseEmbarques={this.state.embarques}/>)}/>
                        <Route path="/facturas" render={(props) => <Facturas {...props} paseFacturas={this.state.facturas}/>}/>
                    </div>
                </div> : carga}
                
            </HashRouter>
        )
    }
}

export default Main