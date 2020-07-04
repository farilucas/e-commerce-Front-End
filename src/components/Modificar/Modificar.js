import React from 'react';

class Modificar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nombre: '',
            descripcion: '',
            precio: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount(){
        this.setState(this.props.producto)
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch('http://'+ window.location.hostname +':8000/api/productos/' + this.props.producto.id, {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}`},
            body: JSON.stringify(
                this.state
            )
        })
            .then(() => this.props.onRouteChange('Inicio'))
    }

    render() {
        return (
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="alta" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Modificando Producto</legend>
                            <div className="mt3">
                                <legend className="f6 fw6 ph0 mh0">ID:</legend>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.id}
                                    readOnly
                                />
                            </div>
                            <div className="mt3">
                                <legend className="f6 fw6 ph0 mh0">Nombre:</legend>
                                <input
                                    onChange={this.handleInputChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.nombre}
                                    name="nombre"
                                    id="nombre" />
                            </div>
                            <div className="mt3">
                                <legend className="f6 fw6 ph0 mh0">Descripcion:</legend>
                                <input
                                    onChange={this.handleInputChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.descripcion}
                                    name="descripcion"
                                    id="descripcion" />
                            </div>
                            <div className="mt3">
                                <legend className="f6 fw6 ph0 mh0">Precio:</legend>
                                <input
                                    onChange={this.handleInputChange}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    value={this.state.precio}
                                    name="precio"
                                    id="precio" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input
                                onClick={this.handleSubmit}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Modificar" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default Modificar;