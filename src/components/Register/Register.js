import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: '',
        }
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onApellidoChange = this.onApellidoChange.bind(this);
        this.onDireccionChange = this.onDireccionChange.bind(this);
        this.onTelefonoChange = this.onTelefonoChange.bind(this);
    }
    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }
    onNombreChange = (event) => {
        this.setState({ nombre: event.target.value });
    }
    onApellidoChange = (event) => {
        this.setState({apellido: event.target.value});
    }
    onDireccionChange = (event) => {
        this.setState({ direccion: event.target.value });
    }
    onTelefonoChange = (event) => {
        this.setState({ telefono: event.target.value });
    }
    onSubmitSignIn = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.passsword,
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                direccion: this.state.direccion,
                telefono: this.state.telefono,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    render() {
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Registrarse</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="username">Usuario</label>
                                <input
                                    onChange={this.onUsernameChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="username"
                                    id="username" 
                                    required
                                    />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="nombre">Nombre</label>
                                <input
                                    onChange={this.onNombreChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="apellido">Apellido</label>
                                <input
                                    onChange={this.onApellidoChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="apellido"
                                    id="apellido" />
                            </div>
                            
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="direccion">Direccion</label>
                                <input
                                    onChange={this.onDireccionChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="direccion"
                                    id="direccion" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="telefono">Telefono</label>
                                <input
                                    onChange={this.onTelefonoChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="telefono"
                                    id="telefono" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Registrarse" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default Register;