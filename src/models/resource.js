// Transforme une réponse brute de l'API en objet propre
export function createResource(raw) {
  return {
    id: raw.key.replace('/works/', ''),
    title: raw.title,
    author: (raw.author_name || ['Auteur inconnu'])[0],
  };
}