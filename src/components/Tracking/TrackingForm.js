import React, {Component} from 'react'
import Select from 'react-select'

import './TrackingForm.css'
import TrackingTable from './TrackingTable';


class TrackingForm extends Component {
    constructor(props) {
        super(props)
        this.state={
            busqueda: '',
            filtrados: props.paseEmbarques,
            embarques: props.paseEmbarques,
            cargado: false,
            error: false
        }
    }

    componentDidMount = () => {
        this.setState({
            cargado: true
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

    handleSelectFilter = (e) =>{
        console.log(e)
        let valor = ''
        if (e !== null)
            valor = e.value
        let correctos = this.state.embarques.filter( e => {
            return Object.values(e).join(" ").match(valor)
        })
        this.setState({
            filtrados: correctos
        })
    }
    
    render() {
        const carga = (<div className="spinner-box">
                      <div className="circle-border">
                        <div className="circle-core"></div>
                      </div>  
                    </div>)

        const tipoStatus = [
            {value: 'EN PUERTO', label: 'En puerto'},
            {value: 'POR LLEGAR', label: 'Por llegar'},
            {value: 'EN AGUA', label: 'En agua'},
            {value: 'POR SALIR', label: 'Por salir'}

        ]

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
                <div style={{marginTop: '2%', display: 'inline-block', width:'30%', marginLeft: '-35%'}}>
                    <Select 
                        placeholder={"Selecciona el status..."} 
                        options= {tipoStatus}
                        isClearable
                        onChange={this.handleSelectFilter}
                        />
                </div>
                
                {this.state.cargado ? 
                 <table>
                     <tbody>
                         <tr>
                            <th>
                                ID File
                            </th>
                            <th>
                                MBL
                            </th>
                            <th>
                                HBL
                            </th>
                            <th>
                                Contenedores
                            </th>
                            <th>
                                POL
                            </th>
                            <th>
                                POD
                            </th>
                            <th>
                                ETD
                            </th>
                            <th>Status</th>
                            <th>Información</th>
                         </tr>
                         {this.state.filtrados.map( (e,i) => {
                             return <TrackingTable objeto = {e} key= {i}/>
                         })}
                    
                     </tbody>
                 </table>
                 : carga}
                
            </div>
        )
    }
}

export default TrackingForm