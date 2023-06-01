import { reqDetailList } from "@/api"
const state = {

}
const mutations = {
    GETDETAILINFO(state, detailInfo){

    }
}
const actions = {
    async  getDetailInfo(commit,skuid){
        let result = await reqDetailList(skuid);
        if(result.code == 200){
            commit(('GETDETAILINFO', result.data)
        }
    }
}
const getters = {

}

export default {
    state,
    mutations,
    action,
    getters
}