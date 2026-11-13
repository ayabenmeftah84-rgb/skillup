import { Link } from 'react-router-dom';

export default function ResourceCard({ resource, isFav, onToggleFav }) {
  return (
    <article className="card">
      {resource.cover ? (
        <img src={resource.cover} alt={resource.title} loading="lazy" />
      ) : (
        <div className="nocover">?</div>
      )}
      <div className="card-body">
        <span className="tag">{resource.category}</span>
        <h3>{resource.title}</h3>
        <p className="muted">{resource.author} · {resource.year}</p>
        <div className="row">
          <Link className="btn ghost" to={`/ressources/${resource.id}`}>Détails</Link>
          <button className={`btn ${isFav ? 'on' : ''}`} onClick={() => onToggleFav(resource)}>
            {isFav ? '★ Retirer' : '☆ Favori'}
          </button>
        </div>
      </div>
    </article>
  );
}
