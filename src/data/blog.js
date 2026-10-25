// Artículos del blog. "slug" se usa en la URL: /blog/:slug
const articulos = [
  {
    id: 1,
    slug: 'plato-equilibrado',
    titulo: 'Cómo armar un plato equilibrado sin contar calorías',
    resumen: 'El método del plato: mitad verduras, un cuarto proteína y un cuarto carbohidratos.',
    categoria: 'Alimentación',
    autor: 'Equipo de nutrición',
    fecha: '2026-09-02',
    minutosLectura: 4,
    contenido: [
      'El método del plato es una guía visual que ayuda a comer variado sin pesar ni contar cada alimento. Se usa un plato de unos 23 cm como referencia.',
      'La mitad del plato son verduras y frutas, de preferencia de distintos colores. Un cuarto es proteína: legumbres, huevo, pescado, pollo o carnes magras. El último cuarto son carbohidratos, idealmente integrales, como arroz integral, quínoa o papas con cáscara.',
      'Acompaña con agua y una porción pequeña de grasas saludables, como palta, aceite de oliva o frutos secos. Si tienes una condición de salud particular, tu nutricionista ajustará las proporciones contigo.',
    ],
  },
  {
    id: 2,
    slug: 'hidratacion',
    titulo: 'Hidratación: cuánta agua necesitas realmente',
    resumen: 'La necesidad de agua depende de tu peso, tu actividad física y el clima.',
    categoria: 'Hábitos',
    autor: 'Equipo de nutrición',
    fecha: '2026-09-16',
    minutosLectura: 3,
    contenido: [
      'No existe un número único para todas las personas. La cantidad de agua que necesitas cambia según tu tamaño, cuánto te mueves y la temperatura del lugar donde vives.',
      'Una señal práctica es el color de la orina: amarillo claro suele indicar buena hidratación. La sed también es una guía, aunque en personas mayores puede aparecer tarde.',
      'Frutas y verduras como la sandía, el pepino o la naranja también aportan agua. Las bebidas azucaradas, en cambio, suman calorías sin ayudar más que el agua.',
    ],
  },
  {
    id: 3,
    slug: 'colaciones-saludables',
    titulo: 'Cinco colaciones saludables para el trabajo o la universidad',
    resumen: 'Ideas fáciles de llevar que te mantienen con energía entre comidas.',
    categoria: 'Recetas',
    autor: 'Equipo de nutrición',
    fecha: '2026-10-01',
    minutosLectura: 5,
    contenido: [
      'Una buena colación combina fibra y proteína, porque así da saciedad por más tiempo. Planificarlas evita recurrir a la máquina de snacks.',
      'Algunas ideas: yogur natural con avena y fruta; un puñado de frutos secos sin sal; palitos de zanahoria con hummus; una fruta con queso fresco; o huevo duro con tomate cherry.',
      'Prepáralas la noche anterior en recipientes pequeños. Si tienes jornadas largas, lleva dos colaciones en vez de una más grande.',
    ],
  },
  {
    id: 4,
    slug: 'teleconsulta',
    titulo: 'Qué esperar de tu primera teleconsulta nutricional',
    resumen: 'Cómo prepararte para la atención online y aprovechar mejor la sesión.',
    categoria: 'Clínica',
    autor: 'Equipo de nutrición',
    fecha: '2026-10-15',
    minutosLectura: 4,
    contenido: [
      'En la teleconsulta tu nutricionista revisa tus hábitos, tus objetivos y tu historial, igual que en una consulta presencial. Solo necesitas un dispositivo con cámara y buena conexión.',
      'Antes de la sesión, anota lo que comiste durante dos o tres días típicos y ten a mano tus exámenes recientes, si los tienes. Si cuentas con una pesa en casa, regístrate el peso esa mañana.',
      'Al terminar recibirás tus indicaciones por correo y podrás agendar el control desde la sección de servicios.',
    ],
  },
];

export default articulos;

// Busca el artículo que corresponde a la URL /blog/:slug
export function obtenerArticuloPorSlug(slug) {
  return articulos.find((a) => a.slug === slug) ?? null;
}

// Convierte "2026-09-10" en "10 de septiembre de 2026".
export function formatearFecha(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
}
