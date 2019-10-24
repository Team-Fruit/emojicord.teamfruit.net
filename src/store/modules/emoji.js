export default {
    namespaced: true,
    state: {
        emojis: {},
        fetched: false
    },
    mutations: {
        setEmojis(state, emojis) {
            state.emojis = emojis
            state.fetched = true
        }
    },
    actions: {
        fetch({ dispatch, commit }) {
            dispatch("http/get", "/user/emojis", { root: true }).then(res => {
                commit("setEmojis", res.data)
            })
        }
    },
    getters: {
        isFetched: state => {
            return state.fetched
        },
        getEmojis: state => {
            return state.emojis
        },
        getGuild: state => guildid => {
            return state.emojis.guilds.find(v => v.id == guildid);
        },
        getUser: state => userid => {
            return state.emojis.users.find(v => v.id == userid);
        },
        getEmojisForMC: (state, _, __, rootGetters) => {
            return {
                id: rootGetters["auth/getUser"].id,
                name: `${rootGetters["auth/getUser"].username}#${rootGetters["auth/getUser"].discriminator}`,
                groups: state.emojis.guilds
            }
        }
    }
}