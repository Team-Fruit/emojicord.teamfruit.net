export default {
    namespaced: true,
    state: {
        emojis: {}
    },
    mutations: {
        setEmojis(state, emojis) {
            state.emojis = emojis
        }
    },
    getters: {
        getEmojis: state => {
            return state.emojis
        }
    }
}