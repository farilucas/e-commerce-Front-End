import React from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";

class Alta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            descripcion: '',
            precio:'',
        }
        this.onNombreChange = this.onNombreChange.bind(this);
        this.onDescripcionChange = this.onDescripcionChange.bind(this);
        this.onPrecioChange = this.onPrecioChange.bind(this);
        this.onSubmitAlta = this.onSubmitAlta.bind(this)
    }
    onNombreChange = (event) => {
        this.setState({nombre: event.target.value});
    }
    onDescripcionChange = (event) => {
        this.setState({descripcion: event.target.value});
    }
    onPrecioChange = (event) => {
        this.setState({precio: event.target.value});
    }

    onSubmitAlta(event){
        event.preventDefault();
        fetch('http://localhost/api/productos',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state,
                console.log(this.state)
            )
        })
        .then(() => this.props.onRouteChange('Inicio'));
    }

    render(){
        return(
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="alta" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Ingrese un producto</legend>
                            <div className="mt3">
                                <input
                                    onChange={this.onNombreChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.nombre}
                                    placeholder="Nombre"
                                    name="nombre"
                                    id="nombre" />
                            </div>
                            <div className="mt3">
                                <input
                                    onChange={this.onDescripcionChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.descripcion}
                                    placeholder="Descripcion"
                                    name="descripcion"
                                    id="descripcion" />
                            </div>
                            <div className="mt3">
                                <input
                                    onChange={this.onPrecioChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.precio}
                                    placeholder="Precio"
                                    name="precio"
                                    id="precio" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.onSubmitAlta}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Agregar" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Alta;