import { reqDetailList } from "@/api"
const state = {

}
const mutations = {

}
const action = {
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