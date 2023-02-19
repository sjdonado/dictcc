import { ApiResponse } from '../types'

const parseToPlainText = (htmlString: string) => {
  return htmlString
    .replace(/&nbsp;/g, ' ')
    .replace(/<br>/g, ' ')
    .replace(/(<[^>]*>)|(\t;?)/g, '')
    .replace(/\s+/g, ' ')
}

export default function inflectionsSerialiser(apiResponse: ApiResponse) {
  return {
    headers: parseToPlainText(apiResponse.inflections_info),
    text: parseToPlainText(apiResponse.inflections)
      .replace(/\b[A-Z]+\b/g, '|')
      .slice(1),
  }
}
