import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getWork } from '../services/api';
import Loader from '../components/Loader';

export default function ResourceDetail() {
  const { id } = useParams();
  const [work, setWork] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getWork(id)
      .then((w) => { if (!cancelled) setWork(w); })
      .catch((e) => { if (!cancelled) setError(e.message); });
    return () => { cancelled = true; };
  }, [id]);

  if (error) return <p className="alert">⚠ {error}</p>;
  if (!work) return <Loader />;
  return (
    <section className="detail">
      <Link to="/ressources" className="btn ghost">← Retour</Link>
      <div className="detail-box">
        {work.cover && <img src={work.cover} alt={work.title} />}
        <div>
          <h2>{work.title}</h2>
          <p>{work.description}</p>
          <p>{work.subjects.map((s) => <span key={s} className="tag">{s}</span>)}</p>
        </div>
      </div>
    </section>
  );
}