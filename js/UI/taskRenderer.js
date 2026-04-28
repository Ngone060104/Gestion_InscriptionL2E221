
import '../Stores/taskStores';
import { getInscription, saveInscriptions } from '../Stores/taskStores';

export function createInscription(data) {
    const inscriptions = getInscription();
    const inscription = {
        id: Date.now(),
        prenom: data.prenom.trim(),
        nom: data.nom.trim(),
        email: data.email.trim().toLowerCase(),
        telephone: data.telephone.trim(),
        adresse: data.telephone.trim(),
        niveau: data.select_niveau,
        filiere: data.select_filiere,
        createdAt: new Date().toLocaleDateString("fr-FR", {
            day: "2-digit", month: "short", year: "numeric"
        }),
    };
    inscriptions.push(inscription);
    saveInscriptions(inscriptions);
    return inscription;
}