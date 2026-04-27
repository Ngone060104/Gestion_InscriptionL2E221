// js/modal.js
import { domElements } from '../DOM/elements.js';

export function openModal() {
    if (domElements.modal) domElements.modal.showModal();
}

export function closeModal() {
    if (domElements.modal) domElements.modal.close();
}