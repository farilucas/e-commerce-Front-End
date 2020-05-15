import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn, pagina }) => {
    if (isSignedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('Mis_Productos')} className='f3 link dim black  underline pa3 pointer'>Mis_Productos</p>
                <p onClick={() => onRouteChange('SignOut')} className='f3 link dim black  underline pa3 pointer'>Salir</p>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('Inicio')} className='f3 link dim black  underline pa3 pointer'>Inicio</p>
                <p onClick={() => onRouteChange('Ingresar')} className='f3 link dim black  underline pa3 pointer'>Ingrese</p>
                <p onClick={() => onRouteChange('Registrarse')} className='f3 link dim black  underline pa3 pointer'>Registrarse</p>
            </nav>
        );
    }


}

export default Navigation;