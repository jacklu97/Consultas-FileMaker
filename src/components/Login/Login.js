import React, {Component} from 'react'
import logo from '../../logoSF.png'
import './Login.css'

//BME820202JM6 RFC DEL CLIENTE 
//PASS Bmercurio_131145


class Login extends Component {
    state= {
        username: '',
        password: '',
        errorPass: false,
        errorUsr: false,
        token: {
            fecha:''
        }
    }

    comprobarIngreso = (e) =>{
        e.preventDefault();
        this.setState({errorPass: false, errorUsr: false})
        console.log(this.state)
        
        if (this.state.username === "BME820202JM6" && this.state.password === "Bmercurio_131145"){
            console.log("Exito")
            this.props.history.push('/home')
        }
        else if(this.state.username === "usr" && this.state.password === "pss"){
            localStorage.setItem('jwtToken', JSON.stringify(this.state.token))
            console.log("Exito")
            this.props.history.push('/home')
            
        }
        else{
            console.log("Tas todo meco")
            if(this.state.password !== "Bmercurio_131145"){
                this.setState({errorPass: true})
            }
            else if(this.state.username !== "BME820202JM6"){
                this.setState({errorUsr: true})
            }
        }
    }

    crearToken = () => {
        this.setState({
            token: {
                fecha: new Date()
            }
        })
        
    }

    onChangeHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        this.crearToken();
    }

    render() {
        return (
            <div className="contenedor-maestro"> <div className="bg-image"></div>
                <div className="container formato">
                    <div id="login" className="signin-card">
                    <div className="logo-image">
                    <img src={logo} alt="Logo" title="Logo" width="138"/>
                    </div>
                    <h1 className="display1" style={{color: 'red'}}>Central <span style={{color: 'black'}}>Cargo</span></h1>
                    
                    <form>
                        <div id="form-login-username" className="form-group">
                            <input id="username" className="form-control" name="username" type="text" size="18" alt="login" required onChange = {this.onChangeHandler} />
                            <span className="form-highlight"></span>
                            <span className="form-bar"></span>
                            <label className="float-label">Usuario</label>
                            {this.state.errorUsr ? 
                                <div className="alert alert-danger" role="alert">
                                    Usuario no válido
                                </div> : null}
                        </div>
                        <div id="form-login-password" className="form-group">
                            <input id="passwd" className="form-control" name="password" type="password" size="18" alt="password" required onChange = {this.onChangeHandler}/>
                            <span className="form-highlight"></span>
                            <span className="form-bar"></span>
                            <label className="float-label">Contraseña</label>
                            {this.state.errorPass ? 
                                <div className="alert alert-danger" role="alert">
                                    Contraseña incorrecta
                                </div> : null}
                        </div>
                        <div>
                            <button disabled={(this.state.username.length < 1 && this.state.password.length < 1) ? true : false} className="btn btn-block btn-info ripple-effect" type="submit" name="Submit" alt="sign in" onClick={this.comprobarIngreso}>Ingresar</button>  
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login