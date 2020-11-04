import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const DOMPurify = createDOMPurify(window)

/**
 * @param {string} content
 */
export function clean(content) {
  return DOMPurify.sanitize(content)
}
