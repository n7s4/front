
import { reqShopCart} from  '@/api'
const state = {
    carList:[]
};

const mutations = {
    GETSHOPCART(state,carList){
        state.carList = carList;
    }
};

const actions = {
    async getShopCart({commit}){
        let result = await reqShopCart();
        if(result.code == 200){
            commit('GETSHOPCART', result.data);
        }
    }
};

const getters = {
    
};

export default {
    state,
    mutations,
    actions,
    getters
}
