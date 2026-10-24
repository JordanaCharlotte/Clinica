import { createContext, useContext, useState } from 'react';
import { obtenerCitaEnCurso, guardarCitaEnCurso, limpiarCitaEnCurso } from '../services/citaService';

const CitaContext = createContext(null);

export function CitaProvider(props) {
    const [citaEnCurso, setCitaEnCurso] = useState(obtenerCitaEnCurso());

    function actualizarCita(datos) {
        const nueva = { ...citaEnCurso, ...datos };
        setCitaEnCurso(nueva);
        guardarCitaEnCurso(nueva);
    }

    function reiniciarCita() {
        setCitaEnCurso(null);
        limpiarCitaEnCurso();
    }

    return (
        <CitaContext.Provider value={{ citaEnCurso, actualizarCita, reiniciarCita }}>
            {props.children}
        </CitaContext.Provider>

    );

}
export function useCita() {
    return useContext(CitaContext);
}