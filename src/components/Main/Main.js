import React, {Component} from 'react'


import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";


  import './Main.css'
import Facturas from '../Facturas/Facturas';
import Home from '../Home/Home';
import TrackingForm from '../Tracking/TrackingForm';



class Main extends Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <nav className="navbar navbar-inverse navbar-fixed-top" >
                        <div className="container-fluid" style={{alignItems: 'center'}}>
                            <div className="navbar-header">
                                <NavLink to="/" className="navbar-brand" style={{marginTop:'5px'}}><p>Central Cargo</p></NavLink>
                                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"></button>
                            </div>
                        
                        <ul className="nav navbar-nav navbar-right collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><NavLink to="/facturas"><i className="fas fa-file-invoice" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Facturas</NavLink></li>
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><NavLink to="/tracking"><i className="fas fa-chart-line" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Tracking</NavLink></li>
                            <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse.show" style={{textDecoration: 'none'}}><a href="#"><i className="fas fa-door-open" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Salir</a></li>
                        </ul>
                        </div>
                    </nav>
                    <div className="container" style={{marginTop: '60px'}}>
                        <Route exact path="/" component={Home}/>
                        <Route path="/tracking" component={TrackingForm}/>
                        <Route path="/facturas" component={Facturas}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main