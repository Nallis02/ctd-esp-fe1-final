import './paginacion.css';
/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
interface PaginacionProps {
    anterior: () => void;
    siguiente: () => void;
    deshabiliarSiguiente: boolean;
    deshabiliArnterior: boolean;
}
const Paginacion = ({ anterior, siguiente, deshabiliarSiguiente, deshabiliArnterior }: PaginacionProps) => {

    return (
        <div className="paginacion">
            <button disabled={deshabiliArnterior} className="primary" onClick={anterior}>Anterior</button>
            <button disabled={deshabiliarSiguiente} className="primary" onClick={siguiente}>Siguiente</button>
        </div>
    );
};

export default Paginacion;
