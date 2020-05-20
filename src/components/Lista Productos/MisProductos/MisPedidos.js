import React from "react";
import ProductosCarrito from "../Productos/ProductosCarrito";



class MisPedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productos: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/usuarios/tinchorin/pedidos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTgxMTczMiwiZXhwIjoxNTg5ODE1MzMyLCJuYmYiOjE1ODk4MTE3MzIsImp0aSI6IlpyMjY5Y0xhREtQbEo4OFoiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.xXCh624y5027YwnXxBt31AGNiPRGLYaf-chTtUNaGWo'
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
                {productos}
            </div>
        );
    }
}
export default MisPedidos;