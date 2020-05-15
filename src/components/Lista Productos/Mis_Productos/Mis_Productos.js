import React from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Productos from "../Productos/Productos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";



class Mis_Productos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: []
        }
    }

    render() {
        let productos = this.state.productos.map(productos => {
        let productData = { ...productos };
            return <Productos data={productData} key={productos.id} onRouteChange={this.props.onRouteChange} />;
        })
        if (this.state.productos.length === 0) {
            return (
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
                                <div className="">
                                    <Button className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"} onClick={() => this.props.onRouteChange('Inicio')} >Volver al Inicio</Button>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            );
        }
        return (
            <div onRouteChange={this.onRouteChange('Productos', this.productos.id)}>
                {productos}
            </div>
        );
    }
}
export default Mis_Productos;