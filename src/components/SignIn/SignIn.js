import React from 'react';

class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTcyNDE1NCwiZXhwIjoxNTg5NzI3NzU0LCJuYmYiOjE1ODk3MjQxNTQsImp0aSI6IkNvalh3ekZ2dnJYYzR4ZUUiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.ilro50UFbE3lFR1x098OCLTvgMot7-_grefswmhfUqY'
        }
    }
    onNombreChange = (event) =>{
        this.setState({username: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value });
    }

   
    async onSubmitSignIn = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.token) {
                    alert(user.token);
                    user.username = this.state.username;
                    this.props.onRouteChange('Inicio');
                }
            })
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Ingresar</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="bombre">Nombre</label>
                                <input
                                    onChange={this.onNombreChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="nombre"
                                    id="nombre" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Contraseña</label>
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
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Ingresar" />
                        </div>
                        <div className="lh-copy mt3">
                            <p
                                onClick={() => this.props.onRouteChange('Register')}
                                href="#0"
                                className="f6 link dim black db pointer">Registrarse</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default SignIn;