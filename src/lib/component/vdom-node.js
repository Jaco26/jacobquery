import setWatcher, { Dep } from '../watcher'



// class VDomStaticTextNode {
//   constructor(text) {
//     this.text = text
//   }
// }



// class VDomDynamicTextNode {
//   constructor(text, sync) {
//     this.text = text
//     this._sync = sync
//   }

//   sync() { // bind sync to Component.ctx
//     setWatcher(this._sync.bind(this))
//   }
// }



// class VDomElementNode {
//   constructor(tagName) {
//     this._el = document.createElement(tagName)
//     this.children = []
//   }

//   append(child) {
//     this.children.push(child)
//   }

//   remove(child) {
//     this.children
//   }
// }



/**
 * @typedef ElementData
 * @property {Object<string, string|boolean>} attributes
 * @property {Object<string, any>} directives
 * @property {object} listeners
 */


/**
 * 
 * @param {string} tagName 
 * @param {ElementData} data 
 * @param {array} children 
 */
export default function createElement(tagName, data, children) {
  const _el = document.createElement(tagName)

  setWatcher(() => {
    Object.keys(data.attributes).forEach(attr => {
      const value = data.attributes[attr]
      if (value) {
        _el[attr] = value
      }
    })
  })

  setWatcher(() => {
    
  })

}