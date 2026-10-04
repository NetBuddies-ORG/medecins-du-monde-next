// Any vowel typed also matches the accented ones (and the other vowels, as before)
const ANY_VOWEL = '[aeiouàáâãäåæçèéêëìíîïðñòóôõöùúûüýÿ]'

/**
 * Wraps in `<span class="highlight">` the parts of `text` matching what the user typed.
 * The typed value is escaped first: characters like "(" or "+" are searched literally
 * instead of breaking the regular expression.
 */
export function highlight(text: string, typed: string): string {
  const escaped = typed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(escaped.replace(/[aeiou]/g, ANY_VOWEL), 'gi')
  return text.replace(regex, (match) => `<span class="highlight">${match}</span>`)
}
