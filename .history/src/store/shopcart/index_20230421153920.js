//购物车小仓库
import { reqShopCar} from '@/api'
const state = {};

const mutations = {};

const actions = {
    async getShopCart({commit}){
        let result = await reqShopCar();
        if(result.code == 200){
            commit()
        }
    }
};

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}
