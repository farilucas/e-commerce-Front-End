import React from "react";
import { Button } from 'reactstrap';
import Pedidos from "../../Pedidos/Pedidos";



class MisPedidosAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            estado: '',
        }
        this.cambiarEstado = this.cambiarEstado.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    cambiarEstado(){
        fetch("http://localhost:8000/api/pedidos/1?estado=pago", {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(
                this.state
            )
        })
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/pedidos?usuario_username=tinchorin`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => res.json())
            .then(json =>
                this.setState({
                    pedidos: json,
                }))
    };

    async onBaja(id) {
        await fetch(`http://localhost:8000/api/pedidos/1/productos/` + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            }
        })
        
    }

    render() {
        let pedidos = this.state.pedidos.map(pedidos => {
            let pedidoData = { ...pedidos };
            return <Pedidos data={pedidoData} onBaja={this.onBaja} cambiarEstado={this.cambiarEstado} key={pedidos.id} onRouteChange={this.props.onRouteChange} />
        })
        console.log(pedidos);
        if (pedidos.length === 0) {
            return (
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
                                <div className="">
                                    <Button className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"} onClick={() => this.props.onRouteChange('Inicio')} >Volver al Inicio</Button>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            );
        }
        return (
            <div>
                {pedidos}
            </div>
        );
    }
}
export default MisPedidosAdmin;