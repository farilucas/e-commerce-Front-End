import React from "react";

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
        const style = {
            borderColor: "black"        
        }
        return(
            // <Card bg={"white"}>
            //     <Card.Body>
            //         <Container>
            //             <Row className={"table table-bordered"}>
            //                 <Col><p className="h3 table table-bordered">Nombre: </p><br/><p className="h3">{this.props.data.nombre}</p></Col>
            //                 <Col><Field label={"Descripcion"}>{this.props.data.descripcion}</Field></Col>
            //                 <Col><Field label={"Precio"}>{this.props.data.precio}</Field></Col>
            //                 <Col><Field label={"Cantidad"}>{this.props.data.cantidad}</Field></Col>
            //             </Row>
            //         </Container>
            //     </Card.Body>
            //     <Card.Footer className={"d-flex"}>
            //         <Button onClick={this.onDetalles} className="pa2 w-100">Ver Detalles</Button>
            //     </Card.Footer>
            // </Card>
            
            //<div className="table-responsive">
                <table class="table table-bordered table-sm" style={style}>
                    <thead>
                        <tr className="table-light">
                            <th scope="col" style={style}>Nombre</th>
                            <th scope="col" style={style}>Descripcion</th>
                            <th scope="col" style={style}>Precio</th>
                            <th scope="col" style={style}>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-light">
                            <td style={style}>{this.props.data.nombre}</td>
                            <td style={style}>{this.props.data.descripcion}</td>
                            <td style={style}>${this.props.data.precio}</td>
                            <td style={style}>{this.props.data.cantidad}</td>
                        </tr>
                        <tr className="table-light">
                            <td colSpan="4"><button onClick={this.onDetalles} className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100">Ver Detalles</button></td>
                        </tr>
                    </tbody>
                </table>
            //</div>
        );
    }
}
export default Productos;