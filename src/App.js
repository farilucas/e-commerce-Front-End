import React from 'react';
import Particles from 'react-particles-js';
import Panel from './components/Panel/Panel';
import PanelAdmin from './components/Panel/PanelAdmin';
import Alta from './components/Alta/Alta';
import Carrito from './components/Lista Productos/Carrito/Carrito';
import MisPedidos from './components/Lista Productos/MisProductos/MisPedidos';
import MisPedidosAdmin from './components/Lista Productos/MisProductos/MisPedidosAdmin';
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
    username: '',
    token: '',
    admin: false
  },
  productos: {
    id: '',
    nombre: '',
    descripcion: '',
    precio: 0
  },
  pedidos: {
    id: '',
    username_usuario: '',
    estado: '',
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

  loadPedido = (data) => {
    this.setState({ pedido: data })
  }

  onRouteChange = (route, producto) => {
    if (route === 'SignOut') {
      this.setState(inicialState);
      localStorage.clear();
      clearTimeout(localStorage.getItem("tokenHandle"));
    } else if (route === 'Alta') {
      this.setState({ pagina: 'alta', route });
    } else if (route === 'Inicio') {
      this.setState({isSignedIn: true, pagina: 'inicio', route });
    } else if (route === 'Carrito') {
      this.setState({ pagina: 'carrito', route });
    } else if (route === 'MisPedidos') {
      this.setState({ pagina: 'misPedidos', route });
    } else if (route === 'Modificar') {
      this.setState({ pagina: 'modificar', producto, route });
    } else if (route === 'Registrarse') {
      this.setState({ pagina: 'registrarse', route });
    } else if (route === 'Ingresar') {
      this.setState({ pagina: 'ingresar', route });
    }
  }

  render(){
    const { isSignedIn, route, pagina} = this.state;
    let currentComponent;

    switch (route) {
      default:
      case 'Inicio':
        currentComponent = (
          <div>
            {  
              localStorage.getItem('admin') === "0"
              ?<Panel isSignedIn={isSignedIn} esAdmin={this.state.user.admin} userId={this.state.user.username}  loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
              :<PanelAdmin isSignedIn={isSignedIn} loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
            }
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
      case 'Carrito':
        currentComponent = (
          <div>
            <Carrito loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
          </div>
        );
        break;
      case 'MisPedidos':
        currentComponent = (
          <div>
            { localStorage.getItem('admin') === 0
              ?<MisPedidos loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
              :<MisPedidosAdmin loadProducto={this.loadProducto} onRouteChange={this.onRouteChange} />
            }
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
