/**
 * Remove diacritics in the specified text.
 * @param text {string} The text to process.
 * @returns the text without diacritics.
 */
export const removeDiacritics = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
