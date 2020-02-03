import parseTemplate from './parser'
import buldDOMNodeTree from './dom-node-tree'


export default function compileTemplate(template) {
  const flatNodes = parseTemplate(template)
  console.log(flatNodes)
  const DOMNodeTree = buldDOMNodeTree(flatNodes)
  return ctx => DOMNodeTree.root.render(ctx)
}