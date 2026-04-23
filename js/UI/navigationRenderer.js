// js/UI/navigationRenderer.js
import { domElements } from '../DOM/elements.js';

export const initNavigation = () => {
    const { sidebar, overlay } = domElements;

    const toggle = () => {
        sidebar.classList.toggle('-translate-x-full');
        overlay.classList.toggle('hidden');
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('.btn-menu') || e.target.closest('.btn-close') || e.target === overlay) {
            toggle();
        }
    });
};
