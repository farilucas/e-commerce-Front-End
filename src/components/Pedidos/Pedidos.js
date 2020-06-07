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
            todosProductos: [],
            selectedProducto: 1,
            selectedEstado: []
        };

        this.onBaja = this.onBaja.bind(this);
        this.cambiarEstado = this.cambiarEstado.bind(this);
        this.onEstadoChange= this.onEstadoChange.bind(this);
        this.toggleModalOn = this.toggleModalOn.bind(this);
        this.toggleModalOff = this.toggleModalOff.bind(this);
        this.cambiarCantidad = this.cambiarCantidad.bind(this);   
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onSubmitProducto = this.onSubmitProducto.bind(this);
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
        this.setState({todosProductos: json});
    };

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
        this.fetchProductos();
    }

    toggleModalOff() {
        this.setState({ open: false });
    }

    onBaja(id) {
        this.props.onBaja(id);
    }

    cambiarEstado(e){
        this.setState({selectedEstado: e.target.value})
    }

    onEstadoChange(event) {
        event.preventDefault();
        fetch(`http://localhost:8000/api/pedidos/${this.props.data.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                estado: this.state.selectedEstado
            })
        }).catch((e) => console.log(e));
    }

    onSubmitProducto(event) {
        event.preventDefault();
        fetch(`http://localhost:8000/api/pedidos/${this.props.pedidos.id}/productos`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.selectedProducto
            })
        }).catch((e) => console.log(e));
    }

    cambiarCantidad(producto_id,cantidad) {
        alert(producto_id)
        alert(cantidad)
        alert(this.props.data.id)
        fetch(`http://localhost:8000/api/pedidos/${this.props.data.id}/productos/${producto_id}?cantidad=${cantidad}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${localStorage.getItem('token')}`
            },
        })
    }

    onSelectChange(e) {
        this.setState({selectedProducto: e.target.value})
    }

    render() {
        const style = {
            borderColor: "black"
        }
        let total = this.props.data.productos.reduce((accumulator, current) => accumulator + current.precio * current.cantidad, 0);
        let productos = this.props.data.productos.map(producto => {
            return (
                <table className="table table-bordered table-sm" style={style} key={producto.id}>
                    <thead>
                        <tr className="table-light">
                            <th scope="col" style={style}>Nombre</th>
                            <th scope="col" style={style}>Cantidad</th>
                            <th scope="col" style={style}><Button color={"danger"} className="center" size={"sm"} onClick={() => this.onBaja(producto.id)}><FontAwesomeIcon icon={faTrash} /></Button></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-light">
                            <td style={style}>{producto.nombre}</td>
                            <td style={style}><input type="number" pattern="[0-9]" onChange={this.handleInputChange} name="cantidad" id={"p"+ producto.id} placeholder={producto.cantidad}/></td>
                            <td style={style}><Button onClick={() => this.cambiarCantidad(producto.id,document.getElementById("p" + producto.id).value)} value={producto.cantidad} color={"success"} className="center" size={"sm"}><FontAwesomeIcon icon={faCheckSquare} /></Button></td>
                        </tr>
                    </tbody>
                </table>
            );
        });

        let options = this.state.todosProductos.map(producto => <option value={producto.id} key={producto.id}>{producto.nombre}</option>);
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
                            <form>
                                <select value={this.state.selectedEstado} onChange={this.cambiarEstado}>
                                    <option value={this.props.data.estado}>{this.props.data.estado}</option>
                                    <option value="pago">Pago</option>
                                    <option value="entregado">Entregado</option>
                                </select>
                            </form>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <td colSpan="4">
                            <button onClick={this.onEstadoChange} className="b pv2 input-reset ba b--black bg-transparent pointer f6 dib w-100">Cambiar estado</button>
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
                                <ModalHeader closebutton>
                                        Detalles del Pedido
                                </ModalHeader>
                                <ModalBody>
                                    <h4>Opciones</h4>
                                    <p>
                                        <select onChange={this.onSelectChange} value={this.state.selectedProducto}>
                                            {options}
                                        </select>
                                        <Button size={"sm"} className={"ml-auto mr-2"} onClick={this.onSubmitProducto}><FontAwesomeIcon icon={faPlus} /></Button>
                                    </p>
                                    <ul>
                                        <div>
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
export default Pedidos;