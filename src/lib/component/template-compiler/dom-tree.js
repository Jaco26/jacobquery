import { ElementNode, TextNode } from './parser'



/**
 * 
 * @param {Array<ElementNode|TextNode>} flatNodes 
 */
export default function buildDOMTree(flatNodes) {

  const stack = []

  flatNodes.forEach(node => {
    if (node instanceof TextNode) {

    } else if (node instanceof ElementNode) {

    }
  })
}
