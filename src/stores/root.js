import route from '../library/route'
import { apiUrl } from '../constants'
import { axios } from '../http'

/**
 * APIs
 */
const LOGIN_ROUTE = `${apiUrl}/auth/login`
const login = (payload) => {
    const {email, password} = payload
    return axios.post(LOGIN_ROUTE, {email, password})   
}

/**
 * For Login
 */
const profile = {
    id: 0,
    firstname: null,
    // middlename: null,
    lastname: null,
    // email: null,
    // photo: null
    token: null,
}

const state = () => {
    return {
        profile,
        unauthenticated: null,
        validations: {}
    }
}

const mutations = {
    PROFILE(state, payload) {
        state.profile = {...payload}
    },
    UNAUTHENTICATED(state, payload) {
        state.unauthenticated = payload
    },
    VALIDATIONS(state, payload) {
        state.validations = payload
    }
}

const actions = {
    async LOGIN({commit, dispatch}, payload) {
        commit('UNAUTHENTICATED', false)
        commit('VALIDATIONS', {})
        try {
            const { data } = await login(payload)
            dispatch('LOGIN_SUCCESS', data)
        } catch (error) {
            // console.log(Object.keys(error));
            const { response } = error
            dispatch('LOGIN_ERROR', response)
        }
    },
    LOGIN_SUCCESS({commit}, payload) {
        const { data } = payload
        commit('PROFILE',data)
        window.open('/','_self')
    },
    LOGIN_ERROR({commit}, payload) {
        /**
         * 422 Invalidated
         * 401 Unauthenticated
         */
        const { status, data: { data } } = payload
        if (status === 422) {
            commit('VALIDATIONS', data)
        }
        if (status === 401) {
            commit('UNAUTHENTICATED', true)
        }
    }
}

const getters = {

}

export {
    profile,
    state,
    mutations,
    actions,
    getters
}