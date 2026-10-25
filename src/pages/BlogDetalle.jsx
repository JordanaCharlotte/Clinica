// Página /blog/:slug: muestra un artículo completo y otros para seguir leyendo.
import { Link, useParams } from 'react-router-dom';
import articulos, { formatearFecha, obtenerArticuloPorSlug } from '../data/blog';

export default function BlogDetalle() {
  const { slug } = useParams();
  const articulo = obtenerArticuloPorSlug(slug);

  if (!articulo) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">No encontramos ese artículo</h1>
        <p className="text-body-secondary">Puede que el enlace esté mal escrito o que el artículo ya no exista.</p>
        <Link to="/blog" className="btn btn-primary">
          Volver al blog
        </Link>
      </section>
    );
  }

  // Dos artículos distintos al actual para recomendar.
  const otros = articulos.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <article className="col-12 col-lg-8">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {articulo.titulo}
              </li>
            </ol>
          </nav>
          <span className="badge text-bg-light mb-2">{articulo.categoria}</span>
          <h1 className="display-6 fw-bold">{articulo.titulo}</h1>
          <p className="text-body-secondary">
            {articulo.autor} · {formatearFecha(articulo.fecha)} · {articulo.minutosLectura} min de lectura
          </p>
          {articulo.contenido.map((parrafo, i) => (
            <p key={i} className="fs-5">
              {parrafo}
            </p>
          ))}

          <hr className="my-5" />
          <h2 className="h5 mb-3">Sigue leyendo</h2>
          <div className="row g-3">
            {otros.map((a) => (
              <div key={a.id} className="col-12 col-md-6">
                <Link to={`/blog/${a.slug}`} className="card h-100 text-decoration-none shadow-sm">
                  <div className="card-body">
                    <h3 className="h6 card-title">{a.titulo}</h3>
                    <p className="card-text small text-body-secondary mb-0">{a.resumen}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
