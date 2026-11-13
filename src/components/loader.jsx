export default function Loader({ text = 'Chargement…' }) {
  return (
    <div className="loader" role="status">
      <span className="spin" /> {text}
    </div>
  );
}
