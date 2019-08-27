import React from 'react'
import Popup from 'reactjs-popup'
import TrackingComponent from './TrackingComponent';

const TrackingTable = (props) => {
    return (
        <tr>
            <th>{props.objeto.idFile}</th>
            <th>{props.objeto.mbl}</th>
            <th>
                <ul>
                    {props.objeto.hbl.split('\n').map( (h, i) => {
                        return <li key={i}>{h}</li>
                    })}
                </ul>
            </th>
            <th>
                <ul>
                    {props.objeto.contenedores.split(' ').map( (c,i) => {
                        return <li key={i}>{c}</li>
                    })}
                </ul>
            </th>
            <th>{props.objeto.pol}</th>
            <th>{props.objeto.pod}</th>
            <th>{props.objeto.etd}</th>
            <th>{props.objeto.status}</th>
            <th className="text-center">
                    <Popup trigger={<button className="botones" style={{fontSize: '2.75rem'}}><i className="fas fa-info-circle"></i></button>} modal>
                        <TrackingComponent objeto = {props.objeto} />
                    </Popup>
            </th>
        </tr>
    )
}

export default TrackingTable