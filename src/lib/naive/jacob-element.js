import setWatcher from '../watcher'


export default class JacobElement {
  constructor({ selector, setup = () => null, methods = {}, sync = () => null, on = {} } = {}) {
    this._el = document.querySelector(selector),

    this._methods = methods

    this._sync = sync
    this._setup = setup

    this._localState = {} // to do things like store ctx for canvas elements

    this._listeners = {}

    Object.keys(on).forEach(event => {
      const listener = on[event].bind(this.ctx)
      this._listeners[event] = listener
      this._el.addEventListener(event, listener)
    })

    Object.keys(this._methods).forEach(key => {
      this._methods[key] = this._methods[key].bind(this.ctx)
    })

    this.setup()
  }

  get ctx() {
    return {
      /** @type {HTMLElement} */
      el: this._el,
      localState: this._localState,
      clear() {
        while (this.el.firstChild) {
          this.el.removeChild(this.el.firstChild)
        }
      },
      ...this._methods,
    }
  }

  setup() {
    this._setup.call(this.ctx)
  }

  sync(state) {
    setWatcher(() => {
      this._sync.call(this.ctx, state)
    })
  }

  subscribeState(state) {
    this.state = state
  }
}