import './assets/style/_main.scss'

import { Component } from './lib'


const app = new Component({
  name: 'app',
  state: {
    name: 'jacob',
    show: true
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
      <p class="hi" j-if={this.state.show}>
        This is a paragraph and state.name = {this.computed.upperName}
      </p>
      after the paragraph
    </div>
  `
})


document.getElementById('app').appendChild(app.render())

window.app = app
