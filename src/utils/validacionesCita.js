export function validarObligatorio(valor, mensaje) {
    return String(valor ?? '').trim() === '' ? mensaje : ''
}

export function validarCorreo(correo) {
    const partes = correo.split('@')
    if (partes.length !== 2 || partes[0] === '' || !partes[1].includes('.')) {
        return 'Ingresa un correo válido'
    }
    return ''
}

export function validarFecha(fecha, hoy) {
    if (fecha === '') return 'Elige una fecha'
    if (fecha < hoy) return 'La fecha no puede ser anterior a hoy'
    return ''
}