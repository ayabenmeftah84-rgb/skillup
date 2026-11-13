import { Link } from 'react-router-dom';

export default function Home({ favs, tasks }) {
  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  return (
    <section>
      <h1 className="hero">Apprends.<br />Organise.<br /><mark>Progresse.</mark></h1>
      <p className="muted">Ton carnet de révisions : ressources, favoris, tâches et assistant IA.</p>
      <div className="stats">
        <Link to="/favoris" className="stat"><b>{favs.length}</b>favoris</Link>
        <Link to="/revisions" className="stat"><b>{tasks.length - done}</b>tâches en cours</Link>
        <Link to="/revisions" className="stat"><b>{pct}%</b>avancement</Link>
      </div>
      <Link className="btn big" to="/ressources">Explorer les ressources →</Link>
    </section>
  );
}
