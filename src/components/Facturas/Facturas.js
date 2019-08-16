import React, {Component} from 'react'
//import axios from 'axios'
import FacturaComponent from './FacturaComponent';
import Select from 'react-select'

import './Facturas.css'
class Facturas extends Component {

    state = {
        facturas: [],
        cargado: false,
        facturasBus: [],
        error: false
    }

    /*UNSAFE_componentWillMount = () =>{
        axios.get('https://cors-anywhere.herokuapp.com/http://fmaker.dynalias.com/RESTfm/EASYLOAD/layout/FacturasApi.json?RFMfind=SELECT%20%27_NO FACTURA%27%2CCFDI.UUID%2CCERTIFICADO.FECHA%2CFILE%2CEMPRESA_QUE_FACTURARA%2CRFC%2CNombrePdf%2CXmlEncode%2CPdfEncode%2CSERIE%2CCODIGO_DIVISA%2C%27IMPORTE FACT%27%2C%27FECHA FACT%27%2CTIPO.COMPROBANTE%20WHERE%20STATUS_PAGO%3D%27SIN PAGAR%27%20AND%20ID_CLIENTE%3DCRM4379',
                    {
                        'auth':{
                            username: 'system',
                            password: 'Sys1638'
                        }
                    })
        .then( response => {
            this.setState({facturas: response.data.data, facturasBus: response.data.data, cargado: true})
            console.log(this.state)
        })
        .catch( error => {
            this.setState({error: true})
        })
    }*/

    static getDerivedStateFromProps =(props)=>{
        return({
            facturas: props.paseFacturas,
            facturasBus: props.paseFacturas,
            cargado: true
        })
    }

