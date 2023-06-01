
import { reqShopCart,reqDeleteCartById,reqUpdateCheckById} from  '@/api'
const state = {
    cartList:[],
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
   async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //修改商品的勾选状态
    async updateCheckById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckById(skuId,isChecked);
        if(result.code==200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // //修改全部商品的勾选的状态
    updateAllCartChecked({state,dispatch},isChecked){
        
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[];
       getters.cartList.cartInfoList.forEach(item => {
          let Promise = item.isChecked ==1 ? dispatch('deleteCartListBySkuId',item.skuId):'';
          PromiseAll.push(Promise);

       });
       return Promise.all(PromiseAll);
        
    },
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
