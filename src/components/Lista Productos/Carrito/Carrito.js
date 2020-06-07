import React from "react";
import ProductosCarrito from "../Productos/ProductosCarrito";
import Button from "react-bootstrap/Button";


class Carrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            estado: '',
        }
        this.onSubmitEstado = this.onSubmitEstado.bind(this)
        this.fetchData = this.fetchData.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }

    onSubmitEstado(event) {
        event.preventDefault();
        fetch(`http://localhost:8000/api/usuarios/carrito/pagar`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer  ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(
                this.state
            )
        })
            .then(() => this.props.onRouteChange('Inicio'));
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/usuarios/carrito`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => res.json())
            .then(json => 
                this.setState({ 
                    productos: json,
                    estado: 'carrito'
                }))
    };

    async onBaja(event, id) {
        event.preventDefault();
        await fetch(`http://localhost:8000/api/usuarios/carrito/` + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(this.state.fetchData())
        
    }

    render() {
        let productos = this.state.productos.map(productos => {
        let productData = { ...productos };
            return <ProductosCarrito data={productData} key={productos.id} onBaja={this.onBaja} onRouteChange={this.props.onRouteChange} />;
        })
        if (productos.length === 0) {
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
                <button onClick={this.onSubmitEstado} onRouteChange={() => this.props.onRouteChange('Inicio')} className="b pv2 ba b--black bg-transparent hover-bg-orenge pointer f6 fr w-100" style={{justifyContent: 'flex-end'}}>Finalizar Compra</button>
                {productos}
            </div>
        );
    }
}
export default Carrito;