import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

class ProductosPedido extends React.Component {
    constructor(props) {
        super(props);
        this.onBaja = this.onBaja.bind(this);
    }
    onBaja(e) {
        this.props.onBaja(e, this.props.data.id);
    }

    render() {
        const style = {
            borderColor: "black"
        }
        return (
            <Container className="table table-bordered table-sm table-light" style={style}>
                <div className={"d-flex align-items-center"}>
                    {this.props.data.id}
                    <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                </div>
                <table className="table table-sm">
                    <thead>
                        <Row className="table-light">
                            <Col className="border" style={style}><b>Nombre</b></Col>
                            <Col className="border" style={style}><b>Descripcion</b></Col>
                            <Col className="border" style={style}><b>Precio</b></Col>
                            <Col className="border" style={style}><b>Cantidad</b></Col>
                        </Row>
                    </thead>
                    <tbody>
                        <Row className="table-light">
                            <Col className="border" style={style}>{this.props.data.nombre}</Col>
                            <Col className="border" style={style}>{this.props.data.descripcion}</Col>
                            <Col className="border" style={style}>${this.props.data.precio}</Col>
                            <Col className="border" style={style}>${this.props.data.cantidad}</Col>
                        </Row>
                    </tbody>
                </table>
            </Container>
        );
    }
}
export default ProductosPedido;