import './assets/style/_main.scss'

import { Component } from './lib'

setTimeout(() => {
  const app = new Component({
    name: 'app',
    state: {
      name: 'jacob',
      paraClass: 'this-is-from-state'
    },
    methods: {
      sayHi() {
        return 'Hello how are you ' + this.name
      }
    },
    computed: {},
    template: `
      <div>
        before the paragraph
        <p>
          This is a paragraph and state.name = {this.sayHi()}
        </p>
        after the paragraph
      </div>
    `
  })
  
  
  document.getElementById('app').appendChild(app.render())
}, 500)




