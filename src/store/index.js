import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import db_config from './data/db_config';
import project_config from './data/project_config';
import user_config from './data/user_config';

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      db_config,
      project_config,
      user_config,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
