

import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';
import PropTypes from 'prop-types';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
interface PropsTarjetaPersonajes {
  id: number;
  name: string;
  image: string;
  esFavorito: boolean;
  clickFavorito: () => void;
}
const TarjetaPersonaje = ({id, image, name, esFavorito, clickFavorito}: PropsTarjetaPersonajes) => {
    return <div className="tarjeta-personaje">
        <img src={image} alt={name}/>
        <div className="tarjeta-personaje-body">
            <span>{name}</span>
            <BotonFavorito esFavorito={esFavorito} handleClick={clickFavorito} />
        </div>
    </div>
}

export default TarjetaPersonaje;



TarjetaPersonaje.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  esFavorito: PropTypes.bool.isRequired,
  clickFavorito: PropTypes.func.isRequired,
};
