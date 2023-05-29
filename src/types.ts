import { Languages } from './constants/enum'

export enum Direction {
  LTR = '1',
  RTL = '2',
}

export type TranslationInput = {
  sourceLanguage: Languages
  targetLanguage: Languages
  direction: Direction
  term: string
}

export type RawTranslation = {
  id: number
  term1: string
  term2: string
  entry_type: string
  sort_num: number
}

export type ApiResponse = {
  translations: RawTranslation[]
  inflections: string
  inflections_repl: string
  inflections_info: string
}

export type Inflections = {
  headers: string
  text: string
}

export type Translation = {
  text: string
  audioUrl: string
}

export type Translations = {
  sourceTranslation: Translation
  targetTranslation: Translation
  entryType: string
}

export type DictccResponse = {
  data?: {
    translations: Translations[]
    inflections?: Inflections
  }
  error?: Error
  url?: string
}
