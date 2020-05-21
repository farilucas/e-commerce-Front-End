import React from "react";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons/faPlus";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";


class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.toggleModalOn = this.toggleModalOn.bind(this);
        this.toggleModalOff = this.toggleModalOff.bind(this);
    }

    toggleModalOn(){
        this.setState({open: true});
    }

    toggleModalOff() {
        this.setState({ open: false });
    }

    cambiarEstado(){
        this.props.cambiarEstado(this.props.data.id);
    }

    render() {
        const style = {
            borderColor: "black"
        }
        let usuarios = usuarios.flatMap(usuario => usuario.productos.flatMap(producto => producto.nombre));
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
                                        <Button size={"sm"} className={"ml-auto mr-2"} onClick={this.onBaja}><FontAwesomeIcon icon={faPlus} /></Button>
                                        <Button color={"danger"} size={"sm"} onClick={this.onBaja}><FontAwesomeIcon icon={faTrash} /></Button>
                                    </p>
                                    <ul>
                                        <li>{usuarios}</li>
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