import { reqDetailList } from "@/api"
const state = {

}
const mutations = {

}
const action = {
    getDetailInfo(skuid){
        let result = reqDetailList(skuid);
        if(result.code == 200){
            
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