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
        },
        setInclude(state, { id, include }) {
            const i = state.emojis.emojis.findIndex((emoji) => emoji.id === id)
            if (i >= 0) {
                // WIP reactive
                state.emojis.emojis[i].enable = include
            }
        }
    },
    actions: {
        fetch({ dispatch, commit }) {
            return dispatch("http/get", "/user/emojis", { root: true }).then(res => {
                commit("setEmojis", res.data)
            })
        },
        updateInclude({ dispatch, commit }, { id, include }) {
            return dispatch(include ? "http/put" : "http/delete", `/user/emojis/${id}`, { root: true }).then(() => {
                commit("setInclude", { id, include })
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
        getEmojisByGuildID: state => guildid => {
            return state.emojis.emojis.filter(emoji => emoji.guildid == guildid)
        },
        getGuilds: state => {
            return state.emojis.guilds
        },
        getGuild: state => guildid => {
            return state.emojis.guilds.find(v => v.id == guildid);
        },
        getUser: state => userid => {
            return state.emojis.users.find(v => v.id == userid);
        },
        getEmojisForMC: (state, getters, _, rootGetters) => {
            return {
                id: rootGetters["auth/getUser"].id,
                name: `${rootGetters["auth/getUser"].username}#${rootGetters["auth/getUser"].discriminator}`,
                groups: state.emojis.guilds
                    .map(guild => guild = {
                        name: guild.name,
                        id: guild.id,
                        emojis: getters.getEmojis.emojis.filter(emoji => emoji.enabled && emoji.guildid === guild.id)
                            .map(emoji => emoji = {
                                id: emoji.id,
                                name: emoji.name
                            })
                    })
            }
        }
    }
}