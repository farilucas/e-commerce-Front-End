import React from 'react';
import Productos from "../Productos/Productos";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            productos: [],
            categoria: 'Todos'
        }
    }

    onCategoriaSelect(event) {
        this.setState({categoria: event.target.value});
    }

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('insert path here' + id, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        });
    }

    render() {
        if (this.state.productos.length === 0 && !this.state.isFetching) {
            return (
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
                                <div className="">
                                    <Button className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"} onClick={() => this.props.onRouteChange('Alta')} >Dar de alta un producto</Button>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            );
        }
    }
} 
export default Panel;