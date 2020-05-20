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
        this.state = {
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTk4MzU4NSwiZXhwIjoxNTg5OTg3MTg1LCJuYmYiOjE1ODk5ODM1ODUsImp0aSI6IkloQVhQNWJCOUJjbm1CR00iLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.8NQOSK7fvvWadLHq9RMyV0Z3A1pTYl43OSeN317dO0o'
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
          await fetch(`http://localhost:8000/api/usuarios/tinchorin/carrito`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.state.token,
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
                    <div className={"d-flex align-items-center"}>
                        {this.props.data.id}
                        <Button onClick={this.onModificar} className={"ml-auto mr-2"} variant={"primary"} size={"sm"}><FontAwesomeIcon icon={faCog} /></Button>
                        <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                    <table className="table table-sm">
                        <thead>
                            <Row className="table-light">
                                <Col className="border" style={style}><b>Nombre</b></Col>
                                <Col className="border" style={style}><b>Descripcion</b></Col>
                                <Col className="border" style={style}><b>Precio</b></Col>
                            </Row>
                        </thead>
                        <tbody>
                            <Row className="table-light">
                                <Col className="border" style={style}>{this.props.data.nombre}</Col>
                                <Col className="border" style={style}>{this.props.data.descripcion}</Col>
                                <Col className="border" style={style}>${this.props.data.precio}</Col>
                            </Row>
                            <Row className="table-light">
                                <Col colSpan="4"><button onClick={this.onDetalles} className="b pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Ver Detalles</button></Col>
                            </Row>
                        </tbody>
                    </table>
                </Container>
            );
        }
        else{
            return(
                <Container>
                    <table className="table table-sm">
                        <thead>
                            <Row className="table-light">
                                <Col className="border" style={style}><b>Nombre</b></Col>
                                <Col className="border" style={style}><b>Descripcion</b></Col>
                                <Col className="border" style={style}><b>Precio</b></Col>
                            </Row>
                        </thead>
                        <tbody>
                            <Row className="table-light">
                                <Col className="border" style={style}>{this.props.data.nombre}</Col>
                                <Col className="border" style={style}>{this.props.data.descripcion}</Col>
                                <Col className="border" style={style}>${this.props.data.precio}</Col>
                            </Row>
                            <Row className="table-light">
                                <Col colSpan="4"><button onClick={this.agregarAlCarrito} className="b pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Agregar al Carrito!</button></Col>
                                <Col colSpan="4"><button onClick={this.onDetalles} className="b pv2 input-reset mt3 ba b--black hover-bg-lightest-blue pointer w-100">Ver Detalles</button></Col>
                            </Row>
                        </tbody>
                    </table>
                </Container >
            );
        }
    }
}
export default ProductosPanel;