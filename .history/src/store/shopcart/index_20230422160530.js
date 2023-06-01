
import { reqShopCart,reqDeleteCartById} from  '@/api'
const state = {
    cartList:[]
};

const mutations = {
    GETSHOPCART(state,cartList){
        state.cartList = cartList;
    }
};

const actions = {
    async getShopCart({commit}){
        let result = await reqShopCart();
        if(result.code == 200){
            commit('GETSHOPCART', result.data);
        }
    },
    //删除购物车的一个产品
    deleteCartListBySkuId
};

const getters = {
    cartList(){
        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
