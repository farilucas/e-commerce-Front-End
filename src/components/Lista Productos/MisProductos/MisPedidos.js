import React from "react";
import Pedidos from "../../Pedidos/Pedidos";



class MisPedidos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MDAyMjM1MSwiZXhwIjoxNTkwMDI1OTUxLCJuYmYiOjE1OTAwMjIzNTEsImp0aSI6InpFV043cm5pQWcxMks2RkoiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.O-Uy11c7U0PQLE2zMv1kxC-GLCxuprIKXTT35V29yD4'
        }
    }

    componentDidMount() {
        this.fetchData()
        //  fetch('http://localhost:8000/api/pedidos')
        //  .then(res => res.json())
        //  .then(data => this.setState({ pedidos: data.pedidos}))
    }

    // async fetchData() {
    //     await fetch(`http://localhost:8000/api/pedidos`, {
    //         method: "get",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU5MDAyMzM2NiwiZXhwIjoxNTkwMDI2OTY2LCJuYmYiOjE1OTAwMjMzNjYsImp0aSI6IlhPWG9lS3l2N1o1ck9jOUYiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.Qr1_Do5_kTG9b28t0m7Tv_zwxw0G3r3KUtPNOZhXqK0'
    //         },
    //     }).then(res => res.json())
    //         .then(data => this.setState({ pedidos: data.pedidos }))
    // };

    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://localhost:8000/api/usuarios/tinchorin/carrito`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + this.state.token
            },
        }).then(res => res.json())
            .then(json =>
                this.setState({
                    pedidos: json,
                })
                );
    };
  
    render() {
        // const {pedidos} = this.state;
        let pedidos = this.state.pedidos.map(pedidos => {
            let pedidosData = { ...pedidos };
            return <Pedidos data={pedidosData} key={pedidos.id} />;
        })
        // const style = {
        //     borderColor: "black"
        // }
        // return (
        //     <div>
        //         {pedidos.map(pedidos => 
                    
        //             <table class="table table-bordered table-sm" style={style}>
        //                 <thead>
        //                     <tr className="table-light">
        //                         <th scope="col" style={style}>Id</th>
        //                         <th scope="col" style={style}>Usuario</th>
        //                         <th scope="col" style={style}>Estado</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     <tr className="table-light">
        //                         <td style={style}>{pedidos.id}</td>
        //                         <td style={style}>{pedidos.usuario_username}</td>
        //                         <td style={style}>
        //                             <select>
        //                                 <option>{pedidos.estado}</option>
        //                                 <option>Confirmado</option>
        //                                 <option>Pago</option>
        //                                 <option>Entregado</option>
        //                             </select>
        //                         </td>
        //                         <td style={style}>
        //                             <button>Cambiar estado</button>
        //                         </td>
        //                     </tr>
        //                     <tr className="table-light">
        //                         <td colSpan="4"><button className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100">Ver Detalles</button></td>
        //                     </tr>
        //                 </tbody>
        //             </table>
                    
        //         )}
        //     </div>
        // );
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