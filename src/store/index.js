// import unrest from '@unrest/vue'

import app from './app'
import event from './event'
import vote from './vote'

const store = {}

const modules = {
  event,
  vote,
  app,
}

window._store = store

export default {
  install(app) {
    app.config.globalProperties.$store = store
    store._app = app

    Object.entries(modules).forEach(([name, module]) => {
      this[name] = store[name] = module({ store })
    })
  },
}
