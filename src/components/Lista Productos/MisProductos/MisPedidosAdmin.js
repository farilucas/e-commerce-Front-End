import React from "react";
import { Button } from 'reactstrap';
import { Circular } from 'styled-loaders-react'; 
import Pedidos from "../../Pedidos/Pedidos";



class MisPedidosAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: [],
            estado: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        this.fetchData()
    }


    async fetchData() {
        this.setState({ isFetching: true });

        await fetch(`http://`+ window.location.hostname +`:8000/api/pedidos`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }).then(res => res.json())
            .then(json =>
                this.setState({
                    pedidos: json,
                    isLoading: false
                }))
    };

    async onBaja(pedidoId, id) {
        await fetch(`http://`+ window.location.hostname +`:8000/api/pedidos/${pedidoId}/productos/` + id, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Accept": "application/json"
            }
        })
        
    }

    render() {
        let pedidos = this.state.pedidos.map(pedidos => {
            let pedidoData = { ...pedidos };
            return <Pedidos data={pedidoData} onBaja={this.onBaja} key={pedidos.id} onRouteChange={this.props.onRouteChange} />
        })
        // if (pedidos.length === 0) {
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
                {this.state.isLoading ? <h1 className='moon-gray' style={{ marginTop: '10%' }}>Loading <Circular color='white' /></h1> :pedidos}
            </div>
        );
    }
}
export default MisPedidosAdmin;