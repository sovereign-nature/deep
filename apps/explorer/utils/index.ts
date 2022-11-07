export function splitCamelCase(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1).replace(/[A-Z]/g, ' $&')
}

export function truncate(value, charLength): string {
  if (typeof value === 'object') {
    return value
  } else {
    return value.toString().length > charLength
      ? value.toString().substring(0, charLength) + '...'
      : value
  }
}
