import React from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

class Productos extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            cantidad: 0
        }
        this.onModificar = this.onModificar.bind(this);
        this.onBaja = this.onBaja.bind(this);
        this.onDetalles = this.onDetalles.bind(this);
        this.cambiarCantidad = this.cambiarCantidad.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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

    cambiarCantidad() {
        fetch(`http://localhost:8000/api/usuarios/tinchorin/carrito`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTk3OTA1NywiZXhwIjoxNTg5OTgyNjU3LCJuYmYiOjE1ODk5NzkwNTcsImp0aSI6IlhKNDRVYW5aMkJrdldpeE8iLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.ECydHumpfR8FC0xsv0DMl6RJSM0pdgeST852VZ6gg50'
            },
            body: JSON.stringify(
                {
                    producto_id: this.props.data.id,
                    cantidad: this.state.cantidad,
                },
                console.log(this.props.data.id, this.state.cantidad)
            )
        }).then(json => this.setState({
            cantidad: json
        }))

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
            
            <table className="table table-bordered table-sm" style={style}>
                <thead>
                    <tr className="table-light">
                        <th scope="col" style={style}>Nombre</th>
                        <th scope="col" style={style}>Descripcion</th>
                        <th scope="col" style={style}>Precio</th>
                        <th scope="col" style={style}>Cantidad</th>
                        <th scope="col" style={style}><Button variant={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-light">
                        <td style={style}>{this.props.data.nombre}</td>
                        <td style={style}>{this.props.data.descripcion}</td>
                        <td style={style}>${this.props.data.precio}</td>
                        <td style={style}><input type="number" pattern="[0-9]" onChange={this.handleInputChange} name="cantidad" id="cantidad" placeholder={this.props.data.cantidad}></input></td>
                    </tr>
                    <tr className="table-light">
                        <td colSpan="4"><button onClick={this.cambiarCantidad} value={this.state.cantidad} className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100">Confirmar Cantidad</button></td>
                    </tr>
                    <tr className="table-light">
                        <td colSpan="4"><button onClick={this.onDetalles} className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100">Ver Detalles</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default Productos;