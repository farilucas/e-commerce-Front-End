import React from 'react';
import Particles from 'react-particles-js';
import Panel from './components/Panel/Panel';
import Alta from './components/Alta/Alta';
import Mis_Productos from './components/Lista Productos/Mis_Productos/Mis_Productos';
import Modificar from './components/Modificar/Modificar';
import Navigation from './components/Navigation/Navigation';
import Register from './components/Register/Register';
import SignIn from './components/SignIn/SignIn';
import './App.css';

const particleOptions = {
  "particles": {
      "number": {
        "value": 70,
        "density": {
          "enable": true,
          "value_area": 800
        },
      },
      "color": {
        "value": "#E3F919"
      },
      "lineLinked": {
        "blink": false,
        "color": {
          "value": "#E3F919"
        }
    }
  }
}

const inicialState = {
  route: 'Inicio',
  isSignedIn: false,
  user: {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    telefono: '',
    admin: false
  },
  productos: {
    id: '',
    nombre: '',
    descripcion: '',
    precio: 0
  },
  pagina: 'inicio',
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = inicialState;
  }

  loadUser = (data) => {
    this.setState({
      user: data
    })
  }

  loadProducto = (data) => {
    this.setState({
      producto: {
        id: data.id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio
      }
    })
  }

  onRouteChange = (route, producto) => {
    if (route === 'SignOut') {
      this.setState(inicialState);
    } else if (route === 'Alta') {
      this.setState({ pagina: 'alta', route });
    } else if (route === 'Inicio') {
      this.setState({isSignedIn: false, pagina: 'inicio', route });
    } else if (route === 'Mis_Productos') {
      this.setState({ pagina: 'mis_productos', route });
    } else if (route === 'Modificar') {
      this.setState({ pagina: 'modificar', producto, route });
    } else if (route === 'Registrarse') {
      this.setState({ pagina: 'registrarse', route });
    } else if (route === 'Ingresar') {
      this.setState({ pagina: 'ingresar', route });
    }
  }

  render(){
    const { isSignedIn, route, pagina } = this.state;
    let currentComponent;

    switch (route) {
      default:
      case 'Inicio':
        currentComponent = (
          <div>
            <Panel esAdmin={this.state.user.admin} isSignedIn={isSignedIn} loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
          </div>
        );
        break;
      case 'Alta':
        currentComponent = (
          <div>
            <Alta onRouteChange={this.onRouteChange} />
          </div>
        );
        break;
      case 'Mis_Productos':
        currentComponent = (
          <div>
            <Mis_Productos loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
          </div>
        );
        break;
      case 'Modificar': 
        currentComponent = (
          <div>
            <Modificar producto={this.state.producto} onRouteChange={this.onRouteChange}/>
          </div>
        );
        break;
      case 'Registrarse':
        currentComponent = (
          <div>
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          </div>
        );
        break;
      case 'Ingresar':
        currentComponent = (
          <div>
            <SignIn isSignedIn={isSignedIn} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          </div>
        );
          
    }
    return (
      <div className="App">
        <Particles className='particles'
        params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} pagina={pagina} onRouteChange={this.onRouteChange}/>
        { currentComponent }
      </div>
    );
  }
  
}

export default App;
