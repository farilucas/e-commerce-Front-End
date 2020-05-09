import React, { Component } from 'react'
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";

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
        fetch('insert path here' + this.props.producto, {

            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                this.state
            )
        })
            .then(() => this.props.onRouteChange('Inicio'))
            .catch(error => console.log('error============:', error));
    }

    componentDidMount() {
        fetch('insert path here' + this.props.producto)
            .then(response => response.json())
            .then(data =>
                this.setState({
                    id: data.id,
                    marca: data.nombre,
                    modelo: data.descripcion,
                    ubicacion: data.precio,
                })
            );
    }

    render() {
        return (
            <div className="d-flex justify-content-center mt-5">
                <Card style={{ minWidth: 350 }}>
                    <Card.Header className="text-center">
                        <strong>Modificar</strong>
                    </Card.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Card.Body className="pb-1">
                            <FormGroup controlId="id">
                                <FormLabel>Id</FormLabel>
                                <FormControl
                                    type="text"
                                    readOnly={true}
                                    value={this.state.id} />
                            </FormGroup>
                            <FormGroup controlId="nombre">
                                <FormLabel>Nombre</FormLabel>
                                <FormControl
                                    name="nombre"
                                    type="text"
                                    placeholder="Ingrese Nombre"
                                    value={this.state.nombre}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup controlId="descripcion">
                                <FormLabel>Descripcion</FormLabel>
                                <FormControl
                                    name="descripcion"
                                    type="text"
                                    placeholder="Ingrese Descripcion"
                                    value={this.state.descripcion}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                            <FormGroup controlId="ubicacion">
                                <FormLabel>Precio</FormLabel>
                                <FormControl
                                    name="precio"
                                    type="text"
                                    placeholder="Ingrese Precio"
                                    value={this.state.precio}
                                    onChange={this.handleInputChange} />
                            </FormGroup>
                        </Card.Body>
                        <Card.Footer>
                            <Button variant="primary" type="submit">Enviar</Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Modificar;