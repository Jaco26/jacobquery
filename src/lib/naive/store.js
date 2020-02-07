
import JacobElement from './jacob-element'
import { createDep } from '../watcher'





export default class DataStore {
  constructor({ debug = false, state = {}, mutators = {} } = {}) {
    this.debug = debug
    this.state = state
    this.mutators = {}

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
    })(this.state)

    Object.keys(mutators).forEach(key => {
      this.mutators[key] = payload => mutators[key](this.state, payload)
    })
  }

  /** @param {JacobElement} el */
  subscribe(el) {
    el.sync(this.state)
    el.subscribeState(this.state)
    return el
  }
}