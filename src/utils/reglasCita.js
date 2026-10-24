const IDS_PRESENCIALES = ['CN001', 'CN002'];
const ID_TELECONSULTA = 'CN004';

export function validarTeleconsulta(servicioId, citasPrevias){
    if (servicioId !== ID_TELECONSULTA) return '';
    const tuvoPresencial = citasPrevias.some(
        (c) => IDS_PRESENCIALES.includes(c.servicioId) && c.estado !== 'cancelada'

    );
    return tuvoPresencial ? '' : 'La teleconsulta requiere haber tenido antes una consulta presencial.'
}