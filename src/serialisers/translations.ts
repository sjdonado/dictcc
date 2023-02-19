import { RawTranslation } from '../types'
import { getTranslationAudioURL } from '../services/api'

export default function translationsSerialiser(
  sourceLanguage: string,
  targetLanguage: string,
  rawTranslations: RawTranslation[],
) {
  return rawTranslations.map(translation => ({
    sourceTranslation: {
      text: translation.term1,
      audioUrl: getTranslationAudioURL(
        sourceLanguage,
        targetLanguage,
        translation.id,
      ),
    },
    targetTranslation: {
      text: translation.term2,
      audioUrl: getTranslationAudioURL(
        targetLanguage,
        sourceLanguage,
        translation.id,
      ),
    },
    entryType: translation.entry_type,
  }))
}
