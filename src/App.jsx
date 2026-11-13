import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import ResourceDetail from './pages/ResourceDetail';
import Favorites from './pages/Favorites';
import Revisions from './pages/Revisions';
import Assistant from './pages/Assistant';
import useFavorites from './controllers/useFavorites';
import useTasks from './controllers/useTasks';

export default function App() {
  // Controllers : toute la logique est ici, App ne fait que distribuer
  const { favs, toggleFav } = useFavorites();
  const { tasks, addTask, toggleTask, removeTask } = useTasks();

  // View : uniquement de l'affichage et du routage
  return (
    <>
      <Navbar favCount={favs.length} />
      <main>
        <Routes>
          <Route path="/" element={<Home favs={favs} tasks={tasks} />} />
          <Route path="/ressources" element={<Resources favs={favs} onToggleFav={toggleFav} />} />
          <Route path="/ressources/:id" element={<ResourceDetail />} />
          <Route path="/favoris" element={<Favorites favs={favs} onToggleFav={toggleFav} />} />
          <Route
            path="/revisions"
            element={<Revisions tasks={tasks} onAdd={addTask} onToggle={toggleTask} onRemove={removeTask} />}
          />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="*" element={<p className="alert">404 — page introuvable.</p>} />
        </Routes>
      </main>
    </>
  );
}