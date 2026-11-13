import { useState, useEffect } from 'react';
import { searchBooks } from '../services/api';
import ResourceCard from '../components/ResourceCard';
import Loader from '../components/Loader';

const CATEGORIES = ['', 'programming', 'javascript', 'python', 'databases', 'web design', 'algorithms'];

export default function Resources({ favs, onToggleFav }) {
  const [keyword, setKeyword] = useState('');   // champ contrôlé
  const [query, setQuery] = useState('react');  // valeur validée -> déclenche l'API
  const [subject, setSubject] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    searchBooks(query, subject)
      .then((data) => {
        if (!cancelled) {
          setItems(data);
          setError('');
        }
      })
      .catch((e) => {
        if (!cancelled) setError(e.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query, subject]);

  const submit = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (q !== query) {
      setLoading(true);
      setQuery(q);
    }
  };

  const changeSubject = (e) => {
    setLoading(true);
    setSubject(e.target.value);
  };

  return (
    <section>
      <h2>Catalogue</h2>
      <form className="row form" onSubmit={submit}>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Mot-clé (ex. react, sql…)"
        />
        <select value={subject} onChange={changeSubject}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c || 'Toutes catégories'}</option>
          ))}
        </select>
        <button className="btn">Rechercher</button>
      </form>

      {loading && <Loader />}
      {error && <p className="alert">⚠ {error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="alert">Aucun résultat pour ces critères.</p>
      )}

      <div className="grid">
        {!loading &&
          items.map((r) => (
            <ResourceCard
              key={r.id}
              resource={r}
              isFav={favs.some((f) => f.id === r.id)}
              onToggleFav={onToggleFav}
            />
          ))}
      </div>
    </section>
  );
}