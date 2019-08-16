import React from 'react';


export default function(ComposedComponent){
    class Authenticate extends React.Component {
        UNSAFE_componentWillMount() {
            if(null === localStorage.getItem('jwtToken')) return this.props.history.push("/");
            let ahora = new Date();
            let jason = JSON.parse (localStorage.getItem('jwtToken'))
            let antes = new Date(jason.fecha)
            if(ahora - antes > 10000000){
                this.props.history.push("/");
            }
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }


    return (Authenticate);
}