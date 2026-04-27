// js/main.js
import { openModal, closeModal } from '../UI/modalRenderer.js';
import { domElements } from '../DOM/elements.js'; // Importe l'objet global



// Attacher les événements
if (domElements.BtnOpen)domElements.BtnOpen.addEventListener('click', openModal);
if (domElements.BtnClose) domElements.BtnClose.addEventListener('click', closeModal);
