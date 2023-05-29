import { Direction, TranslationInput } from '@/types'

import translate, { Languages } from '..'

describe('dictcc', () => {
  it.each<TranslationInput>([
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      direction: Direction.LTR,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.es,
      direction: Direction.LTR,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.fr,
      direction: Direction.LTR,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.ro,
      direction: Direction.LTR,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      direction: Direction.LTR,
      // testing umlauts
      term: 'Abkürzung',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      direction: Direction.LTR,
      term: 'Chef',
    },
    {
      sourceLanguage: Languages.en,
      targetLanguage: Languages.de,
      direction: Direction.LTR,
      term: 'Tuesday',
    },

    {
      sourceLanguage: Languages.fr,
      targetLanguage: Languages.de,
      direction: Direction.LTR,
      term: 'terme',
    },
  ])(
    'returns $sourceLanguage->$targetLanguage translations for the term "$term"',
    async input => {
      expect(await translate(input)).toMatchSnapshot()
    },
  )

  it.each<TranslationInput>([
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.en,
      direction: Direction.RTL,
      term: 'Chef',
    },
  ])(
    'returns targetLanguage->sourceLanguage translations for the term "$term"',
    async input => {
      expect(await translate(input)).toMatchSnapshot()
    },
  )

  it.each<TranslationInput>([
    {
      sourceLanguage: Languages.de,
      targetLanguage: Languages.fi,
      direction: Direction.LTR,
      term: 'hello',
    },
  ])(
    'handles response for translation request with incorrect word (e.g. $sourceLanguage->$targetLanguage with "$term")',
    async input => {
      expect(await translate(input)).toMatchSnapshot()
    },
  )

  it.each<TranslationInput>([
    {
      sourceLanguage: 'asdf' as any,
      targetLanguage: Languages.de,
      direction: Direction.LTR,
      term: 'Begriff',
    },
    {
      sourceLanguage: Languages.de,
      targetLanguage: 'asdf' as any,
      direction: Direction.LTR,
      term: 'Begriff',
    },
  ])(
    'return error for $sourceLanguage->$targetLanguage translations',
    async ({ sourceLanguage, targetLanguage, direction, term }) => {
      const { data, error } = await translate({
        sourceLanguage,
        targetLanguage,
        direction,
        term,
      })
      expect(data).toBeUndefined()
      expect(error).toBeInstanceOf(Error)
      expect(error?.message).toBe(
        `The language ${sourceLanguage} or ${targetLanguage} is not supported!`,
      )
    },
  )
})
