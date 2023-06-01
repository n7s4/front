import { reqDetailList } from "@/api"
const state = {

}
const mutations = {

}
const action = {
    getDetailInfo(skuid){
        let result = reqDetailList(skuid)
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