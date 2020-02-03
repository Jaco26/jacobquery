import { ElementNode, TextNode } from './parser'


/**
 * 
 * @param {Array<ElementNode|TextNode>} flatNodes 
 */
export default function buildDOMTree(flatNodes) {

  /** @type {ElementNode[]} */
  const stack = []

  for (let i = 0; i < flatNodes.length; i++) {
    const node = flatNodes[i]
    if (node instanceof TextNode) {
      stack[stack.length - 1].children.push(node)
    } else if (node instanceof ElementNode) {
      if (node.kind === 'opening') {
        stack.push(node)
      } else if (node.kind === 'selfClosing') {
        stack[stack.length - 1].children.push(node)
      } else if (node.kind === 'closing') {
        const itemsWhichThisNodeEncloses = stack.pop()
        if (stack.length) {
          stack[stack.length - 1].children.push(itemsWhichThisNodeEncloses)
        } else {
          return { root: itemsWhichThisNodeEncloses }
        }
      } 
    }
  }
}


// for (let i = 0; i < nodes.length; i++) {
//   let node = nodes[i]

//   if (node.kind === 'text') {
//     stack[stack.length - 1].children.push(...node.content)
//   } else if (node.kind === 'opening') {
//     stack.push(extendNode(node))
//   } else if (node.kind === 'selfClosing') {
//     stack[stack.length - 1].children.push(extendNode(node))
//   } else if (node.kind === 'closing') {
//     const itemsWhichThisNodeEncloses = stack.pop()
//     if (stack.length) {
//       stack[stack.length - 1].children.push(itemsWhichThisNodeEncloses)
//     } else {
//       return { root: itemsWhichThisNodeEncloses }
//     }
//   }
// }