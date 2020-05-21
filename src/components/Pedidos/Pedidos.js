import React from "react";

class Pedidos extends React.Component {
    constructor(props) {
        super(props);
        //this.onEstadochange = this.onEstadoChange.bind(this);
    }

    // onEstadoChange(event) {
    //     event.preventDefault();
    //     let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTgxMTczMiwiZXhwIjoxNTg5ODE1MzMyLCJuYmYiOjE1ODk4MTE3MzIsImp0aSI6IlpyMjY5Y0xhREtQbEo4OFoiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.xXCh624y5027YwnXxBt31AGNiPRGLYaf-chTtUNaGWo';
    //     fetch('http://localhost:8000/api/productos/', {
    //         method: 'put',
    //         headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
    //         body: JSON.stringify(
    //             this.state
    //         )
    //     })
    // }

    render() {
        const style = {
            borderColor: "black"
        }
        return (
            <table className="table table-bordered table-sm" style={style}>
                <thead>
                    <tr className="table-light">
                        <th scope="col" style={style}>Id</th>
                        <th scope="col" style={style}>Usuario</th>
                        <th scope="col" style={style}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-light">
                        <td style={style}>{this.props.data.id}</td>
                        <td style={style}>{this.props.data.usuario_username}</td>
                        <td style={style}>
                            <select value= {this.props.data.estado} >
                                <option>Confirmado</option>
                                <option>Pago</option>
                                <option>Entregado</option>
                            </select>
                        </td>
                        <td style={style}>
                            <button>Cambiar estado</button>
                        </td>
                    </tr>
                    <tr className="table-light">
                        <td colSpan="4"><button  className="b pv2 input-reset ba b--black bg-transparent grow pointer f6 dib w-100">Ver Detalles</button></td>
                    </tr>
                </tbody>
            </table>
            //</div>
        );
    }
}
export default Pedidos;