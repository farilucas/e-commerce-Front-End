import React from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

class Field extends React.PureComponent {
    render() {
        return (
            <div className={"br3 ba bg-silver b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"}>
                <label className={"f1 fw6 ph0 mh0"}>
                    <b>{this.props.label}</b>
                    <p className={"f6 link dim black db"}>{this.props.children}</p>
                </label>
            </div>
        );
    }
}

class Productos extends React.Component{
    constructor(props) {
        super(props);
        this.onModificar = this.onModificar.bind(this);
        this.onBaja = this.onBaja.bind(this);
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

    render() {
        return(
            <div>
                <div bg={"light"} style={{ maxWidth: 600 }}>
                    <div>
                        <div className={"d-flex align-items-center"}>
                            {this.props.data.id}
                            <Button onClick={this.onModificar} className={"ml-auto mr-2"} variant={"primary"} size={"sm"}><FontAwesomeIcon icon={faCog} /></Button>
                            <Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                    </div>
                    <div>
                        <Container>
                            <Row>
                                <Col><Field >{this.props.data.nombre}</Field></Col>
                                <Col><Field >{this.props.data.descripcion}</Field></Col>
                            </Row>
                            <Row>
                                <Col><Field >{this.props.data.precio}</Field></Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>   
        );
    }
}
export default Productos;