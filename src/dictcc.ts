import { Languages } from './constants/enum'
import { TranslationInput, DictccResponse } from './types'
import { getTranslationQuery, fetchTranslations } from './services/api'
import translationsSerialiser from './serialisers/translations'
import inflectionsSerialiser from './serialisers/inflections'

const EMPTY_RESPONSE: DictccResponse = {
  data: {
    translations: [],
    inflections: undefined,
  },
  url: undefined,
  error: undefined,
}

export default async (input: TranslationInput): Promise<DictccResponse> => {
  const { sourceLanguage, targetLanguage, term } = input

  // this should ideally never happen as the input is typed.
  if (!Languages[sourceLanguage] || !Languages[targetLanguage]) {
    return {
      data: undefined,
      url: undefined,
      error: new Error(
        `The language ${sourceLanguage} or ${targetLanguage} is not supported!`,
      ),
    }
  }

  if (term.length === 0) {
    return EMPTY_RESPONSE
  }

  const url = getTranslationQuery(input)

  try {
    const apiResponse = await fetchTranslations(url)

    if (apiResponse.translations.length === 0) {
      return EMPTY_RESPONSE
    }

    apiResponse.translations.sort((a, b) => a.sort_num - b.sort_num)

    const translations = translationsSerialiser(
      sourceLanguage,
      targetLanguage,
      apiResponse.translations,
    )

    const inflections = inflectionsSerialiser(apiResponse)

    return {
      data: {
        translations,
        inflections,
      },
      url,
      error: undefined,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        data: undefined,
        url,
        error,
      }
    }
  }

  return {
    data: undefined,
    url,
    error: new Error('Unknown error'),
  }
}
