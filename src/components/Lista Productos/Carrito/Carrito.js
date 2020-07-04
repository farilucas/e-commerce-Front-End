import React from "react";
import { Circular } from 'styled-loaders-react';
import ProductosCarrito from "../Productos/ProductosCarrito";
import Button from "react-bootstrap/Button";


class Carrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            estado: '',
            isLoading: false
        }
        this.onSubmitEstado = this.onSubmitEstado.bind(this)
    }

    componentDidMount() {
        this.setState({isLoading: true})
        this.fetchData();
    }

    onSubmitEstado(event) {
        event.preventDefault();
        fetch(`http://`+ window.location.hostname +`:8000/api/usuarios/carrito/pagar`, {
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

        await fetch(`http://`+ window.location.hostname +`:8000/api/usuarios/carrito`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => res.json())
            .then(json => 
                this.setState({ 
                    productos: json,
                    estado: 'carrito',
                    isLoading: false
                }))
    };

    async onBaja(event, id) {
        event.preventDefault();
        await fetch(`http://`+ window.location.hostname +`:8000/api/usuarios/carrito/` + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        this.fetchData();        
    }

    render() {
        let productos = this.state.productos.map(productos => {
        let productData = { ...productos };
            return <ProductosCarrito data={productData} key={productos.id} onBaja={this.onBaja.bind(this)} onRouteChange={this.props.onRouteChange} />;
        })

        if(productos.lenght !== 0){
            return (
                <div>
                    {
                    this.state.isLoading ? <h1 className='moon-gray' style={{ marginTop: '15%' }}> Cargando datos <Circular color='white' /></h1>
                    :<div>
                        <button onClick={this.onSubmitEstado} onRouteChange={() => this.props.onRouteChange('Inicio')} className="b pv2 ba b--black hover-bg-orange pointer f6 fr w-100" style={{justifyContent: 'flex-end'}}>Finalizar Compra</button>
                        {productos}
                    </div>
                    }
                </div>
            );
        }
        else{
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
    }
}
export default Carrito;