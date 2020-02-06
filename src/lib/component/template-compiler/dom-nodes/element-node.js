import { setWatcher } from '../../../watcher'
import { ElementNode } from '../parser'


function handleJif(arg) {
  const expression = new Function('return ' + arg)
  return ctx => expression.call(ctx)
}

function handleJfor(arg) {

}

function setDirectives({ jFor, jIf }) {
  let rv = {}

  if (jIf) {
    rv.jIf = handleJif(jIf)
  }

  if (jFor) {

  }

  return rv
}


export default class JacobDOMElementNode {
  /**  @param {ElementNode} node  */
  constructor(node) {
    this.children = []

    this._el = document.createElement(node.name)
    
    this._staticAttrs = node.staticAttrs
    this._dynamicAttrs = setDynamicAttrs(node.dynamicAttrs)
    this._directives = setDirectives(node.directives)
  }
}


function createElement(name, data, children) {

  const el = document.createElement(name)

  

}