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

// Fonction pour ouvrir le modal
export function openDeleteModal() {
    const overlay = document.getElementById('modalDelete');
    const modalBox = overlay.firstElementChild;

    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-all');
    
    modalBox.classList.remove('scale-[0.94]');
    modalBox.classList.add('scale-100');
}

// Fonction pour fermer le modal
export function closeDeleteModal() {
    const overlay = document.getElementById('modalDelete');
    const modalBox = overlay.firstElementChild;

    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100', 'pointer-events-all');
    
    modalBox.classList.add('scale-[0.94]');
    modalBox.classList.remove('scale-100');
}





