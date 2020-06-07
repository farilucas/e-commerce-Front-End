import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

class ProductosPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            cantidad: 1
        }
        this.onModificar = this.onModificar.bind(this);
        this.onBaja = this.onBaja.bind(this);
        this.agregarAlCarrito = this.agregarAlCarrito.bind(this);
        this.onDetalles = this.onDetalles.bind(this);
    }

    onModificar() {
        this.props.onRouteChange('Modificar', this.props.data.id);
    }

    onBaja(e) {
        this.props.onBaja(e, this.props.data.id);
    }

    onDetalles() {
        this.props.onRouteChange('Detalles', this.props.data.id);
    }

    async agregarAlCarrito(event, id){
        event.preventDefault();
        let response = await fetch(`http://localhost:8000/api/usuarios/carrito`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(
                [{
                    producto_id: this.props.data.id,
                    cantidad: 0
                }],
                this.state.cantidad,
            )
        }).then(res => res.json())
        .then(json => this.setState({
            producto_id: json, cantidad: 10 
        }))

         if (response.status !== 200 && response.status !== 204) {
             return alert('Debe registrarse para realizar esta accion.');
         }

    }

    render() {
        let boton = localStorage.getItem('token') === null ? "" : <button onClick = {this.agregarAlCarrito} className = "b mr-3 pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100" > Agregar al Carrito! </button> 
        if (localStorage.getItem('admin') === '1'){
            return (
                <Container className="table table-bordered table-sm bg-moon-gray b--black ">
                    <Row className="b--black">
                        <Col className="b--black">
                            <div className={"d-flex align-items-center py-1"}>
                                {this.props.data.id}
                                <Button onClick={this.onModificar} className={"ml-auto mr-2"} variant={"primary"} size={"sm"}><FontAwesomeIcon icon={faCog} /></Button>
                                <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                            </div>
                            <table className="table table-sm b--black">
                                <thead className="b--black">
                                    <tr className="b--black">
                                        <td className="border b--black"><b>Nombre</b></td>
                                        <td className="border b--black" ><b>Descripcion</b></td>
                                        <td className="border b--black"><b>Precio</b></td>
                                    </tr>
                                </thead>
                                <tbody className="b--black">
                                    <tr className="border b--black">
                                        <td className="border b--black">{this.props.data.nombre}</td>
                                        <td className="border b--black">{this.props.data.descripcion}</td>
                                        <td className="border b--black">${this.props.data.precio}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else{
            return(
                <Container className="table table-bordered table-sm b--black">
                    <Row>
                        <Col>
                            <table className="table table-sm b--black">
                                <thead>
                                <tr>
                                    <td className="border b--black"><b>Nombre</b></td>
                                    <td className="border b--black"><b>Descripcion</b></td>
                                    <td className="border b--black"><b>Precio</b></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border b--black">
                                    <td className="border b--black">{this.props.data.nombre}</td>
                                    <td className="border b--black">{this.props.data.descripcion}</td>
                                    <td className="border b--black">${this.props.data.precio}</td>
                                </tr>
                                <tr className="border b--black">
                                    <td colSpan="3">
                                        <div className={'d-flex'}>
                                            {boton}
                                        </div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container >
            );
        }
    }
}
export default ProductosPanel;