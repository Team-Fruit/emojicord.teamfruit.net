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
        },
        getGuild: state => guildid => {
            return state.emojis.guilds.find(v => v.id == guildid);
        },
        getUser: state => userid => {
            return state.emojis.users.find(v => v.id == userid);
        }
    }
}