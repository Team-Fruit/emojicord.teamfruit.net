import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        get({ dispatch, rootState }, endpoint) {
            return axios.get('https://emojicord.teamfruit.net/api' + endpoint, {
                headers: {
                    Authorization: `Bearer ${rootState.auth.token}`
                }
            }).then(res => res)
            .catch(err => {
                dispatch('alert/create', {
                    message: err,
                    type: 'error'
                }, {
                    root: true
                })
            })
        }
    }
}