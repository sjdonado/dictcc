import fetch from 'node-fetch'

import { ApiResponse, TranslationInput } from '../types'

export const getTranslationQuery = ({
  sourceLanguage,
  targetLanguage,
  term,
}: TranslationInput) => {
  const url = new URL('https://www.dict.cc/syn/app_translations.php')

  url.searchParams.set('s', term)
  url.searchParams.set(
    'lp',
    `${sourceLanguage.toUpperCase()}${targetLanguage.toUpperCase()}`,
  )

  return url.href
}

export const fetchTranslations = async (url: string): Promise<ApiResponse> => {
  const headers = {
    Host: 'www.dict.cc',
    'User-Agent':
      'Mozilla/5.0 (iPad; CPU OS 16_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Accept-Language': 'en-GB,en;q=0.9',
  }

  const data = await fetch(url, {
    method: 'GET',
    headers,
  })

  const apiResponse = (await data.json()) as ApiResponse

  return apiResponse
}

export const getTranslationAudioURL = (
  sourceLanguage: string,
  targetLanguage: string,
  translationId: number,
) =>
  `https://audio.dict.cc/speak.audio.v2.php?type=mp3&id=${translationId}&lang=${sourceLanguage}_rec_ip&lp=${sourceLanguage.toUpperCase()}${targetLanguage.toUpperCase()}`
