import React from 'react';
import ProductosPanel from "../Lista Productos/Productos/ProductosPanel";

class Panel extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            productos: [],
            categoria: 'Todos'
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    onCategoriaSelect(event) {
        this.setState({categoria: event.target.value});
    }

    async fetchData() {
        this.setState({ isFetching: true });
        await fetch(`http://localhost:8000/api/productos`, {
            method: "get",
            headers: { 
                "Content-Type": "application/json",
            },
        }).then(res => res.json())
        .then(json => this.setState({productos: json}));
    };

    async onBaja(event, id) {
        event.preventDefault();
        await fetch('http://localhost:8000/api/productos/' + id, {
            method: 'delete',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTcyNDE1NCwiZXhwIjoxNTg5NzI3NzU0LCJuYmYiOjE1ODk3MjQxNTQsImp0aSI6IkNvalh3ekZ2dnJYYzR4ZUUiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.ilro50UFbE3lFR1x098OCLTvgMot7-_grefswmhfUqY'
            },
        });
    }

    render() {
        if (this.state.productos.length === 0 && !this.state.isFetching && this.props.isSignedIn === true && this.props.esAdmin === true) {
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
        else if (this.state.productos.length === 0 && !this.state.isFetching) {
            return (
                <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
                            </fieldset>
                        </div>
                    </main>
                </article>
            );
        }

        let productos = this.state.productos.map(producto => {
            let productData = { ...producto };

            return <ProductosPanel data={productData} key={producto.id} onBaja={this.onBaja.bind(this)} onRouteChange={this.props.onRouteChange} />;
        })

        return(
            <div className="">
                {productos}
            </div>
        )
    }
} 
export default Panel;