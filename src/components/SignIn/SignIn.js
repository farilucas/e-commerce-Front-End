import React from 'react';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            admin: ''
        }
    }
    onNombreChange = (event) =>{
        this.setState({username: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value });
    }
   
    onSubmitSignIn = async (event) => {
        event.preventDefault();

        let response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        });

        if (response.status !== 200 && response.status !== 204) {
            return alert('Contraseña o Username incorrectos!');
        }

        let data = await response.json();

        localStorage.setItem('token', data.token);
        let refreshTokenHandle = setTimeout(
            () => {
                localStorage.clear();
                window.location.reload(false);
            },
            1000 * 3600
        );
        localStorage.setItem("tokenHandler", refreshTokenHandle);
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('admin', data.admin);
        window.onbeforeunload = () => {
            localStorage.clear();
        }
        this.props.onRouteChange('Inicio');
    }


    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 moon-gray mh0">Ingresar</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy light-gray f6" htmlFor="nombre">Nombre</label>
                                <input
                                    onChange={this.onNombreChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="nombre"
                                    id="nombre" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy light-gray f6" htmlFor="password">Contraseña</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black light-gray bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Ingresar" />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => this.props.onRouteChange('Registrarse')}
                                href="#0"
                                className="f6 link dim light-gray db grow pointer">Registrarse</p>
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => this.props.onRouteChange('ResetPassword')}
                                href="#0"
                                className="f6 link dim light-gray db grow pointer">forgot password?</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default SignIn;