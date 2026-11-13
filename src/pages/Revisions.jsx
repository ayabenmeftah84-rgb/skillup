import { useState } from 'react';

const EMPTY = { title: '', description: '', due: '' };

export default function Revisions({ tasks, setTasks }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [filter, setFilter] = useState('all');

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.title.trim()) err.title = 'Le titre est obligatoire.';
    if (!form.due) err.due = 'La date limite est obligatoire.';
    return err;
  };

  const add = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;
    setTasks((prev) => [...prev, { id: Date.now(), ...form, title: form.title.trim(), done: false }]);
    setForm(EMPTY);
  };

  const toggle = (id) => setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const remove = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const done = tasks.filter((t) => t.done).length;
  const pct = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const shown = tasks.filter((t) => filter === 'all' || (filter === 'done' ? t.done : !t.done));

  return (
    <section>
      <h2>Planning de révisions</h2>
      <div className="progress" aria-label="progression">
        <div style={{ width: `${pct}%` }} />
        <span>{pct}% terminé ({done}/{tasks.length})</span>
      </div>

      <form className="form col" onSubmit={add} noValidate>
        <input name="title" value={form.title} onChange={change} placeholder="Titre de la tâche *" />
        {errors.title && <small className="err">{errors.title}</small>}
        <textarea name="description" value={form.description} onChange={change} placeholder="Description (facultatif)" />
        <input type="date" name="due" value={form.due} onChange={change} />
        {errors.due && <small className="err">{errors.due}</small>}
        <button className="btn">+ Ajouter</button>
      </form>

      <div className="row filters">
        {[['all', 'Toutes'], ['todo', 'En cours'], ['done', 'Terminées']].map(([k, l]) => (
          <button key={k} className={`btn ghost ${filter === k ? 'on' : ''}`} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      {shown.length === 0 && <p className="alert">Aucune tâche à afficher.</p>}
      <ul className="tasks">
        {shown.map((t) => (
          <li key={t.id} className={t.done ? 'done' : ''}>
            <div>
              <b>{t.title}</b>
              {t.description && <p className="muted">{t.description}</p>}
              <small>📅 {t.due} · {t.done ? 'Terminée' : 'En cours'}</small>
            </div>
            <div className="row">
              <button className="btn ghost" onClick={() => toggle(t.id)}>{t.done ? '↺' : '✓'}</button>
              <button className="btn danger" onClick={() => remove(t.id)}>✕</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
