import React from 'react';
import ProductosPanel from "../Lista Productos/Productos/ProductosPanel";

class PanelAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: [],
            admin: true,
            categoria: 'Todos',
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTk3NzQ5MywiZXhwIjoxNTg5OTgxMDkzLCJuYmYiOjE1ODk5Nzc0OTMsImp0aSI6InJUOG10TGd3NG41elEzdGEiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.a1Wt7k8J69V78-YBS-Iohrv9h1Cz4djhxe1aKAMKeMo',
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
        await fetch(`http://localhost:8000/api/productos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.state.token,
            },
        }).then(res => res.json())
            .then(json => this.setState({ productos: json }));
    };

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('http://localhost:8000/api/productos/' + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.state.token,},
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
        })

        return (
            <div className="flex flex-column">
                <button className={"b ph3 pv2 input-reset ba b--black bg-transparent fr pointer w-20 self-end"} style={{ justifyContent: 'flex-end' }} onClick={() => this.props.onRouteChange('Alta')} >Dar de alta un producto</button>
                {productos}
            </div>
        )
    }
}
export default PanelAdmin;