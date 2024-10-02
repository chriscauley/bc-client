// import unrest from '@unrest/vue'

import app from './app'
import auth from './auth'
import event from './event'
import vote from './vote'

const store = {}

const modules = {
  app,
  auth,
  event,
  vote,
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
