import useLocalStorage from '../hooks/useLocalStorage';

export default function useTasks() {
  const [tasks, setTasks] = useLocalStorage('skillup-tasks', []);

  const addTask = (data) =>
    setTasks((prev) => [...prev, { id: Date.now(), done: false, ...data }]);

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const removeTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  return { tasks, addTask, toggleTask, removeTask };
}