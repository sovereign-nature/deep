import { format, fromUnixTime, addMinutes } from 'date-fns'

export function splitCamelCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
}

export function truncate(value: any, charLength: number): string {
  if (typeof value === 'object') {
    return value
  } else {
    return value.toString().length > charLength
      ? value.toString().substring(0, charLength) + '...'
      : value
  }
}

export function ipfsToUrl(address: string): string {
  return `https://ipfs.io/ipfs/${address.substring(7)}`
}

export function convertToSimpleFormat(timestamp: number): string {
  const date = fromUnixTime(timestamp)
  const utcDate = addMinutes(date, date.getTimezoneOffset())
  const simpleFormatDate = format(utcDate, 'dd/MM/yyyy')
  const simpleFormatHour = format(utcDate, 'HH:mm:ss')

  return `${simpleFormatDate} ${simpleFormatHour} UTC`
}
