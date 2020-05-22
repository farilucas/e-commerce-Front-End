import React from 'react';
import ProductosPanel from "../Lista Productos/Productos/ProductosPanel";

class PanelAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            admin: true,
            categoria: 'Todos',
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    onCategoriaSelect(event) {
        this.setState({ categoria: event.target.value });
    }

    async fetchData() {
        this.setState({ isFetching: true });

        let response = await fetch(`http://localhost:8000/api/productos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            },
        });

        if(response.status !== 200 && response.status !== 204) {
            return;
        }

        response = await response.json();

        this.setState({ productos: response });
    }

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('http://localhost:8000/api/productos/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
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

            return <ProductosPanel esAdmin={this.state.admin} data={productData} key={producto.id} onBaja={this.onBaja.bind(this)} onRouteChange={this.props.onRouteChange} />;
        });

        return (
            <div className="flex flex-column">
                <button className={"b ph3 pv2 input-reset ba b--black bg-transparent fr pointer w-20 self-end"} style={{ justifyContent: 'flex-end' }} onClick={() => this.props.onRouteChange('Alta')} >Dar de alta un producto</button>
                {productos}
            </div>
        )
    }
}
export default PanelAdmin;