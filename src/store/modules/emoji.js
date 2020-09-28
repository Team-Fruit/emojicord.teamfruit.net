import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        emojis: [],
        guilds: [],
        users: [],
        fetched: false
    },
    mutations: {
        setEmojis(state, emojis) {
            state.emojis = emojis.emojis
            state.guilds = emojis.guilds
            state.users = emojis.users
            state.fetched = true
        },
        setInclude(state, { id, include }) {
            const i = state.emojis.findIndex((emoji) => emoji.id === id)
            if (i >= 0) {
                Vue.set(state.emojis[i], "enabled", include)
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
            return state.emojis.filter(emoji => emoji.guildid == guildid)
        },
        getGuilds: state => {
            return state.guilds
        },
        getGuild: state => guildid => {
            return state.guilds.find(v => v.id == guildid);
        },
        getUser: state => userid => {
            return state.users.find(v => v.id == userid);
        },
        getEmojisForMC: (state, getters, _, rootGetters) => {
            return {
                id: rootGetters["auth/getUser"].id,
                name: `${rootGetters["auth/getUser"].username}#${rootGetters["auth/getUser"].discriminator}`,
                groups: state.guilds
                    .map(guild => guild = {
                        name: guild.name,
                        id: guild.id,
                        emojis: state.emojis.filter(emoji => emoji.enabled && emoji.guildid === guild.id)
                            .map(emoji => emoji = {
                                id: emoji.id,
                                name: emoji.name
                            })
                    })
            }
        }
    }
}