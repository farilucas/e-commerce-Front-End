import React from "react";
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

export default class PedidosUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            productos: [],
            todosProductos: [],
        };
        this.toggleModalOn = this.toggleModalOn.bind(this);
        this.toggleModalOff = this.toggleModalOff.bind(this);
    }

    componentDidMount() {
        this.fetchProductos();
    }

    async fetchProductos() {
        let json = await fetch(`http://localhost:8000/api/productos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            },
        }).then(res => res.json());
        this.setState({
            todosProductos: json
        });
    };

    toggleModalOn() {
        this.setState({
            open: true
        });
        this.fetchProductos();
    }

    toggleModalOff() {
        this.setState({
            open: false
        });
    }


    render() {
        const style = {
            borderColor: "black"
        }

        let total = this.props.data.productos.reduce((accumulator, current) => accumulator + current.precio * current.cantidad, 0);
        let productos = this.props.data.productos.map(producto => {
            
            return (
                <table className="table table-bordered table-sm" style={style}>
                    <thead>
                        <tr className="table-light">
                            <th scope="col" style={style}>Nombre</th>
                            <th scope="col" style={style}>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-light">
                            <td style={style}>{producto.nombre}</td>
                            <td style={style}>{producto.cantidad}</td>
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
                        <td style={style}>{this.props.data.estado}</td>
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
                                <ModalHeader closebutton>
                                        Detalles del Pedido
                                </ModalHeader>
                                <ModalBody>
                                    <ul>
                                        <div key={productos.id}>
                                            {productos}
                                        </div>
                                    </ul>
                                    <td><strong>Precio total:</strong> ${total}</td>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={this.toggleModalOff}>Close</Button>
                                </ModalFooter>
                            </Modal>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
        