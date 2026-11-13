import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Accueil'],
  ['/ressources', 'Ressources'],
  ['/favoris', 'Favoris'],
  ['/revisions', 'Révisions'],
  ['/assistant', 'Assistant IA'],
];

export default function Navbar({ favCount }) {
  return (
    <header className="nav">
      <span className="logo">Skill<b>Up</b>▲</span>
      <nav>
        {links.map(([to, label]) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>
            {label}
            {to === '/favoris' && favCount > 0 && <i className="badge">{favCount}</i>}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
