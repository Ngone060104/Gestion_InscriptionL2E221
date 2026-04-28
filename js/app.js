import * as DOM from './DOM/elements.js';
import './pages/dashboard.js';
import './pages/popup.js';
import { domElements } from './DOM/elements.js';
import { openModal, closeModal, openArchiveDrawer, closeArchiveDrawer } from './UI/modalRenderer.js';
import { initNavigation } from './UI/navigationRenderer.js';
import { createInscription, renderArchive ,updateInscription} from '../js/Services/inscriptionServices.js'; // ou ton chemin vers createInscription
import { addStudentToTable } from '../js/UI/taskRenderer.js';
import { getInscription, saveInscriptions, initApp } from '../js/Stores/taskStores.js';
import { validateForm, clearErrors, showErrors } from '../js/Utiles/utile.js';
import { showToast, dismissToast } from './UI/messageRenderer.js';


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


domElements.restore.addEventListener('click', openArchiveDrawer);
domElements.btnCloseDrawer.addEventListener('click', closeArchiveDrawer);
domElements.drawerOverlay.addEventListener('click', closeArchiveDrawer);


domElements.BtnOpen.addEventListener('click', () => {
    editMode = false;
    currentEditId = null;
    domElements.formInscription.reset();
    clearErrors();
    document.querySelector('#modalInscription h3').textContent = "Nouvelle Inscription";
    openModal();
});


let editMode = false;
let currentEditId = null;

// Dans l'écouteur de clic de ton tbody
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


initApp();