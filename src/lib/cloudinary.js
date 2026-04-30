/**
 * Inject Cloudinary transforms into an upload URL.
 * Turns: .../image/upload/v123/photo.jpg
 * Into:  .../image/upload/f_auto,q_auto,w_400/v123/photo.jpg
 *
 * @param {string} url  — raw Cloudinary URL
 * @param {number} [w]  — optional width constraint
 * @returns {string}
 */
export function cld(url, w) {
  if (!url || !url.includes('res.cloudinary.com')) return url
  const transforms = w ? `f_auto,q_auto,w_${w}` : 'f_auto,q_auto'
  return url.replace('/image/upload/', `/image/upload/${transforms}/`)
}
