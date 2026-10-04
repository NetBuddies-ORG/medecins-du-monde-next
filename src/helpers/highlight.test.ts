import { describe, expect, it } from 'vitest'
import { highlight } from './highlight'

const mark = (s: string) => `<span class="highlight">${s}</span>`

describe('highlight', () => {
  it('highlights the typed text, whatever its case', () => {
    expect(highlight('Relogement', 'loge')).toBe(`Re${mark('loge')}ment`)
    expect(highlight('Relogement', 'RELO')).toBe(`${mark('Relo')}gement`)
  })

  it('matches accented letters from an unaccented query', () => {
    expect(highlight("Hébergement d'urgence", 'heber')).toBe(
      `${mark('Héber')}gement d'urgence`
    )
  })

  it('highlights every occurrence', () => {
    expect(highlight('Logement et relogement', 'logement')).toBe(
      `${mark('Logement')} et re${mark('logement')}`
    )
  })

  it('does not throw on regular expression characters (regression)', () => {
    // Typing "(" or "c++" used to throw "Invalid regular expression" and break the suggestions
    for (const typed of ['(', ')', '[', 'c++', '*', '?', '\\', 'a|b', '^$', '.']) {
      expect(() => highlight('Aide (urgence)', typed)).not.toThrow()
    }
  })

  it('searches those characters literally', () => {
    expect(highlight('Aide (urgence)', '(')).toBe(`Aide ${mark('(')}urgence)`)
    expect(highlight('C++ et C', 'c++')).toBe(`${mark('C++')} et C`)
    expect(highlight('1.5 km', '.')).toBe(`1${mark('.')}5 km`)
  })

  it('leaves the text unchanged when nothing matches', () => {
    expect(highlight('Relogement', 'xyz')).toBe('Relogement')
  })
})
