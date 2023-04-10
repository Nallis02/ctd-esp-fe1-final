import { Character } from "../../redux/mortySlice";
import './grilla-personajes.css';
import TarjetaPersonaje from './tarjeta-personaje.componente';
import PropTypes from 'prop-types';

/**
 * Grilla de personajes para la pagina de inicio
 * 
 * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
 * 
 * 
 * @returns un JSX element 
 */

interface PropsGrillaPersonaje {
  characters: Character[];
  favoritos: number[];
  clickFavorito: (id: number) => void;
}
const GrillaPersonajes = ({ characters, favoritos, clickFavorito }: PropsGrillaPersonaje) => {

  return (

    <div className='grilla-personajes'>
      {characters.map((personaje) => (
        <TarjetaPersonaje
          key={personaje.id}
          name={personaje.name}
          image={personaje.image}
          id={personaje.id}
          clickFavorito={() => clickFavorito(personaje.id)}
          esFavorito={favoritos.includes(personaje.id)}
        />
      ))
      }
    </div>
  );
}
export default GrillaPersonajes;

GrillaPersonajes.propTypes = {
  characters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  favoritos: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  clickFavorito: PropTypes.func.isRequired
};