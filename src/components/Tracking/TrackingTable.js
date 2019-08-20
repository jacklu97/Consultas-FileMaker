import React from 'react'
import Popup from 'reactjs-popup'
import TrackingComponent from './TrackingComponent';

const TrackingTable = (props) => {
    return (
        <tr>
            <th>{props.objeto.ID_FILE}</th>
            <th>{props.objeto.MBL}</th>
            <th>
                <ul>
                    {props.objeto.HBL.split('\n').map( (h, i) => {
                        return <li key={i}>{h}</li>
                    })}
                </ul>
            </th>
            <th>
                <ul>
                    {props.objeto.CONTENEDORES.split(' ').map( (c,i) => {
                        return <li key={i}>{c}</li>
                    })}
                </ul>
            </th>
            <th>{props.objeto.POL}</th>
            <th>{props.objeto.POD}</th>
            <th>{props.objeto.ETD}</th>
            <th>{props.objeto["STATUS EMBARQUES"]}</th>
            <th className="text-center">
                    <Popup trigger={<button className="botones" style={{fontSize: '2.75rem'}}><i className="fas fa-info-circle"></i></button>} modal>
                        <TrackingComponent objeto = {props.objeto} />
                    </Popup>
            </th>
        </tr>
    )
}

export default TrackingTable