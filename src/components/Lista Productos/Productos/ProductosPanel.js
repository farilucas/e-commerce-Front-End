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
          await fetch(`http://localhost:8000/api/usuarios/tinchorin/carrito`, {
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
                console.log(this.props.data.id, this.props.data.cantidad)
            )
        }).then(res => res.json())
        .then(json => this.setState({
            producto_id: json, cantidad: 10 
        }))
    }

    render() {
        const style = {
            borderColor: "black"
        }
        if(this.props.esAdmin === true){
            return (
                <Container className="table table-bordered table-sm table-light" style={style}>
                    <Row>
                        <Col>
                            <div className={"d-flex align-items-center py-1"}>
                                {this.props.data.id}
                                <Button onClick={this.onModificar} className={"ml-auto mr-2"} variant={"primary"} size={"sm"}><FontAwesomeIcon icon={faCog} /></Button>
                                <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                            </div>
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <td className="border" style={style}><b>Nombre</b></td>
                                        <td className="border" style={style}><b>Descripcion</b></td>
                                        <td className="border" style={style}><b>Precio</b></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border">
                                        <td className="border" style={style}>{this.props.data.nombre}</td>
                                        <td className="border" style={style}>{this.props.data.descripcion}</td>
                                        <td className="border" style={style}>${this.props.data.precio}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="3" className="border" style={style}>
                                            <button onClick={this.onDetalles} className="b pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Ver Detalles</button>
                                        </td>
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
                <Container className="table table-bordered table-sm table-light" style={style}>
                    <Row>
                        <Col>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <td className="border" style={style}><b>Nombre</b></td>
                                    <td className="border" style={style}><b>Descripcion</b></td>
                                    <td className="border" style={style}><b>Precio</b></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr className="border">
                                    <td className="border" style={style}>{this.props.data.nombre}</td>
                                    <td className="border" style={style}>{this.props.data.descripcion}</td>
                                    <td className="border" style={style}>${this.props.data.precio}</td>
                                </tr>
                                <tr className="border" style={style}>
                                    <td colSpan="3">
                                        <div className={'d-flex'}>
                                            <button onClick={this.agregarAlCarrito} className="b mr-3 pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Agregar al Carrito!</button>
                                            <button onClick={this.onDetalles} className="b ml-3 pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Ver Detalles</button>
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