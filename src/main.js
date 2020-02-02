import './assets/style/_main.scss'

import { Component } from './lib'

const app = new Component({
  name: 'app',
  state: {
    name: 'jacob',
    paraClass: 'this-is-from-state'
  },
  methods: {},
  computed: {},
  template: `
    <div>
      before the paragraph
      <p j-for={n in 9} j-if={9 < 4} class={this.paraClass} >
        TODO: FIX BUG IN TAG RE with "{ < }"
        This is a paragraph and state.name = {this.name}
      </p>
      after the paragraph
    </div>
  `
})

app.render()

document.getElementById('app').innerHTML = (app._template)


