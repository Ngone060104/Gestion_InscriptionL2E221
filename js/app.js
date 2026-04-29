import * as DOM from './DOM/elements.js';
import './pages/dashboard.js';
import './pages/popup.js';
import { domElements } from './DOM/elements.js';
import { openModal, closeModal, openArchiveDrawer, closeArchiveDrawer, openDeleteModal, closeDeleteModal, openRestoreModal, closeRestoreModal } from './UI/modalRenderer.js';
import { initNavigation } from './UI/navigationRenderer.js';
import { createInscription, renderArchive, updateInscription, getFiltered, getInscriptionById, deleteInscription, updateDashboardStats } from '../js/Services/inscriptionServices.js'; // ou ton chemin vers createInscription
import { addStudentToTable } from '../js/UI/taskRenderer.js';
import { getInscription, saveInscriptions, initApp } from '../js/Stores/taskStores.js';
import { validateForm, clearErrors, showErrors } from '../js/Utiles/utile.js';
import { showToast, dismissToast } from './UI/messageRenderer.js';

let selectedIds = new Set();
let pendingDeleteId = null;
let pendingRestoreId = null

if (domElements.formInscription) {
    domElements.formInscription.addEventListener('submit', (e) => {
        console.log("coucou")
        e.preventDefault();

        clearErrors()

        const formData = {
            prenom: document.getElementById('prenom').value,
            nom: document.getElementById('nom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            adresse: document.getElementById('adresse').value,
            select_niveau: document.getElementById('select_niveau').value,
            select_filiere: document.getElementById('select_filiere').value
        };

        const errors = validateForm(formData, editMode ? currentEditId : null);

        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }
        if (editMode) {
            updateInscription(currentEditId, formData);
            showToast('success', 'Mis à jour', `${formData.prenom} a été modifié !`);
            editMode = false;
            currentEditId = null;
        } else {
            // Sinon, on crée une nouvelle inscription
            createInscription(formData);
            showToast('success', 'Succès', `${formData.prenom} a été inscrit avec succès !`);
        }


        // On rafraîchit tout le tableau pour voir les changements
        initApp();
        domElements.formInscription.reset();
        closeModal();

    });
}

if (domElements.annuler) {
    domElements.annuler.addEventListener('click', () => {
        closeModal()
        clearErrors()
        domElements.formInscription.reset()
    })
}

if (domElements.restore) {
    domElements.restore.addEventListener('click', () => {
        openArchiveDrawer()
        renderArchive()
    });
}
if (domElements.btnCloseDrawer) {
    domElements.btnCloseDrawer.addEventListener('click', closeArchiveDrawer);
}
if (domElements.drawerOverlay) {
    domElements.drawerOverlay.addEventListener('click', closeArchiveDrawer);
}

if(domElements.BtnOpen) {
domElements.BtnOpen.addEventListener('click', () => {
    editMode = false;
    currentEditId = null;
    domElements.formInscription.reset();
    clearErrors();
    document.querySelector('#modalInscription h3').textContent = "Nouvelle Inscription";
    openModal();
});
}


let editMode = false;
let currentEditId = null;

// Dans l'écouteur de clic de ton tbody
if(domElements.tableBody){
domElements.tableBody.addEventListener('click', (e) => {
    const editBtn = e.target.closest('.text-green-600'); // Ton bouton vert
    if (editBtn) {
        console.log("Clic sur modifier détecté !");
        const tr = editBtn.closest('tr');
        const id = Number(tr.dataset.id);
        const inscriptions = getInscription();
        const student = inscriptions.find(inst => inst.id == id);

        if (student) {
            // 1. Activer le mode édition
            editMode = true;
            currentEditId = id;


            // 2. Remplir les champs du formulaire
            domElements.prenom.value = student.prenom;
            domElements.nom.value = student.nom;
            domElements.email.value = student.email;
            domElements.telephone.value = student.telephone;
            domElements.adresse.value = student.adresse;
            domElements.select_niveau.value = student.niveau;
            domElements.select_filiere.value = student.filiere;

            // 3. Changer le titre de la modale pour l'UX
            document.querySelector('#modalInscription h3').textContent = "Modifier l'inscription";

            // 4. Ouvrir la modale
            openModal();
        }
    }
});
}

if(domElements.search){
domElements.search.addEventListener("input", function () {
    console.log("recherche activée");

    const inscriptionFiltrés = getFiltered()
    initApp(inscriptionFiltrés)
})
}


