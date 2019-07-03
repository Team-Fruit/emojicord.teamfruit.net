export default {
    namespaced: true,
    state: {
        message: '',
        type: 'success'
    },
    mutations: {
        create(state, payload) {
            state.message = payload.message
            state.type = payload.type
        },
        destroy(state) {
            state.message = ''
            state.type = ''
        }
    },
    actions: {
        create({ commit }, payload) {
            commit('create', payload)
        },
        destroy({ commit }) {
            commit('destroy')
        }
    },
    getters: {
        exits: state => {
            return state.message ? true : false
        }
    }
}