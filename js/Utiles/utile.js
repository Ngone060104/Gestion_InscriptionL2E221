import { getInscription } from "../Stores/taskStores.js";

const isEmailTaken = (email, currentId, usersList) => {
    return usersList.some(user =>
        user.email.toLowerCase() === email.trim().toLowerCase() && user.id !== currentId
    );
};
const isContactTaken = (telephone, currentId, usersList) => {
    return usersList.some(user =>
        user.telephone.toLowerCase() === telephone.trim().toLowerCase() && user.id !== currentId
    );
};

const PHONE_REGEX = /^(70|71|75|76|77|78)\d{7}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export function showErrors(errors) {
    clearErrors();
    // Liste exacte de tes IDs d'inputs
    const fields = ["prenom", "nom", "email", "adresse", "telephone", "select_niveau", "select_filiere"];

    fields.forEach((f) => {
        // On cible le span qui s'appelle 'error-prenom', etc.
        const errEl = document.getElementById(`error-${f}`);
        const inputEl = document.getElementById(f);

        if (errors[f] && errEl) {
            errEl.textContent = errors[f];
        }
    });
}

export function clearErrors() {
    const fields = ["prenom", "nom", "email", "adresse", "telephone", "select_niveau", "select_filiere"];
    fields.forEach((f) => {
        const errEl = document.getElementById(`error-${f}`);
        const inputEl = document.getElementById(f);
        if (errEl) errEl.textContent = "";
    });
}


// Effacer l'erreur au focus
// Effacer l'erreur au focus (Corrigé avec tes IDs réels)
["prenom", "nom", "email", "telephone", "adresse","select_niveau", "select_filiere"].forEach((f) => {
    const inputEl = document.getElementById(f);
    if (inputEl) {
        inputEl.addEventListener("input", () => {
            const errEl = document.getElementById(`error-${f}`);
            if (errEl) errEl.textContent = "";
        });
    }
});


export function validateForm(data, currentId = null) {
    const errors = {};
    const inscriptions = getInscription();

    if (!data.prenom.trim())
        errors.prenom = "Le prénom est requis.";

    if (!data.nom.trim())
        errors.nom = "Le nom est requis.";

    if (!data.email.trim())
        errors.email = "L'email est requis.";
    else if (!EMAIL_REGEX.test(data.email.trim()))
        errors.email = "Format invalide. Ex: nom@domaine.com";
    else if (isEmailTaken(data.email, currentId, inscriptions)) { // Appel de la fonction
        errors.email = "Cet email appartient déjà à quelqu'un.";
    }
    if (!data.telephone.trim())
        errors.telephone = "Le numéro est requis.";
    else if (!PHONE_REGEX.test(data.telephone.trim()))
        errors.telephone = "Format invalide. Ex: 771234567 (70/71/75/76/77/78 + 7 chiffres)";
    else if (isContactTaken(data.telephone, currentId, inscriptions)) { // Appel de la fonction
        errors.telephone = "Ce numéro appartient déjà à quelqu'un.";
    }

    if (!data.adresse.trim())
        errors.adresse = "L'adresse est requise.";

    if (!data.select_niveau)
        errors.select_niveau = "Veuillez choisir un niveau.";
    if (!data.select_filiere)
        errors.select_filiere = "Veuillez choisir une filiere.";

    return errors;
}