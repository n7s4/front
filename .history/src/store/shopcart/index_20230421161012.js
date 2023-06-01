
import { reqShopCart} from  '@/api'
const state = {};

const mutations = {};

const actions = {
    async getShopCart({commit}){
        let result = await reqShopCart();
        console.log(result);
        // if(result.code == 200){
        //     commit()
        // }
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}
