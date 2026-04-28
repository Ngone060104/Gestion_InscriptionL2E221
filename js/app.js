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

        
            // Sinon, on crée une nouvelle inscription
            createInscription(formData);
            showToast('success', 'Succès', `${formData.prenom} a été inscrit avec succès !`);
        

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




initApp();