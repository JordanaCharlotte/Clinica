// Página /blog: lista de artículos con filtro por categoría.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import articulos, { formatearFecha } from '../data/blog';

export default function Blog() {
  const [categoria, setCategoria] = useState('Todas');
  const categorias = ['Todas', ...new Set(articulos.map((a) => a.categoria))];
  // Artículos que se muestran según la categoría elegida.
  const visibles = useMemo(
    () => (categoria === 'Todas' ? articulos : articulos.filter((a) => a.categoria === categoria)),
    [categoria],
  );

  return (
    <section className="container py-5">
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4" role="group" aria-label="Filtrar por categoría">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            className={`btn btn-sm ${c === categoria ? 'btn-primary' : 'btn-outline-primary'}`}
            aria-pressed={c === categoria}
            onClick={() => setCategoria(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {visibles.map((a) => (
          <div key={a.id} className="col-12 col-md-6 col-lg-4">
            <article className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <span className="badge text-bg-light align-self-start mb-2">{a.categoria}</span>
                <h2 className="h5 card-title">{a.titulo}</h2>
                <p className="card-text text-body-secondary flex-grow-1">{a.resumen}</p>
                <p className="small text-body-secondary">
                  {formatearFecha(a.fecha)} · {a.minutosLectura} min de lectura
                </p>
                <Link to={`/blog/${a.slug}`} className="btn btn-outline-primary btn-sm align-self-start">
                  Leer artículo
                </Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
