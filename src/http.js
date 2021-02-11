
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Add Token
 */
axios.interceptors.request.use(function (config) {

    const spLisStr = localStorage.getItem('spLis') || '{"profile": {}}'
    const spLis = JSON.parse(spLisStr)
    const { profile } = spLis || {}
    const token = profile.token || ''

    config.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization:  `Bearer ${token}`
    }

    return config;

});

/**
 * Validation sequence
 * 401 for invalid token e.g., expired or non-passport token
 */
axios.interceptors.response.use(

    response => response,
    // eslint-disable-next-line func-names
    async function(error) {
        if (error.response.status === 401) {
            window.open('#/login','_self');
        }
        return Promise.reject(error);
    },

);

export { axios };