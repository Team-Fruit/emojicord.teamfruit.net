import jwtDecode from 'jwt-decode'

export default {
    namespaced: true,
    state: {
        token: '',
        user: {}
    },
    mutations: {
        create(state, { token, user }) {
            state.token = token
            state.user = user
        },
        destroy(state) {
            state.token = ''
            state.user = {}
        }
    },
    actions: {
        login({ commit }, token) {
            const user = jwtDecode(token)
            commit('create', {
                token,
                user
            })
        },
        logout({ commit }) {
            commit('destroy')
        }
    },
    getters: {
        isLoggedin: state => {
            return state.token ? true : false
        },
        getUser: state => {
            return state.user
        },
        getAvaterURL: state => {
            return 'https://cdn.discordapp.com/avatars/' + state.user.id + '/' + state.user.avater + '.png'
        }
    }
}