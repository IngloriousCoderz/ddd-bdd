import slugify from 'slugify'

export { toId }

function toId(title: string): string {
  return slugify(title.toLowerCase())
}