if(domElements.tableBody){
domElements.tableBody.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.text-red-600'); // Ton bouton rouge
    if (deleteBtn) {
        const tr = deleteBtn.closest('tr');
        console.log("Clic sur supprimé détecté !");
        const id = Number(tr.dataset.id); // On récupère l'ID sur le TR
        const inscriptions = getInscription()
        const student = inscriptions.find(inst => inst.id === id);

        if (student) {
            pendingDeleteId = id;
            // Correction des noms : prenom et nom au lieu de firstName/lastName
            domElements.modalDeleteDesc.textContent = `Voulez-vous vraiment Supprimer ${student.prenom} ${student.nom} ? Cette action est irréversible.`;
            openDeleteModal(); // Utilise la fonction qu'on a créée
        }
    }

})
}
// 
if(domElements.modalDeleteConfirm){
domElements.modalDeleteConfirm.addEventListener("click", () => {

    console.log("Action d'archivage lancée...")
    if (!pendingDeleteId) return;
    let inscriptions = getInscription()
    const index = inscriptions.findIndex(inst => inst.id === pendingDeleteId);
    if (index !== -1) {
        const student = inscriptions[index]
        const fullName = `{${student.prenom} ${student.nom}`
        inscriptions[index].etat = false
        saveInscriptions(inscriptions)
        closeDeleteModal()
        initApp()
        showToast("danger", "Contact supprimé", `${fullName}  a été supprimé avec succès.`);
    } else {
        console.error("Erreur : Étudiant non trouvé avec l'ID", pendingDeleteId);
    }

    pendingDeleteId = null
});

}
if(domElements.modalDeleteCancel){
domElements.modalDeleteCancel.addEventListener("click", () => {
    closeDeleteModal()
    pendingDeleteId = null

})
}

// A. Gérer l'affichage de la barre groupée
if(domElements.archive_list){
domElements.archive_list.addEventListener('change', (e) => {
    if (e.target.classList.contains('archive-check')) {
        const checkedBoxes = document.querySelectorAll('.archive-check:checked');
        const count = checkedBoxes.length;
        const groupActions = document.getElementById('group_actions');
        const countSpan = document.getElementById('selected_count');
        const btnRestoreGroup = document.getElementById('btn_restore_group');

        if (count >= 3) {
            groupActions.classList.remove('hidden');
            countSpan.textContent = `${checkedBoxes.length} sélectionné(s)`;
            btnRestoreGroup.disabled = false;
        } else {
            groupActions.classList.add('hidden');
        }
    }
});
}
// B. Restauration GROUPÉE
document.getElementById('btn_restore_group')?.addEventListener('click', () => {
    const checkedBoxes = document.querySelectorAll('.archive-check:checked');
    pendingRestoreId = Array.from(checkedBoxes).map(box => Number(box.dataset.id));
    if (pendingRestoreId.length > 0) {
        document.getElementById('modalRestoreDesc').textContent = `Voulez-vous restaurer les ${pendingRestoreId.length} inscrits sélectionnés ?`
        openRestoreModal()
    }
});
if(document.getElementById("modalRestoreConfirm")){
document.getElementById("modalRestoreConfirm").addEventListener("click", () => {
    if (pendingRestoreId) {
        processRestoration(pendingRestoreId);
    }
    closeRestoreModal()
    pendingRestoreId = null
})
}

if(document.getElementById("modalRestoreCancel")){
document.getElementById("modalRestoreCancel").addEventListener("click", () => {
    closeRestoreModal()
})
}

// C. Restauration DIRECTE
if(domElements.archive_list){
domElements.archive_list.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-restore-direct');
    if (btn) {
        const idAExtraire = Number(btn.dataset.id)
        pendingRestoreId = [idAExtraire]
        document.getElementById('modalRestoreDesc').textContent = "Voulez-vous remettre cet étudiant dans la liste principale ?";
        openRestoreModal()
    }
});
}

// Fonction commune de restauration
function processRestoration(ids) {
    let inscriptions = getInscription();
    inscriptions.forEach(inst => {
        if (ids.includes(inst.id)) inst.etat = true;
    });

    saveInscriptions(inscriptions);

    // Refresh
    renderArchive();
    initApp();
    document.getElementById('group_actions').classList.add('hidden');
    showToast('success', 'Restauration réussie', 'Les inscrits sont de retour.');
}






initApp();

document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
});