import {reqGetCode,reqRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {getToken,setToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token=token;
    },
    GETUSERINFO(state,userInfo){
         state.userInfo = userInfo;
    },
    //用户退出登陆后清楚数据
    CLEAR(state){
        state.token='';
        state.userInfo={};
        removeToken();
    }
};
const actions = {
     //获取验证码
     async getCode({ commit, state, dispatch }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
             commit('GETCODE', result.data);
             return 'ok';
        } else {
             return Promise.reject();
        }
   },
   //用户注册
   async register({commit},data){
    //注册接口没有data，不需要提交mutations
    let result = await reqRegister(data);
    if(result.code==200){
        return 'ok';
    }else{
        return Promise.reject(new Error(result.message));
    }
   },
   //用户登录
   async userLogin({commit},data){
    let result = await reqUserLogin(data);
    if(result.code==200){
        commit('USERLOGIN',result.data.token);
        setToken(result.data.token);
        return 'ok';
    }else{
        return Promise.reject(new Error(result.message));
    }
   },
   //登录成功获取用户得信息
   async getUserInfo({commit}){
    let result = await reqUserInfo();
    
    if(result.code==200){
        commit('GETUSERINFO',result.data)
        return 'ok'
    }
    // else{
    //     Promise.reject(new Error('faile'));
    // }
   },
   //用户退出登录
   async userLogout({commit}){
    let result = await reqLogout();
    if(result.code == 200){
        commit('CLEAR');
        return 'ok'
    }else{
        return Promise.reject(new Error('faile'));
    }
   }

};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}