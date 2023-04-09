import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../componentes/redux/hooks";
import { agregarFvoritos, buscarPersonaje, getCharacterMorty, getPersonajesName, limpiarBusquedaPersonaje } from "../componentes/redux/mortySlice";

/**
 * Esta es la pagina principal. Aquí se debera ver el panel de filtros junto con la grilla de personajes.
 * 
 * Uso: 
 * ``` <PaginaInicio /> ```
 * 
 * @returns la pagina de inicio
 */
const PaginaInicio = () => {

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const busqueda = useAppSelector((state) => state.character.input);
  const [buscar, setBuscar] = useState(busqueda);
  const totalPages = useAppSelector((state) => state.character.data.pages);
  const { personajes, favoritos } = useAppSelector((state) => state.character);
  const ref = useRef<HTMLInputElement>(null);

  const handleClickFavoritos = (id: number) => {
    const existe = favoritos.includes(id);
    if (existe) {
      const copiaFavFiltrado = favoritos.filter((favorito) => favorito !== id);
      dispatch(agregarFvoritos(copiaFavFiltrado));
    } else {
      dispatch(agregarFvoritos([...favoritos, id]));
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch(buscarPersonaje({nombre: buscar}));
      dispatch(getPersonajesName(buscar));

    }, 1000);

    return () => {
      clearTimeout(timeOut)
    }
  }, [buscar, dispatch]);
  useEffect(() => {
    dispatch(getCharacterMorty(page));
    ref?.current?.focus()
  }, [page, dispatch]);
  const paginaAnterior = () => {
    setPage((page) => page - 1);
  };
  const paginaSiguiente = () => {
    setPage((page) => page + 1);
  };
  const borrarBusqueda = () => {
    setBuscar('');
    dispatch(limpiarBusquedaPersonaje());
    ref?.current?.focus();
    dispatch(getCharacterMorty(1));
  };
  return <div className="container">
    <div className="actions">
      <h3>Catálogo de Personajes</h3>
      <button className="danger" onClick={borrarBusqueda} disabled={!buscar}>Limpiar Filtros</button>
    </div>
    <Filtros inputRef={ref}
      buscarPersonaje={(e) => setBuscar(e.target.value)}
      valor={buscar} />
    <Paginacion anterior={paginaAnterior}
      siguiente={paginaSiguiente}
      deshabiliArnterior={page === 1}
      deshabiliarSiguiente={page === totalPages}
    />
    <GrillaPersonajes characters={personajes} clickFavorito={handleClickFavoritos} favoritos={favoritos} />
    <Paginacion anterior={paginaAnterior}
      siguiente={paginaSiguiente}
      deshabiliArnterior={page === 1}
      deshabiliarSiguiente={page === totalPages}
    />
  </div>
}

export default PaginaInicio