    descarga = ( )=>{
        /*const FileDownload = require('js-file-download');
        let conenido = atob("PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPGNmZGk6Q29tcHJvYmFudGUgeG1sbnM6eHNpPSJodHRwOi8vd3d3LnczLm9yZy8yMDAxL1hNTFNjaGVtYS1pbnN0YW5jZSIgeG1sbnM6Y2ZkaT0iaHR0cDovL3d3dy5zYXQuZ29iLm14L2NmZC8zIiB4c2k6c2NoZW1hTG9jYXRpb249Imh0dHA6Ly93d3cuc2F0LmdvYi5teC9jZmQvMyBodHRwOi8vd3d3LnNhdC5nb2IubXgvc2l0aW9faW50ZXJuZXQvY2ZkLzMvY2ZkdjMzLnhzZCAiIFZlcnNpb249IjMuMyIgRm9saW89IjQ0MDciIEZlY2hhPSIyMDE5LTA1LTA2VDE5OjE0OjAwIiBNZXRvZG9QYWdvPSJQUEQiIEZvcm1hUGFnbz0iOTkiIFRpcG9EZUNvbXByb2JhbnRlPSJJIiBNb25lZGE9IlVTRCIgVGlwb0NhbWJpbz0iMTkuMTAxNCIgTHVnYXJFeHBlZGljaW9uPSI0NDY3MCIgU3ViVG90YWw9IjEuMTUiIFRvdGFsPSIxLjMzIiBDZXJ0aWZpY2Fkbz0iTUlJR1Z6Q0NCRCtnQXdJQkFnSVVNREF3TURFd01EQXdNREEwTVRFek9USTVOall3RFFZSktvWklodmNOQVFFTEJRQXdnZ0d5TVRnd05nWURWUVFEREM5QkxrTXVJR1JsYkNCVFpYSjJhV05wYnlCa1pTQkJaRzFwYm1semRISmhZMm5EczI0Z1ZISnBZblYwWVhKcFlURXZNQzBHQTFVRUNnd21VMlZ5ZG1samFXOGdaR1VnUVdSdGFXNXBjM1J5WVdOcHc3TnVJRlJ5YVdKMWRHRnlhV0V4T0RBMkJnTlZCQXNNTDBGa2JXbHVhWE4wY21GamFjT3piaUJrWlNCVFpXZDFjbWxrWVdRZ1pHVWdiR0VnU1c1bWIzSnRZV05wdzdOdU1SOHdIUVlKS29aSWh2Y05BUWtCRmhCaFkyOWtjMEJ6WVhRdVoyOWlMbTE0TVNZd0pBWURWUVFKREIxQmRpNGdTR2xrWVd4bmJ5QTNOeXdnUTI5c0xpQkhkV1Z5Y21WeWJ6RU9NQXdHQTFVRUVRd0ZNRFl6TURBeEN6QUpCZ05WQkFZVEFrMVlNUmt3RndZRFZRUUlEQkJFYVhOMGNtbDBieUJHWldSbGNtRnNNUlF3RWdZRFZRUUhEQXREZFdGMWFIVERxVzF2WXpFVk1CTUdBMVVFTFJNTVUwRlVPVGN3TnpBeFRrNHpNVjB3V3dZSktvWklodmNOQVFrQ0RFNVNaWE53YjI1ellXSnNaVG9nUVdSdGFXNXBjM1J5WVdOcHc3TnVJRU5sYm5SeVlXd2daR1VnVTJWeWRtbGphVzl6SUZSeWFXSjFkR0Z5YVc5eklHRnNJRU52Ym5SeWFXSjFlV1Z1ZEdVd0hoY05NVGd3TnpBeU1UWTFPREF4V2hjTk1qSXdOekF5TVRZMU9EQXhXakNCOXpFcU1DZ0dBMVVFQXhNaFEwVk9WRkpCVENCRFFWSkhUeUJHVDFKWFFWSkVTVTVISUZOQklFUkZJRU5XTVNvd0tBWURWUVFwRXlGRFJVNVVVa0ZNSUVOQlVrZFBJRVpQVWxkQlVrUkpUa2NnVTBFZ1JFVWdRMVl4S2pBb0JnTlZCQW9USVVORlRsUlNRVXdnUTBGU1IwOGdSazlTVjBGU1JFbE9SeUJUUVNCRVJTQkRWakVsTUNNR0ExVUVMUk1jUTBOR01UZ3dOREl6UmpjMElDOGdSazlEUkRrek1USXlNRWhNTmpFZU1Cd0dBMVVFQlJNVklDOGdSazlEUkRrek1USXlNRTFLUTB4T1REQTRNU293S0FZRFZRUUxFeUZEUlU1VVVrRk1JRU5CVWtkUElFWlBVbGRCVWtSSlRrY2dVMEVnUkVVZ1ExWXdnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFDQzhhQjFOa0Z6WFRhclZSYmxpUWJDakN1eGRGQ3cyelBRVmg0cW1jNUpvQXBrT2JyMVRwY3JnUFFhRHlnSng4c2xxbXlVTUNwWlYwZmVZbU92Q1ZwblNzMEFCeENBOFR0amxGZWFDTVpYL2FtbnlKL0puOUNEQWJnbkowNTFpRXdvU01GOTVWRWgyTXBFNy9OREtRRTBsTHVJL28zOTlpUmwyRU5zVHdzYW8wMEUvb0N1RkNpeldYTVhDcGI0cUtZbnpKMmpoMFpxU1oxdVlpM041M0NGay81SzFNbVVTKzdqNDFSVUVUcjhZbzdaQ0ZnWmlHVjE5Q0o1UFZ3UjNDaHl1dEcxU1pwTnJQdndZNjA5anMwVlZiRFBISW9URGY0RVFHTFp5YkdRdVNwazVpR2ZsajZYeUVtZjNSVEhBVnFwQ25Gd1pTT0RhZ0x5T0Y4bFIwWGhBZ01CQUFHakhUQWJNQXdHQTFVZEV3RUIvd1FDTUFBd0N3WURWUjBQQkFRREFnYkFNQTBHQ1NxR1NJYjNEUUVCQ3dVQUE0SUNBUUJUR3NIUGdiYXdLdGJSTlFxUjltUVdhdlhWYk9BdUlyRmdZOWJwT2lQdGEvQm5FQUpETURxOEtQYzlWRHVNblRHaEtvVVgzWE1keEJoZGFzOWdIWHNSRysrNTh5cE03U2dwWjBRdUREdlVjSStsRXl2RW9EZUZUYXNGTTVmQ0dSdHVUZXM3R09zYnRxQ21UR2VMdUd2YkF1aDVhcUwwcmR3ODNPL0x6MVp1VVR5OFR2UlRFajB6YlhkVE5nZ25YTWZmUXo0eUpSU0xLQ2FKRUxmanZHTEo2c1hrcEgwdCtZcHNHNjVrNGFMMUJ2R0xpdkdRRnVIZExleTJ6a0NrOXBuTWpVc01aK3pFLzNlVGpiRHpkdndCbXFzWHBVVDhQQWw1RUJmVnA3b0hVTlFBemNlUTErdkJ1ckFIWG1CcG1McjlwckE5M3dhSGRpOUJGZnRNMHJ3a21Ua1I1Z2Q3alBCc2lzeXk2TklHaFNDT28rQkhtd3JmMkxPUzgwa3lkdFhOR2FsZHBHTlhyMTd1dHBGbHZEbW02R2sxajZ3Tm1jRTd0WnVYV3loMzVRdUEvbEN2T2FxSDJaRXU2RjNxdS9qUGlhWk9GYUp2RW5WTXpaWWRNdm5GSTdTKzZQWldHOWVQRHFtY1FjSXkwWUZZUzJOTWxjRDlUMWFmTzN0VkNYUXF5UVFlTXdicTZ1Q0NLZEdnM1JXWWdrUnBuQWZGRnNhcjh2YVZkeHd2MnVuUzBDUDZXME1lU1FzVUc4REh2VG9Wc2NseUpTWnFPR0pYaWFxbGtWSHRDUTY0eGxVSDc2aFBveUkvVG9UUFp6dlBpekFHR01FNnZEazh4MU1uOFpYYlJNTjFLWjhGb0JlUVNySUJaWDJySjQvZkkzUlgvQ2V0N3EyRE5kOHd1dz09IiBOb0NlcnRpZmljYWRvPSIwMDAwMTAwMDAwMDQxMTM5Mjk2NiIgU2VsbG89IlFNaFhBeUJjWXJBUUM2WStncVUwdk4yNjRNK09kNWl2MnFhcS9xc2tWV2prQ1hoRXhlSmtGc1F0RE5nWW5RZFlrRDZRTUtrQlpBSTJVMkNSNXJYUHY0c3I0NSt4Z2lqelRycGMyMmR2bFZwbjlXTG1GdGgxVzRjTFo1UFdrakJwR0hrYnlnNjdpUjErQnFZb0VDZTdmamU3WVBpYWlXYXZiejI1cVVKQ2FESWVMS2lzckZkRG9Fd2pGdTJrU0t4YjJOTUFsNnRKZEs1UHVvMysrUGl1SFgwU281L0drbG8wOWMwQnB6bkx2bFcvSFJidXIreU9sZGFIUmNpSStpUytJa1BUWjVQUFp4aTBtK0NCY1JKNmhCdGRjQU5wbTc5ZUliZkxhUFg4djVocVdHL09qS055ODQ1K0ZwQjZtZ3pWKytFenZuTjZ4SHZjRFVyVXVrcThvQT09Ij4KICA8Y2ZkaTpFbWlzb3IgUmZjPSJDQ0YxODA0MjNGNzQiIE5vbWJyZT0iQ0VOVFJBTCBDQVJHTyBGT1JXQVJESU5HIFNBIERFIENWIiBSZWdpbWVuRmlzY2FsPSI2MDEiLz4KICA8Y2ZkaTpSZWNlcHRvciBSZmM9IkJNRTgyMDIwMkpNNiIgTm9tYnJlPSJCSUNJQ0xFVEFTIE1FUkNVUklPIFNBIERFIENWIiBVc29DRkRJPSJHMDMiLz4KICA8Y2ZkaTpDb25jZXB0b3M+CiAgICA8Y2ZkaTpDb25jZXB0byBDYW50aWRhZD0iMSIgVW5pZGFkPSJTRVJWSUNJTyIgQ2xhdmVVbmlkYWQ9IkU0OCIgTm9JZGVudGlmaWNhY2lvbj0iMTYxMjkyIiBDbGF2ZVByb2RTZXJ2PSI3ODE0MTUwMCIgRGVzY3JpcGNpb249IkxJQkVSQUNJT04gREUgRE9DVU1FTlRPUyIgVmFsb3JVbml0YXJpbz0iMS4xNSIgSW1wb3J0ZT0iMS4xNSI+CiAgICAgIDxjZmRpOkltcHVlc3Rvcz4KICAgICAgICA8Y2ZkaTpUcmFzbGFkb3M+CiAgICAgICAgICA8Y2ZkaTpUcmFzbGFkbyBCYXNlPSIxLjE1IiBJbXB1ZXN0bz0iMDAyIiBUaXBvRmFjdG9yPSJUYXNhIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgSW1wb3J0ZT0iMC4xODQiLz4KICAgICAgICA8L2NmZGk6VHJhc2xhZG9zPgogICAgICA8L2NmZGk6SW1wdWVzdG9zPgogICAgPC9jZmRpOkNvbmNlcHRvPgogIDwvY2ZkaTpDb25jZXB0b3M+CiAgPGNmZGk6SW1wdWVzdG9zIFRvdGFsSW1wdWVzdG9zVHJhc2xhZGFkb3M9IjAuMTgiPgogICAgPGNmZGk6VHJhc2xhZG9zPgogICAgICA8Y2ZkaTpUcmFzbGFkbyBJbXB1ZXN0bz0iMDAyIiBUYXNhT0N1b3RhPSIwLjE2MDAwMCIgSW1wb3J0ZT0iMC4xOCIgVGlwb0ZhY3Rvcj0iVGFzYSIvPgogICAgPC9jZmRpOlRyYXNsYWRvcz4KICA8L2NmZGk6SW1wdWVzdG9zPgogIDxjZmRpOkNvbXBsZW1lbnRvPgogICAgPHRmZDpUaW1icmVGaXNjYWxEaWdpdGFsIHhtbG5zOnRmZD0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwiIHhzaTpzY2hlbWFMb2NhdGlvbj0iaHR0cDovL3d3dy5zYXQuZ29iLm14L1RpbWJyZUZpc2NhbERpZ2l0YWwgaHR0cDovL3d3dy5zYXQuZ29iLm14L3NpdGlvX2ludGVybmV0L2NmZC9UaW1icmVGaXNjYWxEaWdpdGFsL1RpbWJyZUZpc2NhbERpZ2l0YWx2MTEueHNkIiBWZXJzaW9uPSIxLjEiIFVVSUQ9IjY2OGU4NmFjLTNjOTUtNGY3NC1hMGNhLTY2NGQ5YTAxNjc4OSIgRmVjaGFUaW1icmFkbz0iMjAxOS0wNS0wNlQxOToxNTozNCIgUmZjUHJvdkNlcnRpZj0iTFNPMTMwNjE4OVI1IiBTZWxsb0NGRD0iUU1oWEF5QmNZckFRQzZZK2dxVTB2TjI2NE0rT2Q1aXYycWFxL3Fza1ZXamtDWGhFeGVKa0ZzUXRETmdZblFkWWtENlFNS2tCWkFJMlUyQ1I1clhQdjRzcjQ1K3hnaWp6VHJwYzIyZHZsVnBuOVdMbUZ0aDFXNGNMWjVQV2tqQnBHSGtieWc2N2lSMStCcVlvRUNlN2ZqZTdZUGlhaVdhdmJ6MjVxVUpDYURJZUxLaXNyRmREb0V3akZ1MmtTS3hiMk5NQWw2dEpkSzVQdW8zKytQaXVIWDBTbzUvR2tsbzA5YzBCcHpuTHZsVy9IUmJ1cit5T2xkYUhSY2lJK2lTK0lrUFRaNVBQWnhpMG0rQ0JjUko2aEJ0ZGNBTnBtNzllSWJmTGFQWDh2NWhxV0cvT2pLTnk4NDUrRnBCNm1nelYrK0V6dm5ONnhIdmNEVXJVdWtxOG9BPT0iIE5vQ2VydGlmaWNhZG9TQVQ9IjAwMDAxMDAwMDAwNDA4MjU0ODAxIiBTZWxsb1NBVD0idEg2ZzBWSHpwbmVYSm16YVhBZVhqemk3Q2RsRlJrRlYraHl5TlQ5TlRIM1pMSFVkZ2JmNlB1a3ZEaG1iZ2dFcjB2cm5qTlRwVVlnSHhqSGpUN29FV3JiR0crTXRGRGJ4MlN6SFBVMmhFcUVla3h1dUIrc0ZxalYvYkFuVWVFV01wc2RhdDI1QXNUaS8yMSsxN3N0b2NuVzBlV3FIMkhqZk91TGFnVDZFTG1zeVA1RXoxN1RWbEkxVTZGcXdBbWtoZ2djZDhSZmN5NGcyQURzZmVra1NTeWFQWGJhcVZSL3RUaHdkalQ4OVVybFZXRFlLL1QvY1FzU2pIcG9wN1QvZ2hzMDAzZk85a0trRGdHMHN0Y21wRFc2clhhNGJnc0V5akVQdmtxelMyc3lwTHNBdGE1RE0wTzczUlVnZ0FGM3hoWVpDT2FrNzNYcUxJQXpDa1NwVHVRPT0iLz4KICA8L2NmZGk6Q29tcGxlbWVudG8+CjwvY2ZkaTpDb21wcm9iYW50ZT4K")
        FileDownload(conenido, 'reporte.xml')*/
    }

