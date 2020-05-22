import React from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons/faCheckSquare";

class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            productos: [],
        }
        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.toggleModalOn = this.toggleModalOn.bind(this);
        this.toggleModalOff = this.toggleModalOff.bind(this);
        this.cambiarCantidad = this.cambiarCantidad.bind(this);
        this.onBaja = this.onBaja.bind(this);
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

    toggleModalOn(){
        this.setState({open: true});
    }

    toggleModalOff() {
        this.setState({ open: false });
    }

    onBaja(e, id) {
        this.props.onBaja(e, id);
    }

    cambiarEstado(){
        this.props.cambiarEstado(this.props.data.id);
    }

    cambiarCantidad() {
        fetch(`http://localhost:8000/api/pedidos/1/productos/3?cantidad=15`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MDEwODQ1NywiZXhwIjoxNTkwMTEyMDU3LCJuYmYiOjE1OTAxMDg0NTcsImp0aSI6IlIxSm9kS3J1bWNiMmxTWWkiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.ksR5_esuEEF8lPfNflLNItXDEK2Ke5weLJYEZJDUk10'
            },
        })
    }

    render() {
        const style = {
            borderColor: "black"
        }
        let productos = this.props.data.productos.map(producto => {
            return (
                <table className="table table-bordered table-sm" style={style}>
                    <thead>
                        <tr className="table-light">
                            <th scope="col" style={style}>Nombre</th>
                            <th scope="col" style={style}>Cantidad</th>
                            <th scope="col" style={style}><Button color={"danger"} className="center" size={"sm"} onClick={(e) => this.onBaja(e, producto.id)}><FontAwesomeIcon icon={faTrash} /></Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-light">
                            <td style={style}>{producto.nombre}</td>
                            <td style={style}><input type="number" pattern="[0-9]" onChange={this.handleInputChange} name="cantidad" id="cantidad" placeholder={producto.cantidad}></input></td>
                            <td style={style}><Button onClick={this.cambiarCantidad} value={producto.cantidad} color={"success"} className="center" size={"sm"}><FontAwesomeIcon icon={faCheckSquare} /></Button></td>
                        </tr>
                    </tbody>
                </table>
            );
        });
        return (
            <table className="table table-bordered table-sm" style={style}>
                <thead>
                    <tr className="table-light">
                        <th scope="col" style={style}>Id</th>
                        <th scope="col" style={style}>Usuario</th>
                        <th scope="col" style={style}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-light">
                        <td style={style}>{this.props.data.id}</td>
                        <td style={style}>{this.props.data.usuario_username}</td>
                        <td style={style}>
                            <select>
                                <option>Confirmado</option>
                                <option>Pago</option>
                                <option>Entregado</option>
                            </select>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <td colSpan="4">
                            <button onClick={this.cambiarEstado} className="b pv2 input-reset ba b--black bg-transparent pointer f6 dib w-100">Cambiar estado</button>
                        </td>
                    </tr>
                    <tr className="table-light">
                        
                        <td colSpan="4">
                            <button onClick={this.toggleModalOn} className="b pv2 input-reset ba b--black bg-transparent pointer f6 dib w-100">Ver Detalles</button>
                            <Modal
                                isOpen={this.state.open}
                                size="lg"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                            >
                                <ModalHeader closeButton>
                                        Detalles del Pedido
                                </ModalHeader>
                                <ModalBody>
                                    <h4>Opciones</h4>
                                    <p>
                                        <Button size={"sm"} className={"ml-auto mr-2"}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </p>
                                    <ul>
                                        <div>
                                            {productos}
                                        </div>
                                    </ul>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.toggleModalOff}>Close</Button>
                                </ModalFooter>
                            </Modal>
                            {/* <VerDetalles
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            /> */}
                        </td>
                    </tr>
                </tbody>
            </table>
            //</div>
        );
    }
}
export default Pedidos;