import * as DOM from './DOM/elements.js';
import './pages/dashboard.js';
import './pages/popup.js';
import { domElements } from './DOM/elements.js';
import { openModal, closeModal } from './UI/modalRenderer.js';
import { initNavigation } from './UI/navigationRenderer.js';
import { createInscription } from '../js/Services/inscriptionServices.js'; // ou ton chemin vers createInscription
import { addStudentToTable } from '../js/UI/taskRenderer.js';
import { getInscription, saveInscriptions, initApp } from '../js/Stores/taskStores.js';
import { validateForm ,clearErrors ,showErrors} from '../js/Utiles/utile.js';


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

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            showErrors(errors);
            return;
        }


        const newInscription = createInscription(formData);
        const row = addStudentToTable(newInscription);
        if (domElements.tableBody) {
            domElements.tableBody.appendChild(row);
        }

        domElements.formInscription.reset();
        closeModal();
    });
}

initApp();