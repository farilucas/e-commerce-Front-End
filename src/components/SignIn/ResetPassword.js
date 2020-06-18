import React from 'react';

export default class ResetPassword extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: ''
        }
    }

    onUsernameInput = (event) =>{
        this.setState({username: event.target.value})
    }

    resetButton = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:8000/api/usuarios/${this.state.username}/password/email`,{
            method: 'get'
        })
    }

    render(){
        return(
            <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="changePassword" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 moon-gray mh0">Cambiar contraseña</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy light-gray f6" htmlFor="bombre">Usuario</label>
                                <input type='text' onChange={this.onUsernameInput} name='username' className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" placeholder='Usuario'/>
                            </div>
                        </fieldset>
                        <div className="mt3">
                            <input 
                                onClick={this.resetButton}
                                className="b ph3 pv2 input-reset ba b--black light-gray bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Enviar"
                            />
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}