    downloadHandler = (params, id) => {
        let texto64 = this.state.facturas.filter( factura => {
            return factura["_NO FACTURA"] === id
        })
        let salida = ( texto64[0].XmlEncode)
        let desEncripta = atob(salida)
        //console.log(desEncripta)
        let nombreArch = params.substr(0, params.indexOf('.')) + '.xml'
        const FileDownload = require('js-file-download');
        FileDownload(desEncripta, nombreArch)
    }

    handleFinderChange = (e) =>{
        console.log(e)
        let dato = ''
        if(e !== null)
            dato = e.value.toLowerCase()
        this.setState({
            busqueda: dato,
            facturasBus: this.state.facturas.filter( e => {
                return Object.values(e)
                .join(" ")
                .toLowerCase()
                .match(dato)
            })
        })
    }

    getDateConFormato = (e) =>{
        //Esta es para las facturas de HK
        let fecha = new Date( Date.parse(e) )
        let dia = fecha.getDate()
        let mes = fecha.getMonth() + 1
        let anio = fecha.getFullYear()
        if (dia < 10) { 
            dia = '0' + dia; 
        } 
        if (mes < 10) { 
            mes = '0' + mes; 
        } 
        return dia + '/' + mes + '/' + anio
    }

    render(){
        const carga = (<div className="spinner-box">
                      <div className="circle-border">
                        <div className="circle-core"></div>
                      </div>  
                    </div>)

        const empresas = [
            { value: 'CCF MEXICO', label: 'CENTRAL CARGO FORWARDING'},
            { value: 'CCI HONG KONG', label: 'CENTRAL CARGO INTERNATIONAL LIMITED'}
        ]

        return (
            <div style={{justifyContent: 'center'}}>
                <h1 style={{display: 'inline'}}>Listado de facturas</h1>
                <div style={{display: 'inline', width:'10%'}}>
                    <Select name="empresa"
                            className="prueba"
                            options={empresas} 
                            onChange={this.handleFinderChange}
                            isClearable={true}
                            placeholder={"Selecciona una empresa..."}
                            />        
                </div>
                <div className="row">
                    {this.state.cargado ? 
                    this.state.facturasBus.map( (f,i) => {
                        let textoPdf64 = f.PdfEncode
                        //let pasoPdf = atob(textoPdf64)
                        return <FacturaComponent 
                                descarga = {this.downloadHandler}
                                key = {i}
                                idFac={f["_NO FACTURA"]} 
                                file={f.FILE}
                                empresa={f["EMPRESA_QUE_FACTURARA"] === "CCF MEXICO" ? "CENTRAL CARGO FORWARDING" : "CENTRAL CARGO INTERNATIONAL LIMITED"}
                                divisa={f.CODIGO_DIVISA}
                                tipoCom={f["TIPO.COMPROBANTE"]}
                                importe={f["IMPORTE FACT"]}
                                xml={f.XmlEncode ? false : true}
                                pdf={textoPdf64}
                                fileName = {f.NombrePdf}
                                fechaFact = {f.SERIE ? this.getDateConFormato(f["FECHA FACT"]) : this.getDateConFormato(f["CERTIFICADO.FECHA"])}/>
                    })
                    : carga}
                </div>
                
            </div>
            )
    }
}

export default Facturas