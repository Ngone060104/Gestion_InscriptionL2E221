import { getInscription, saveInscriptions } from '../Stores/taskStores.js';
import { domElements } from '../DOM/elements.js';
import { renderArchiveCard } from '../UI/taskRenderer.js';

export function createInscription(data) {
    const inscriptions = getInscription();
    const inscription = {
        id: Date.now(),
        prenom: data.prenom.trim(),
        nom: data.nom.trim(),
        email: data.email.trim().toLowerCase(),
        telephone: data.telephone.trim(),
        adresse: data.adresse.trim(),
        niveau: data.select_niveau,
        filiere: data.select_filiere,
        etat: true,
        date: new Date().toLocaleDateString("fr-FR", {
            day: "2-digit", month: "short", year: "numeric"
        }),
    };
    inscriptions.push(inscription);
    saveInscriptions(inscriptions);
    return inscription;
}


export function renderArchive() {
    const inscriptions = getInscription();
    // On ne prend que ceux qui sont archivés (status === false)
    const archivedStudents = inscriptions.filter(inst => inst.etat === false);

    // On vide la liste actuelle dans le Drawer
    domElements.archive_list.innerHTML = '';
        // 3. IMPORTANT : On cache la barre de groupe à chaque rechargement
    const groupActions = document.getElementById('group_actions');
    if (groupActions) groupActions.classList.add('hidden');

    if (archivedStudents.length === 0) {
        domElements.archive_list.innerHTML = `
        <div class="flex flex-col items-center justify-center h-full text-center opacity-40">
            <div class="text-center py-10 opacity-40">
              <i class="fa-solid fa-box-archive text-5xl mb-3 text-gray-300"></i>
                <p class="text-sm font-medium text-gray-500">Aucun élément archivé</p>
                </div>
            </div>
            `;
        return;
    }
    // On injecte chaque carte
    archivedStudents.forEach(student => {
        const card = renderArchiveCard(student);
        domElements.archive_list.appendChild(card);
    });
}

export function updateInscription(id, data) {
    const inscriptions = getInscription();
    const index = inscriptions.findIndex((inst) => inst.id === Number(id));
    if (index === -1) return null;
    inscriptions[index] = {
        ...inscriptions[index],
        prenom : data.prenom.trim(),
        nom : data.nom.trim(),
        email : data.email.trim().toLowerCase(),
        telephone : data.telephone.trim(),
        adresse : data.adresse.trim(),
        niveau : data.select_niveau,
        filiere : data.select_filiere,
    };
    saveInscriptions(inscriptions);
    return inscriptions[index];
}

export function getFiltered() {
    const listesInscriptions = getInscription()
    const q = domElements.search.value.toLowerCase().trim(); 
    if (!q) return listesInscriptions; 

    return listesInscriptions.filter((inst) =>
        `${inst.nom} ${inst.prenom} ${inst.adresse} ${inst.email} ${inst.telephone} ${inst.niveau} ${inst.filiere}`
            .toLowerCase()
            .includes(q)
    );
}
export function getInscriptionById(id) {
    return getInscription().find((inst) => inst.id === id) || null;
}

export function deleteInscription(id) {
    saveInscriptions(getInscription().filter((inst) => inst.id !== id));
}


export function updateDashboardStats () {
    const inscriptions = getInscription(); // Récupère tout depuis le localStorage
   const aujourdhui = new Date().toLocaleDateString("fr-FR", {
        day: "2-digit", month: "short", year: "numeric"
    });

    // 1. Calculer le total des inscrits (etat === true)
    const totalActifs = inscriptions.filter(inst => inst.etat === true).length;

    // 2. Calculer les inscriptions faites AUJOURD'HUI
    const inscritsJour = inscriptions.filter(inst => inst.date === aujourdhui && inst.etat === true).length;

    // 3. Calculer le total des archivés (etat === false)
    const totalArchives = inscriptions.filter(inst => inst.etat === false).length;

    // Injection dans le HTML (Sécurisé avec des vérifications d'éléments)
    const elInscrits = document.getElementById('stat_total_inscrits');
    const elJour = document.getElementById('stat_inscriptions_jour');
    const elArchives = document.getElementById('stat_total_archives');

    if (elInscrits) elInscrits.textContent = totalActifs;
    if (elJour) elJour.textContent = inscritsJour;
    if (elArchives) elArchives.textContent = totalArchives;
};
