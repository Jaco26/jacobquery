import './assets/style/_main.scss'

import { Component } from './lib'


const app = new Component({
  name: 'app',
  state: {
    name: 'jacob',
  },
  computed: {
    upperName() {
      return this.state.name.toUpperCase()
    }
  },
  methods: {
    sayHi() {
      return 'Hello how are you ' + this.state.name
    }
  },
  template: `
    <div>
      before the paragraph
      <p class="hi">
        This is a paragraph and state.name = {this.computed.upperName}
      </p>
      after the paragraph
    </div>
  `
})


document.getElementById('app').appendChild(app.render())

window.app = app
