import React from "react";
import ProductosCarrito from "../Productos/ProductosCarrito";



class Carrito extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: []
        }
        this.onSubmitCarrito = this.onSubmitCarrito.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }

    onSubmitCarrito(event) {
        event.preventDefault();
        fetch('http://localhost/api/productos', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                this.state
            )
        })
            .then(() => this.props.onRouteChange('Inicio'));
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/usuarios/tinchorin/carrito`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTcyNDE1NCwiZXhwIjoxNTg5NzI3NzU0LCJuYmYiOjE1ODk3MjQxNTQsImp0aSI6IkNvalh3ekZ2dnJYYzR4ZUUiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.ilro50UFbE3lFR1x098OCLTvgMot7-_grefswmhfUqY'
            },
        }).then(res => res.json())
            .then(json => this.setState({ productos: json }));
    };

    render() {
        let productos = this.state.productos.map(productos => {
        let productData = { ...productos };
            return <ProductosCarrito data={productData} key={productos.id} onRouteChange={this.props.onRouteChange} />;
        })
        // if (productos.length === 0) {
        //     return (
        //         <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        //             <main className="pa4 black-80">
        //                 <div className="measure ">
        //                     <fieldset className="ba b--transparent ph0 mh0">
        //                         <legend className="f1 fw6 ph0 mh0">No hay datos registrados en el sistema.</legend>
        //                         <div className="">
        //                             <Button className={"b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"} onClick={() => this.props.onRouteChange('Inicio')} >Volver al Inicio</Button>
        //                         </div>
        //                     </fieldset>
        //                 </div>
        //             </main>
        //         </article>
        //     );
        // }
        return (
            <div>
                <button onClick={this.onSubmitCarrito} className="b pv2 ba b--black bg-orange pointer f6 fr w-100" style={{justifyContent: 'flex-end'}}>Finalizar Compra</button>
                {productos}
            </div>
        );
    }
}
export default Carrito;