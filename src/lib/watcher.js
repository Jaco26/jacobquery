
let target = null

export default function setWatcher(callback) {
  target = callback
  target()
  target = null
}

export class Dep {
  constructor() { 
    this.subscribers = []
  }

  subscribe() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target)
    }
  }

  notify() {
    this.subscribers.forEach(sub => {
      sub()
    })
  }
}

