import { createStore } from 'vuex'
import { state, mutations, actions, getters } from './stores/root'

import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    key: 'spLis',
    reducer: (state) => ({
        profile: state.profile
    })
})
/**
 * Modules
 */
//under maintenance
import { usersStore } from './stores/users.js'

export default createStore({
    modules: {
        users: usersStore,
    },
    state,
    mutations,
    actions,
    getters,
    plugins: [vuexLocal.plugin]
})