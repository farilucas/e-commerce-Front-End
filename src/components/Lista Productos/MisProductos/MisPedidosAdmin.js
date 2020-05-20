import React from "react";
import Pedidos from "../../Pedidos/Pedidos";



class MisPedidosAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            estado: 'carrito'
        }
        this.setEstado = this.setEstado.bind(this);
    }

    setEstado(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        this.fetchData();
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/pedidos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTkxMTkxNiwiZXhwIjoxNTg5OTE1NTE2LCJuYmYiOjE1ODk5MTE5MTYsImp0aSI6IkVNTHFCUGhiWTFjVkNmQjciLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.nT1a_QuGhwsF_Hrb7ec-jEvTePujelMzjoo_CAQGz6A'
            },
        }).then(res => res.json())
            .then(json => this.setState({ pedidos: json }));
    };

    render() {
        let pedidos = this.state.pedidos.map(pedidos => {
            let pedidoData = { ...pedidos };
            return <Pedidos data={pedidoData} key={pedidos.id} onRouteChange={this.props.onRouteChange} />;
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
                {pedidos}
            </div>
        );
    }
}
export default MisPedidosAdmin;