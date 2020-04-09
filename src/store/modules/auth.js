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
        isExpired: state => {
            return Date.now() / 1000 > state.user.exp
        },
        getUser: state => {
            return state.user
        },
        getAvaterURL: state => {
            if (state.user.avater)
                return 'https://cdn.discordapp.com/avatars/' + state.user.id + '/' + state.user.avater
            return 'https://cdn.discordapp.com/embed/avatars/' + state.user.discriminator % 5 + '.png'
        }
    }
}