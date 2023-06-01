
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
    // allUpdateChecked({commit,state,dispatch},isChecked){
    //     let arr = [];
    //     //获取购物车商品的个数,进行遍历
    //     state.cartList[0].cartInfoList.forEach(item => {
    //         //调用修改某一个商品的action【四次】
    //         let ps = dispatch("updateCheckById", { skuId: item.skuId, isChecked });
    //         arr.push(ps);
    //     });
    //       //Promise.all():参数需要的是一个数组【数组里面需要promise】
    //       //Promise.all()执行一次,返回的是一个Promise对象,Promise对象状态：成功、失败取决于什么?
    //       //成功、还是失败取决于数组里面的promise状态:四个都成功、返回成功Promise、只要有一个失败、返回Promise失败状态！！！
    //       return Promise.all(arr);
    // },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll=[];
       getters.cartList.cartInfoList.forEach(item => {
          let Promise = item.isChecked ==1 ? dispatch('deleteCartListBySkuId',item.skuId):'';
          PromiseAll.push(Promise);
          
       });
        
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
