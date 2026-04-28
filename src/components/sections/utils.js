export function slugify(text) {
  return text.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function formatText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
}
