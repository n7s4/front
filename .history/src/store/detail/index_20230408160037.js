import { reqDetailList } from "@/api"
const state = {

}
const mutations = {

}
const action = {
    await getDetailInfo(skuid){
       async let result = reqDetailList(skuid);
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