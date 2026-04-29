
import '../Stores/taskStores.js';
import { domElements } from '../DOM/elements.js';

// js/UI/tableRenderer.js
export function addStudentToTable(student, container) {
    const tr = document.createElement('tr');
    tr.className = "hover:bg-pink-50 transition-colors border-b border-gray-100";
    tr.dataset.id = student.id;
    tr.innerHTML = `
    <td class="px-6 py-4 text-sm text-gray-800 font-medium text-left ">${student.prenom}</td>
    <td class="px-6 py-4 text-sm text-gray-800 font-medium text-left ">${student.nom}</td>
        <td class="px-6 py-4 text-sm text-gray-600 font-medium text-left  ">${student.email}</td>
        <td class="px-6 py-4 text-sm text-gray-600 font-medium text-left ">${student.adresse}</td>
        <td class="px-6 py-4 text-sm font-mono text-gray-600 font-medium text-left  ">${student.telephone}</td>
       <td class="px-6 py-4 text-sm text-gray-600 font-medium text-left "> ${student.niveau} ${student.filiere}</td>
        <td class="px-6 py-4">
            <div class="flex justify-center gap-3">
                <button class="text-green-600 hover:scale-110 transition-transform"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="text-red-600 hover:scale-110 transition-transform"><i class="fa-solid fa-trash"></i></button>
                <button class="text-blue-600 hover:scale-110 transition-transform"><i class="fa-solid fa-eye"></i></button>
            </div>
        </td>
    `;

    return tr
}


// js/UI/archiveRenderer.js
export function renderArchiveCard(student) {
    const div = document.createElement('div');
    div.className = "p-4 bg-white rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-pink-200 transition-all group";

    div.innerHTML = `
        <!-- Checkbox stylée -->
        <input type="checkbox" class="archive-check w-5 h-5 rounded-md border-gray-300 text-[#bc1474] focus:ring-[#bc1474] cursor-pointer" data-id="${student.id}">
        
        <!-- Infos Étudiant -->
        <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
                <p class="text-sm font-bold text-gray-800 truncate">${student.prenom} ${student.nom}</p>
                <span class="px-2 py-0.5 bg-pink-50 text-[#bc1474] text-[9px] font-bold rounded-full uppercase tracking-wider">
                    ${student.niveau}
                </span>
            </div>
            
            <!-- Petite grille d'infos secondaires -->
            <div class="grid grid-cols-1 gap-y-0.5">
                <div class="flex items-center text-[10px] text-gray-500 gap-1.5">
                    <i class="fa-solid fa-envelope w-3 text-gray-300"></i>
                    <span class="truncate">${student.email}</span>
                </div>
                <div class="flex items-center text-[10px] text-gray-500 gap-1.5">
                    <i class="fa-solid fa-phone w-3 text-gray-300"></i>
                    <span>${student.telephone}</span>
                </div>
                <div class="flex items-center text-[10px] text-gray-400 gap-1.5 italic mt-1">
                    <i class="fa-solid fa-graduation-cap w-3"></i>
                    <span class="truncate">${student.filiere}</span>
                </div>
            </div>
        </div>

        <!-- Action de restauration directe -->
        <button class="btn-restore-direct w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-[#bc1474] hover:text-white transition-all shadow-sm" data-id="${student.id}" title="Restaurer">
            <i class="fa-solid fa-arrow-rotate-left text-xs"></i>
        </button>
    `;
    return div;
}





