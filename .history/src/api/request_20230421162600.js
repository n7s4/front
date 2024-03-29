//对axios进行二次封装
import axios from "axios";

//在当前模块中引入store
import store from "@/store";

//引入nprogress进度条
import nProgress from "nprogress";
//引入nprogress样式
import 'nprogress/nprogress.css'

//1:利用axios对象的方法create，去创造一个axios实例
//2:request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径当中会出现api
    baseURL: '/api',
    //代表请求超时的时间5s
    timeout: 5000
});
//请求拦截器：在发出请求之前，请求拦截器可以检测道，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config：配置对象，对象里面有一个属性很重要，header请求头
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //进度条开始
    nProgress.start();
    return config;
});

//响应拦截器
requests.interceptors.response.use((res) => {

    //进度条结束
    nProgress.done();
    return res.data;
}, (error) => {
    //响应失败

    return Promise.reject(new Error('faile'));
})

//对外暴露
export default requests;