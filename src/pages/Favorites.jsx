import { Link } from 'react-router-dom';
import ResourceCard from '../components/ResourceCard';

export default function Favorites({ favs, onToggleFav }) {
  return (
    <section>
      <h2>Mes favoris ({favs.length})</h2>
      {favs.length === 0 && (
        <p className="alert">Aucun favori. <Link to="/ressources">Parcourir le catalogue</Link></p>
      )}
      <div className="grid">
        {favs.map((r) => <ResourceCard key={r.id} resource={r} isFav onToggleFav={onToggleFav} />)}
      </div>
    </section>
  );
}
