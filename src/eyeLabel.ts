export default (s: string = '') => {
  const map: Record<string, string> = {
    L: 'Left Eye',
    R: 'Right Eye',
  }
  return map[s] || ''
}
