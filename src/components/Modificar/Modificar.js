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
        let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU4OTkwOTE4NSwiZXhwIjoxNTg5OTEyNzg1LCJuYmYiOjE1ODk5MDkxODUsImp0aSI6InN3WVo5SkUyNm9mNUM0SDAiLCJzdWIiOiJ0aW5jaG9yaW4iLCJwcnYiOiIwYjBjZjUwYWYxMjNkODUwNmUxNmViYTdjYjY3NjI5NzRkYTNhYzNhIn0.wyfFBZIOfNSSS5w4Y-qCB28086QaZFaj2cAzxyZeQcY';
        fetch('http://localhost:8000/api/productos/' + this.props.producto, {
            method: 'put',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
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