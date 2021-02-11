import route from '../library/route'
import { apiUrl } from '../constants'
import { axios } from '../http'

/**
 * APIs
 */
const CREATE_USER = `${apiUrl}/user`
const createUser = (payload) => {
    return axios.post(CREATE_USER, payload)
}

const UPDATE_USER = `${apiUrl}/user/:id`
const updateUser = (payload) => {
    const { id } = payload
    const url =  route(UPDATE_USER, { id })
    return axios.put(url, payload)
}

const GET_USER = `${apiUrl}/user/:id`
const getUser = (payload) => {
    const { id } = payload
    const url =  route(GET_USER, { id })
    return axios.get(url)
}

const GET_USERS = `${apiUrl}/users`
const getUsers = (payload) => {
    return axios.get(GET_USERS)
}

const DELETE_USER = `${apiUrl}/user/:id`
const deleteUser = (payload) => {
    const { id } = payload
    const url =  route(DELETE_USER, { id })
    return axios.delete(url)
}

const user = {
    id: 0, //a required integer value that indicates the id of a user
    firstname: null,//a required string value that indicates the first name of a user
    middlename: null,//a required string value that indicates the middle name of a user
    lastname: null,//a required string value that indicates the last name of a user
    email: null,//a required string value that indicates the email of a user
}

const users = []

const state = () => {
    return {
        user,
        users,
    }
}

const mutations = {
    INIT(state) {
        state.user = user
        state.users = users
    },
    USER(state,payload) {
		state.user = payload
    },
    USERS(state,payload) {
        state.users = payload
    }
}

const actions = {
    INIT({commit}) {
        commit('INIT')
    },
    async CREATE_USER({dispatch}, payload) {
        try {
            const { data: { data } } = createUser(payload)
            dispatch('CREATE_USER_SUCCESS', data)
        } catch(error) {
            const { response } = error
            dispatch('CREATE_USER_ERROR', response)
        }
    },
    CREATE_USER_SUCCESS({commit}, payload) {
        console.log(payload)
    },
    CREATE_USER_ERROR({commit}, payload) {
        console.log(payload)
    },
    async UPDATE_USER({dispatch}, payload) {
        try {
            const { data: { data } } = await updateUser(payload)
            dispatch('UPDATE_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('UPDATE_USER_ERROR', response)
        }
    },
    UPDATE_USER_SUCCESS({commit}, payload) {
        commit('USER', payload)
    },
    UPDATE_USER_ERROR({commit}, payload) {
        console.log(payload)
    },
    async DELETE_USER({dispatch}, payload) {
        const { id } = payload
        try {
            const { data: { data } } = await deleteUser({id})
            dispatch('DELETE_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('DELETE_USER_ERROR', response)
        }
    },
    DELETE_USER_SUCCESS({dispatch, commit}, payload) {
        dispatch('GET_USERS', {})
    },
    DELETE_USER_ERROR({commit}, payload) {
        console.log(payload)
    },    
    async GET_USER({dispatch}, payload) {
        const { id } = payload
        try {
            const { data: { data } } = await getUser({id})
            dispatch('GET_USER_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_USER_ERROR', response)
        }
    },
    GET_USER_SUCCESS({commit}, payload) {
        commit('USER', payload)
    },
    GET_USER_ERROR({commit}, payload) {
        console.log(payload)
    },
    async GET_USERS({dispatch}, payload) {
        try {
            const { data: { data } } = await getUsers()
            dispatch('GET_USERS_SUCCESS', data)
        } catch (error) {
            const { response } = error
            dispatch('GET_USERS_ERROR', response)
        }
    },
    GET_USERS_SUCCESS({commit}, payload) {
        commit('USERS',payload)
    },
    GET_USERS_ERROR({commit}, payload) {
        console.log(payload)        
    }
}

const getters = {

}

const usersStore = {
	namespaced: true,    
    state,
    mutations,
    actions,
    getters
}

export { user, usersStore }

