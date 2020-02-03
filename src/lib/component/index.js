import compileTemplate from './template-compiler/index'

export default class Component {
  constructor({ name = '', props = {}, state = {}, methods = {}, computed = {}, template = '' }) {
    this._render = null
    
    this._name = name
    this._props = props
    this._state = state
    this._methods = methods
    this._computed = computed
    this._template = template
  }

  get ctx() {
    return Object.assign(
      {}, 
      this._props, 
      this._state, 
      this._computed, 
      this._methods
    )
  }

  render() {
    if (!this._render) {
      this._render = compileTemplate(this._template)
    }
    console.log(this._render)
    return this._render(this.ctx)
  }

}