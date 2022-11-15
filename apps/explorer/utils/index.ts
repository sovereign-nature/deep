import { toDate, format } from 'date-fns'

export function splitCamelCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
}

export function truncate(value: string, charLength: number): string {
  if (typeof value === 'object') {
    return value
  } else {
    return value.toString().length > charLength
      ? value.toString().substring(0, charLength) + '...'
      : value
  }
}

export function convertToSimpleFormat(date: number): string {
  const convertedDate = toDate(date)
  const simpleFormatDate = format(convertedDate, 'MM/dd/yyyy')
  const simpleFormatHour = format(convertedDate, 'HH:mm:ss')

  return `${simpleFormatDate} | ${simpleFormatHour}`
}
