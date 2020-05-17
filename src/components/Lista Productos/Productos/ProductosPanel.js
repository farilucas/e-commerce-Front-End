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
        const style = {
            borderColor: "black"
        }
        if(this.props.esAdmin === true){
            return (
                // <Card bg={"white"} style={{ maxWidth: 600, maxHeight: 100 }}>
                //     <Card.Body>
                //         <Container>
                //             <Row classNamme="text-center">
                //                 <Col className="border text-center" style={style}>
                //                     <Row className="border border-right-0" style={style}>
                //                         <b className="text-center">Nombre</b> 
                //                     </Row>
                //                     <Row className="">
                //                         <b>{this.props.data.nombre}</b>
                //                     </Row>
                //                 </Col>
                //                 <Col className="border" style={style}>
                //                     <Row className="border border-right-0" style={style}>
                //                         <b>Descripcion</b>
                //                     </Row>
                //                     <Row>
                //                         <b>{this.props.data.descripcion}</b>
                //                     </Row>
                //                 </Col>
                //                 <Col className="border" style={style}>
                //                     <Row className="border border-left-0 border-right-0" style={style}>
                //                         <b>Precio</b>
                //                     </Row>
                //                     <Row>
                //                         <b>{this.props.data.precio}</b>
                //                     </Row>
                //                 </Col>
                //                 <Col>
                //                     <Button onClick={this.onDetalles} className="w-100">Ver Detalles</Button>
                //                 </Col>
                //             </Row>                       
                //         </Container>
                //     </Card.Body>
                // </Card>

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