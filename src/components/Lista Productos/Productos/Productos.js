import React from "react";
import Card from "react-bootstrap/Card"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Field extends React.PureComponent {
    render() {
        return (
            <div className={"br3 ba bg-light-blue"}>
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
            // <div>
            //     <div className="">
            //         <div className="ba bg-white">
            //             <legend className="">Nombre: {this.props.data.nombre}</legend>                                
            //         </div>
            //         <div className="ba bg-white">
            //             <legend className="">Descripcion: {this.props.data.descripcion}</legend>
            //         </div>

            //         <div className="ba bg-white">
            //             <legend className="">Precio: {this.props.data.precio}</legend>
            //         </div>
            //         <div className="ba bg-white">
            //             <legend className="">Cantidad: {this.props.data.cantidad}</legend>
            //         </div>
            //     </div>
            // </div>
            <Card bg={"white"}>
                <Card.Body>
                    <Container>
                        <Row>
                            {/* <Col><Field label={"Nombre"}>{this.props.data.nombre}</Field></Col>
                            <Col><Field label={"Descripcion"}>{this.props.data.descripcion}</Field></Col>
                            <Col><Field label={"Precio"}>{this.props.data.precio}</Field></Col>
                            <Col><Field label={"Cantidad"}>{this.props.data.cantidad}</Field></Col> */}
                            <Col><div style={{width: 100, height: 50, backgroundColor: "blue"}}></div></Col>
                            <Col><div style={{ width: 100, height: 50, backgroundColor: "blue" }}></div></Col>
                            <Col><div style={{ width: 100, height: 50, backgroundColor: "green" }}></div></Col>
                            <Col><div style={{ width: 100, height: 50, backgroundColor: "blue" }}></div></Col>
                        </Row>
                    </Container>
                </Card.Body>
                <Card.Footer className={"d-flex"}>
                    <Button onClick={this.onDetalles} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100">Ver Detalles</Button>
                </Card.Footer>
            </Card>   
        );
    }
}
export default Productos;