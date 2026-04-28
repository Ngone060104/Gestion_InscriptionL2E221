
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


export function renderArchiveCard(student) {
    const div = document.createElement('div');
    div.className = "p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm";
    div.innerHTML = `
        <div>
            <p class="text-sm font-bold text-gray-800">${student.prenom} ${student.nom}</p>
            <p class="text-[10px] text-gray-500">${student.email} ${student.adresse}</p>
            <p class="text-[10px] text-gray-500">${student.telephone} ${student.niveau}</p>
            <p class="text-[10px] text-gray-500">${student.filiere}</p>
        </div>
        <button class="btn-restore text-[#bc1474] hover:bg-pink-100 p-2 rounded-full transition-colors" data-id="${student.id}" title="Restaurer">
            <i class="fa-solid fa-rotate-left"></i>
        </button>
    `;
    return div;
}




