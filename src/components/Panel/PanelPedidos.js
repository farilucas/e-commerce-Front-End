import React from 'react';
import ProductosPanel from "../Lista Productos/Productos/ProductosPanel";

class PanelAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
        }
    }

    componentDidMount() {
        this.fetchData();
    }
    
    async fetchData() {
        this.setState({ isFetching: true });
       await fetch(`http://`+ window.location.hostname +`:8000/api/pedido_producto`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        }).then(res => res.json())
            .then(json => this.setState({ productos: json }));
    };

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('http://'+ window.location.hostname +':8000/api/pedido_producto/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });

        this.fetchData();
    }

    render() {
        if (this.state.productos === 0) {
            return (
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
                                <div className="">
                                    <button className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"} onClick={() => this.props.onRouteChange('Alta')} >Dar de alta un producto</button>
                                </div>
                            </fieldset>
                        </div>
                    </main>
                </article>
            );
        }
        let productos = this.state.productos.map(producto => {
            let productData = { ...producto };

            return <ProductosPedido data={productData} key={producto.id} onBaja={this.onBaja.bind(this)}/>;
        })

        return (
            <div className="flex flex-column">
                {productos}
            </div>
        )
    }
}
export default PanelAdmin;