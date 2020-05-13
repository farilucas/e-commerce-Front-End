import React from 'react';
import Particles from 'react-particles-js';
import Panel from './components/Panel/Panel';
import Alta from './components/Alta/Alta';
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
  producto: {
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
      user: {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        direccion: data.direccion,
        telefono: data.telefono,
        admin: data.admin
      }
    })
  }

  onRouteChange = (route, producto) => {
    if (route === 'Alta') {
      this.setState({ pagina: 'alta', route });
    } else if (route === 'Inicio') {
      this.setState({ pagina: 'inicio', route });
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
            <Panel onRouteChange={this.onRouteChange} />
          </div>
        );
        break;
      case 'Alta':
        currentComponent = (
          <div>
            <Alta onRouteChange={this.onRouteChange}/>
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
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
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
