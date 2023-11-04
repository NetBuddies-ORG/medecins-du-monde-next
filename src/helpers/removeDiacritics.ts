/**
 * Remove diacritics in the specified text.
 * @param text {string} The text to process.
 * @returns the text without diacritics.
 */
export const removeDiacritics = (text) => text.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les diacritiques
    .replace(/[^\w\s-]/g, "") // Supprimer tous les caractères spéciaux sauf les lettres, les chiffres, les espaces et les tirets
    .replace(/_/g, "") // Supprimer les underscores
    .replace(/\s+/g, " ") // Remplacer les espaces consécutifs par un seul espace
    .replace(/(\s-)|(-\s)/g, "") // Supprimer les tirets avec un espace de chaque côté
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .toLowerCase() // Convertir en minuscules
    .trim(); // Supprimer les espaces au début et à la fin


