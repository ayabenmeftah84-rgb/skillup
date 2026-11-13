import { useState } from 'react';
import { askAI } from '../services/api';

export default function Assistant() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      setAnswer(await askAI(question.trim()));
    } catch (err) {
      setError(`Oups, l'assistant est indisponible. (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h2>Assistant pédagogique</h2>
      <form className="form col" onSubmit={ask}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ex. : Quelle est la différence entre props et state ?"
        />
        <button className="btn" disabled={!question.trim() || loading}>Poser la question</button>
      </form>
      {loading && <p className="loader"><span className="spin" /> L'assistant réfléchit...</p>}
      {error && <p className="alert">⚠ {error}</p>}
      {answer && <pre className="answer">{answer}</pre>}
    </section>
  );
}
