
// ══════════════════════════════════════════════════════════════════════════════
// STORE — localStorage
// ══════════════════════════════════════════════════════════════════════════════
// Cette fonction sert à récupérer la liste des contacts qui a été enregistrée dans la mémoire du navigateur (le localStorage).
const STORAGE_KEY   = "inscriptions";

export function getInscription() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveInscriptions(inscriptions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inscriptions));
}
