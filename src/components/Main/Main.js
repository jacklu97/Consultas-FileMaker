import React, {Component} from 'react'


import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";


  import './Main.css'
import Facturas from '../Facturas/Facturas';
import Home from '../Home/Home';



class Main extends Component {
    render() {
        return(
            <HashRouter>
                <div>
                    <nav className="navbar navbar-inverse navbar-fixed-top" >
                        <div className="container-fluid" style={{alignItems: 'center'}}>
                            <div className="navbar-header">
                                <NavLink to="/" className="navbar-brand" style={{marginTop:'5px'}}><p>Central Cargo</p></NavLink>
                            </div>
                        
                        <ul className="nav navbar-nav navbar-right">
                            <li style={{textDecoration: 'none'}}><NavLink to="/facturas"><i class="fas fa-file-invoice" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Facturas</NavLink></li>
                            <li style={{textDecoration: 'none'}}><NavLink to="/traking"><i class="fas fa-chart-line" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Tracking</NavLink></li>
                            <li style={{textDecoration: 'none'}}><a href="#"><i class="fas fa-door-open" style={{fontSize: '1.75em'}}></i>{'\u00A0\u00A0'}Salir</a></li>
                        </ul>
                        </div>
                    </nav>
                    <div className="container" style={{marginTop: '60px'}}>
                        <Route exact path="/" component={Home}/>
                        {/*<Route path="/stuff" component={Stuff}/>*/}
                        <Route path="/facturas" component={Facturas}/>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

export default Main