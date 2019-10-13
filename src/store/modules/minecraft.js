export default {
    namespaced: true,
    state: {
        key: '',
        port: -1
    },
    mutations: {
        set(state, { key, port }) {
            state.key = key,
                state.port = port
        },
        destroy(state) {
            state.key = '',
                state.port = -1
        }
    },
    actions: {
        connect({ commit }, { key, port }) {
            commit('set', {
                key,
                port
            })
        },
        disconnect({ commit }) {
            commit('destroy')
        }
    },
    getters: {
        isConnected: state => {
            return state.key && state.port >= 0
        },
        getKey: state => {
            return state.key
        },
        getPort: state => {
            return state.port
        }
    }
}