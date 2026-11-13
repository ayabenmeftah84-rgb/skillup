// ============================================================
// Open Library : catalogue de ressources (aucune clé nécessaire)
// ============================================================
const OL = 'https://openlibrary.org';

export async function searchBooks(q, subject) {
  const p = new URLSearchParams({
    q: q || 'programming',
    limit: '24',
    fields: 'key,title,author_name,first_publish_year,cover_i,subject',
  });
  if (subject) p.set('subject', subject);

  const res = await fetch(`${OL}/search.json?${p}`);
  if (!res.ok) throw new Error(`Erreur réseau (${res.status})`);
  const data = await res.json();

  return data.docs.map((b) => ({
    id: b.key.replace('/works/', ''),
    title: b.title,
    author: (b.author_name || ['Auteur inconnu'])[0],
    year: b.first_publish_year || '—',
    category: (b.subject || ['Général'])[0],
    cover: b.cover_i
      ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
      : null,
  }));
}

export async function getWork(id) {
  const res = await fetch(`${OL}/works/${id}.json`);
  if (!res.ok) throw new Error(`Ressource introuvable (${res.status})`);
  const w = await res.json();
  const d = w.description;

  return {
    id,
    title: w.title,
    description:
      typeof d === 'string' ? d : d?.value || 'Aucune description disponible.',
    subjects: (w.subjects || []).slice(0, 8),
    cover: w.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${w.covers[0]}-L.jpg`
      : null,
  };
}

// ============================================================
// Assistant IA : Google Gemini (clé dans .env.local)
// ============================================================
const MODELS = [
  import.meta.env.VITE_AI_MODEL || 'gemini-flash-latest',
  'gemini-flash-lite-latest', // modèle de secours, plus léger
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function callModel(model, key, question) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: 'Tu es un assistant pédagogique pour étudiants en informatique. Réponds toujours en français, clairement, avec des exemples simples. Réponds à toute question posée.',
              },
            ],
          },
          contents: [{ role: 'user', parts: [{ text: question }] }],
        }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(
        data.error?.message || `Service IA indisponible (${res.status})`
      );
      err.status = res.status;
      throw err;
    }

    // On rassemble tous les morceaux de texte de la réponse
    const text = (data.candidates?.[0]?.content?.parts || [])
      .filter((p) => p.text && !p.thought)
      .map((p) => p.text)
      .join('');

    if (!text) throw new Error('Le modèle a renvoyé une réponse vide.');
    return text;
  } catch (e) {
    if (e.name === 'AbortError') {
      const err = new Error('Délai dépassé.');
      err.status = 503;
      throw err;
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

export async function askAI(question) {
  const key = import.meta.env.VITE_AI_API_KEY;
  if (!key) throw new Error('Clé API manquante (.env.local)');

  for (const model of [...new Set(MODELS)]) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        return await callModel(model, key);
      } catch (e) {
        if (e.status === 429) {
          // Trop de requêtes, on attend un peu avant de réessayer
          await wait(1000 * (attempt + 1));
        } else {
          throw e;
        }
      }
    }
  }

  throw new Error('Tous les modèles ont échoué.');
}