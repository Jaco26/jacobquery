import parseTemplate from './parser'
import buldDOMTree from './dom-tree'


export default function compileTemplate(template) {
  const flatNodes = parseTemplate(template)
  console.log(template)
  console.log(flatNodes)
  // const domNodeTree = buildDomNodeTree(template, flatNodes)
}