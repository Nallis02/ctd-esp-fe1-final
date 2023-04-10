import { useEffect, useState } from "react";
import GrillaPersonajes from "../componentes/personajes/grilla-personajes.componente";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { agregarFvoritos, limpiarFavoritos } from "../redux/mortySlice";

/**
 * Esta es la pagina de favoritos. Aquí se deberan ver todos los personajes marcados como favoritos
 * 
 * Uso: 
 * ``` <PaginaFavoritos /> ```
 * 
 * @returns la pagina de favoritos
 */

const PaginaFavoritos = () => {
    const favoritos = useAppSelector((state) => state.character.favoritos);
    const dispatch = useAppDispatch();
    const [fav, setFav] = useState([]);

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
        if (favoritos.length > 0) {
            Promise.all(
                favoritos.map((id) =>
                    fetch(`https://rickandmortyapi.com/api/character/${id}`)
                        .then((response) => response.json())
                )
            ).then((results) => {
                setFav(results.reduce((acc, cur) => acc.concat(cur), []));
            });
        } else {
            setFav([]);
        }
    }, [favoritos]);


    const limpiarFavoritosAgregados = (): void => {
        dispatch(limpiarFavoritos())
    };

    return <div className="container">
        <div className="actions">
            <h3>Personajes Favoritos</h3>
            <button className="danger"  onClick={limpiarFavoritosAgregados} disabled={favoritos.length <= 0}>Limpiar Todos</button>
        </div>
        <GrillaPersonajes favoritos={favoritos} characters={fav} clickFavorito={handleClickFavoritos} />
    </div>
}

export default PaginaFavoritos




 

