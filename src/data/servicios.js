// Datos del catalogo de la Clinica NutriVida.
// Vienen del Excel "Catalogo_Clinica_NutriVida" (hoja Servicios y Planes).
// Por ahora son 8 filas representativas; se puede ampliar a las 19 completas despues.

const servicios = [
    {
        id: "CN001",
        categoria: "Consulta",
        nombre: "Primera consulta nutricional",
        descripcion: "Evaluación inicial de 50 min, presencial.",
        precio: "$35.000",
    },
    {
        id: "CN002",
        categoria: "Consulta",
        nombre: "Control nutricional (seguimiento)",
        descripcion: "Control de 30 min, presencial.",
        precio: "$25.000",
    },
    {
        id: "CN004",
        categoria: "Consulta",
        nombre: "Teleconsulta nutricional",
        descripcion: "Consulta online de 30 min por videollamada.",
        precio: "$20.000",
    },
    {
        id: "PL001",
        categoria: "Plan",
        nombre: "Plan pérdida de peso (1 mes)",
        descripcion: "Primera consulta + control quincenal + plan personalizado.",
        precio: "$65.000",
    },
    {
        id: "PL003",
        categoria: "Plan",
        nombre: "Plan nutrición deportiva",
        descripcion: "Cálculo de requerimientos energéticos y proteicos.",
        precio: "$70.000",
    },
    {
        id: "PL005",
        categoria: "Plan",
        nombre: "Plan alimentación vegetariana/vegana",
        descripcion: "Aporte adecuado de proteínas, hierro, B12 y calcio.",
        precio: "$68.000",
    },
    {
        id: "EV001",
        categoria: "Evaluación",
        nombre: "Antropometría completa",
        descripcion: "Medición de peso, talla y circunferencias, 20 min.",
        precio: "$18.000",
    },
    {
        id: "TG001",
        categoria: "Taller",
        nombre: "Taller de alimentación saludable",
        descripcion: "Taller grupal de 90 min, máx. 10 personas.",
        precio: "$15.000",
    },
];

export default servicios;