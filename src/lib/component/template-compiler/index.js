import parseTemplate from './parser'
import buldDOMTree from './dom-tree'


export default function compileTemplate(template) {
  const flatNodes = parseTemplate(template)
  const domTree = buldDOMTree(flatNodes)
  console.log('Template:', template)
  console.log('Flat Nodes:', flatNodes)
  console.log('DOM Tree:', domTree)
}