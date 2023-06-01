import { reqGetSearchInfo } from "@/api";
const state = {
    searchList:{}
};
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions = {
     async getSearchList(commit,params={}){
        let result =   reqGetSearchInfo(params);
        
            commit('GETSEARCHLIST',result.data)
        
     }

} ;
const getters = {

};
export default {
    state,
    mutations,
    actions,
    getters
}