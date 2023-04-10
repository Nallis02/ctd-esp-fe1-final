import React from 'react';
import './filtros.css';
import PropTypes from 'prop-types';


type BuscarPersonajeEvent = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface PropsFiltros {
  buscarPersonaje: BuscarPersonajeEvent;
  valor: string;
  inputRef:React.RefObject<HTMLInputElement>
}
const Filtros = ({ buscarPersonaje, valor, inputRef }: PropsFiltros) => {
  const nombreInput = 'nombre';
  
  return (
    <div className="filtros">
      <label htmlFor={nombreInput}>Filtrar por nombre:</label>
      <input
        value={valor}
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        name="nombre"
        onChange={buscarPersonaje}
        ref={inputRef}
      />
    </div>
  )
}
export default Filtros;

Filtros.propTypes = {
  buscarPersonaje: PropTypes.func.isRequired,
  valor: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};