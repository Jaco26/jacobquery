
import setWatcher from '../../watcher'
import { ElementNode, TextNode } from './parser'

class JacobDOMElementNode {
  /**
   * 
   * @param {ElementNode} node 
   */
  constructor(node) {
    this.children = []

    this._el = document.createElement(node.name)
    this._directives = this._setDirectives(node.directives)
    this._staticAttrs = node.staticAttrs
    this._dynamicAttrs = node.dynamicAttrs
  }

  _setDirectives(directives) {
    return Object.keys(directives).reduce((accum, key) => {
      if (directives[key]) {
        const expression = new Function('return ' + directives[key])
        accum[key] = (ctx) => expression.call(ctx)
      }
      return accum
    }, {})
  }

  render(ctx) {

    const renderChildren =() => {
      this.children.forEach(child => {
        child = child.render(ctx)
        if (child) {
          this._el.append(child)
        }
      })
    }

    if (this._directives.jIf) {
      if (this._directives.jIf(ctx)) {
        renderChildren()
        return this._el
      }
    } else {
      renderChildren()
      return this._el
    }
    return null
    
  }
}

class JacobDOMTextNode {
  /**
   * 
   * @param {TextNode} node 
   */
  constructor(node) {
    this.kind = node.kind
    this.value = node.value

  }

  render(ctx) {
    let rv = this.value
    if (this.kind === 'dynamic') {
      const expression = new Function('return ' + this.value)
      setWatcher(() => {
        rv = expression.call(ctx)
      })
    }
    return rv
  }
}


/** @param {ElementNode} node */
function handleElementNode(node) {

}




class DynamicDOMTextNode {
  constructor(expression) {
    this._el = document.createElement('span')
    this._expression = new Function('return ' + expression)

    this._sync = (ctx) => {
      this._el.textContent = this._expression.call(ctx)
    }
  }

  render(ctx) {
    setWatcher(() => {
      this._sync(ctx)
    })
    return this._el
  }
}

class StaticDOMTextNode {
  constructor(value) {
    this.value = value
  }

  render() {
    return this.value
  }
}

/** @param {TextNode} node */
function handleTextNode(node) {
  if (node.kind === 'dynamic') {
    return new DynamicDOMTextNode(node.value)
  } else {
    return new StaticDOMTextNode(node.value)
  }
}




/**
 * 
 * @param {Array<ElementNode|TextNode>} flatNodes 
 */
export default function buldDOMNodeTree(flatNodes) {

  /** @type {ElementNode[]} */
  const stack = []

  for (let i = 0; i < flatNodes.length; i++) {

    const node = flatNodes[i]

    if (node instanceof TextNode) {

      stack[stack.length - 1].children.push(handleTextNode(node))
      // stack[stack.length - 1].children.push(new JacobDOMTextNode(node))

    } else if (node instanceof ElementNode) {

      if (node.kind === 'opening') {

        stack.push(new JacobDOMElementNode(node))

      } else if (node.kind === 'selfClosing') {

        stack[stack.length - 1].children.push(new JacobDOMElementNode(node))

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
