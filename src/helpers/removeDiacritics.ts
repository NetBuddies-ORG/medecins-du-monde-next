/**
 * Remove diacritics in the specified text.
 * @param text {string} The text to process.
 * @returns the text without diacritics.
 */
export const removeDiacritics = (text: string) => text.normalize("NFD") // Normaliser les diacritiques
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les diacritiques
    .replace(/[^\w\s-]/g, "") // Supprimer tous les caractères spéciaux sauf les lettres, les chiffres, les espaces et les tirets
    .replace(/_/g, "") // Supprimer les underscores
    .toLowerCase() // Convertir en minuscules
    .replace(/\s+/g, "-") // Remplacer les espaces par des tirets
    .trim(); // Supprimer les espaces au début et à la fin


