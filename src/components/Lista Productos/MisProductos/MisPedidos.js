import React from "react";
import Pedidos from "../../Pedidos/Pedidos";



class MisPedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MDA2MTIzMCwiZXhwIjoxNTkwMDY0ODMwLCJuYmYiOjE1OTAwNjEyMzAsImp0aSI6IkpRZ3I1UW5EUW5yTXM4ekgiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.QS4BbhqOtftimCS7RgfwWuvfLIQbiWroxYOxz4aIeaQ'
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/pedidos?usuario_username=tinchorin`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.state.token
            },
        }).then(res => res.json())
            .then(json =>
                this.setState({
                    pedidos: json,
                }))
                .then(console.log(this.state.pedidos));
    };
  
    render() {
        let pedidos = this.state.pedidos.map(pedidos => {
            let pedidosData = { ...pedidos };
            return <Pedidos data={pedidosData} key={pedidos.id} />;
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
export default MisPedidos;