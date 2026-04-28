// js/modal.js
import { domElements } from '../DOM/elements.js';
import { renderArchive } from '../Services/inscriptionServices.js';


export function openModal() {
    if (domElements.modal) domElements.modal.showModal();
}

export function closeModal() {
    if (domElements.modal) domElements.modal.close();
}

// Fonction pour ouvrir
export function openArchiveDrawer() {
    const { drawer_archive, drawerOverlay } = domElements;
    
    // Afficher l'overlay
    drawerOverlay.classList.remove('hidden');
    setTimeout(() => drawerOverlay.classList.add('opacity-100'), 10);
    
    // Ouvrir le drawer
    drawer_archive.classList.remove('translate-x-full');
      renderArchive();
}

// Fonction pour fermer
export function closeArchiveDrawer() {
    const { drawer_archive, drawerOverlay } = domElements;
    
    // Cacher le drawer
    drawer_archive.classList.add('translate-x-full');
    
    // Cacher l'overlay avec une petite transition
    drawerOverlay.classList.remove('opacity-100');
    setTimeout(() => drawerOverlay.classList.add('hidden'), 300);
}




