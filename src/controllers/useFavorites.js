import useLocalStorage from '../hooks/useLocalStorage';

export default function useFavorites() {
  const [favs, setFavs] = useLocalStorage('skillup-favs', []);

  const isFav = (id) => favs.some((f) => f.id === id);

  const toggleFav = (r) =>
    setFavs((prev) =>
      prev.some((f) => f.id === r.id)
        ? prev.filter((f) => f.id !== r.id)
        : [...prev, r]
    );

  return { favs, isFav, toggleFav };
}