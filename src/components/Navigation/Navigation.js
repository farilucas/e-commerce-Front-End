import React from 'react';
import Logo from './Logo.jpeg';

const Navigation = ({ onRouteChange, isSignedIn, pagina }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <p onClick={() => onRouteChange('Inicio')} className='f3 link dim moon-gray underline pa3 pointer'>Inicio</p>
                <p onClick={() => onRouteChange('Carrito')} className='f3 link dim moon-gray underline pa3 pointer'>Carrito</p>
                <p onClick={() => onRouteChange('MisPedidos')} className='f3 link dim moon-gray underline pa3 pointer'>Mis Pedidos</p>
                <p onClick={() => onRouteChange('SignOut')} className='f3 link dim moon-gray underline pa3 pointer'>Salir</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#342D2D', padding: '15px' }}>
                {/* <p onClick={() => onRouteChange('Inicio')} className='f3 link dim black  underline pa3 pointer'>Inicio</p> */}
                <p onClick={() => onRouteChange('Ingresar')} className='f3 link dim moon-gray underline pa3 pointer'>Ingrese</p>
                <p onClick={() => onRouteChange('Registrarse')} className='f3 link dim moon-gray underline pa3 pointer'>Registrarse</p>
            </nav>
        );
    }


}

export default Navigation;