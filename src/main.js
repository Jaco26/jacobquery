import './assets/style/_main.scss'

import { Component } from './lib'


const app = new Component({
  name: 'app',
  state: {
    name: 'jacob',
    showPara: true,
    numbers: [1, 55, 93, 32, 43],
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
      <p j-if={this.state.showPara}>
        This is a paragraph and state.name = {this.computed.upperName}
      </p>
      after the paragraph
      <p j-for={n in numbers}>
        you should see this {this.state.numbers.length} times
      </p>
    </div>
  `
})


document.getElementById('app').appendChild(app.render())

window.app = app
