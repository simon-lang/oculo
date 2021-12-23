import { parse, format } from 'date-fns'

export default (s: string) => {
  const date = parse(s, 'yyyy-MM-dd', new Date())
  return format(date, 'd MMM, yyyy')
}
