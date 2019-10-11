import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        http({ dispatch, rootState }, { method, endpoint, data }) {
            return axios({
                method: method,
                baseURL: 'https://emojicord.teamfruit.net/api',
                url: endpoint,
                data: data,
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
        },
        get({ dispatch }, endpoint) {
            return dispatch('http', { method: 'get', endpoint })
        },
        post({ dispatch }, endpoint, data) {
            return dispatch('http', { method: 'post', endpoint, data})
        },
        put({ dispatch }, endpoint, data) {
            return dispatch('http', { method: 'put', endpoint, data})
        },
        delete({ dispatch }, endpoint) {
            return dispatch('http', { method: 'delete', endpoint})
        }
    }
}