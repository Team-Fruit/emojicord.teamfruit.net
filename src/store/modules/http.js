import axios from 'axios'
import Vue from 'vue'

export default {
    namespaced: true,
    state: {

    },
    actions: {
        http({ rootState }, { baseURL, method, endpoint, data }) {
            return axios({
                method: method,
                baseURL: baseURL,
                url: endpoint,
                data: data,
                headers: {
                    Authorization: `Bearer ${rootState.auth.token}`
                }
            }).then(res => res)
                .catch(err => {
                    Vue.notify({
                        group: 'alert',
                        text: err,
                        type: 'error',
                    })
                    return Promise.reject(err);
                })
        },
        get({ dispatch }, endpoint) {
            return dispatch('http', { baseURL: 'https://api1.teamfruit.net', method: 'get', endpoint })
        },
        post({ dispatch }, endpoint, data) {
            return dispatch('http', { baseURL: 'https://api1.teamfruit.net', method: 'post', endpoint, data })
        },
        put({ dispatch }, endpoint, data) {
            return dispatch('http', { baseURL: 'https://api1.teamfruit.net', method: 'put', endpoint, data })
        },
        delete({ dispatch }, endpoint, data) {
            return dispatch('http', { baseURL: 'https://api1.teamfruit.net', method: 'delete', endpoint, data })
        },
        postLocalHost(_, { port, key, data }) {
            return axios({
                method: 'post',
                url: 'http://localhost.teamfruit.net:' + port,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `token ${key}`
                }
            }).then(res => res)
                .catch(err => {
                    Vue.notify({
                        group: 'alert',
                        text: err,
                        type: 'error',
                    })
                })
        }
    }
}