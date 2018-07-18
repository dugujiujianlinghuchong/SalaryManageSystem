import Vue from 'vue'
import Axios from 'axios'


Vue.prototype.axios = Axios
// GET请求方法
Vue.prototype.$get = function (address, params, func) {
    Axios.get(address, { params: params })
        .then((res) => {
            func(res.data);
        })
}
// POST请求方法
Vue.prototype.$post = function (address, params, func) {
    Axios.post(address, params)
        .then((res) => {
            func(res.data);
        })
}