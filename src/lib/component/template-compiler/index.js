import parseTemplate from './parser'
import buldDOMNodeTree from './dom-node-tree'


export default function compileTemplate(template) {
  const flatNodes = parseTemplate(template)
  const DOMNodeTree = buldDOMNodeTree(flatNodes)

  return ctx => DOMNodeTree.root.render(ctx)
  


  // console.log('Template:', template)
  // console.log('Flat Nodes:', flatNodes)
  // console.log('DOM Tree:', DOMNodeTree)
}