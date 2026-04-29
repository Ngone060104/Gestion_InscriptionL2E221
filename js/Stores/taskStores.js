
// ══════════════════════════════════════════════════════════════════════════════
// STORE — localStorage
// ══════════════════════════════════════════════════════════════════════════════
// Cette fonction sert à récupérer la liste des contacts qui a été enregistrée dans la mémoire du navigateur (le localStorage).
const STORAGE_KEY   = "inscriptions";
import { domElements } from '../DOM/elements.js';
import { addStudentToTable } from '../UI/taskRenderer.js';

export function getInscription() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveInscriptions(inscriptions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inscriptions));
}


export function initApp( data = null ) {
    const inscriptions = data || getInscription(); 

    // 2. Vérifier si on a un tableau et si on est sur la bonne page
    if (inscriptions.length > 0 && domElements.tableBody) {
        const visibleInscriptions = inscriptions.filter(inscrit => inscrit.etat === true);
        // Vider le tableau au cas où (pour éviter les doublons)
        domElements.tableBody.innerHTML = '';

        // 3. Boucler sur chaque inscription pour l'afficher
        visibleInscriptions.forEach(inscrit => {
            const row = addStudentToTable(inscrit);
            domElements.tableBody.appendChild(row);
        });
    }
}



