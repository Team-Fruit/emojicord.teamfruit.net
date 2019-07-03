export default {
    namespaced: true,
    state: {
        token: ''
    },
    mutations: {
        create (state, token) {
            state.token = token
        },
        destroy (state) {
            state.token = ''
        }
    },
    actions: {
        login({ commit }, token) {
            commit('create', token)
        }
    },
    getters: {
        isLoggedin: state => {
            return state.token ? true : false
        }
    }
}