import Filtros from "../componentes/personajes/filtros.componente"
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente"
import Paginacion from "../componentes/paginacion/paginacion.componente";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { agregarFvoritos, buscarPersonaje, getCharacterMorty, getPersonajesName, limpiarBusquedaPersonaje } from "../redux/mortySlice";

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
  const valorInput = useAppSelector((state) => state.character.input);
  const [buscar, setBuscar] = useState<string>(valorInput);
  const totalPages = useAppSelector((state) => state.character.data.pages);
  console.log(buscar, "soy buscar");

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
      dispatch(buscarPersonaje(buscar));
      dispatch(getPersonajesName({ name: buscar, page: page }));

    }, 500);

    return () => {
      clearTimeout(timeOut)
    }
  }, [buscar, page, dispatch]);

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
      buscarPersonaje={(e: ChangeEvent<HTMLInputElement>) => setBuscar(e.target.value)}
      valor={buscar ? buscar.toString() : ''} />
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