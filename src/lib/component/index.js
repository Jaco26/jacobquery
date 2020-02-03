import compileTemplate from './template-compiler/index'
import setWatcher, { Dep, createDep } from '../watcher'


function makeReactive(state) {
  (function traverse(object) {
    Object.keys(object).forEach(key => {
      let innerValue = object[key]
      if (innerValue && !Array.isArray(innerValue) && typeof innerValue === 'object') {
        traverse(innerValue)
      } else if (Array.isArray(innerValue)) {
        createDep(object, key) // TODO: traverse Arrays smarter...maybe not
      } else {
        createDep(object, key)
      }
    })
  })(state)
}


function makeReactiveComputed(computed, ctx) {
  const cache = {}
  Object.keys(computed).forEach(key => {
    setWatcher(() => {
      cache[key] = computed[key].call(ctx)
    })
    createDep(cache, key)
  })
  return cache
}

function makeCtx(props, state, methods, computed) {
  const rv = { state, props, methods, computed }
  
  makeReactive(rv.state)
  
  rv.computed = makeReactiveComputed(rv.computed, rv)

  Object.keys(rv.methods).forEach(key => {
    rv.methods[key] = rv.methods[key].bind(rv)
  })
  
  return rv
}


export default class Component {
  constructor({ name = '', props = {}, state = {}, methods = {}, computed = {}, template = '' }) {
    this._render = null
    
    this._name = name
    this._template = template
    this._ctx = makeCtx(props, state, methods, computed)

    this.state = state
  }

  render() {
    if (!this._render) {
      this._render = compileTemplate(this._template)
    }
    return this._render(this._ctx)
  }

}