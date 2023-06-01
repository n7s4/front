//当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'
//三级联动接口
// /api/product/getBaseCategoryList   get  无参数
//发请求：sxios发出请求返回结果Promise对象
export const reqCategoryList = ()=>{
    return requests({url:'/product/getBaseCategoryList',method:'get'})
}
//切记：当前函数执行需要把服务器返回结果返回

//获取banner(home首页轮播图接口)
export const reqgetBannerList = ()=>{
    return mockRequests({url:'/banner',method:'get'})
}
//获取floor
export const reqFloorList = ()=>{
    return mockRequests({url:'/floor',method:'get'})
}
//获取搜索模块数据表 post 需要带参
/**
 * {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 * 
 * 
 */
//当前这个函数不需要接受外部传递参数
//当前这个接口，给服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params)=>{
    return requests({url:'/list',method:'post',data:params})
}
//详情模块商品的数据
export const reqDetailList = (sukId)=>requests ({url:`/item/${sukId}`,method:'get'})

//将产品添加到购物车
export const reqAddOrUpdateShopCart = (sukId,skuNum) =>requests ({url:`/cart/addToCart/ ${sukId}/${skuNum}`,method:'post'})

//获取用户购物车的数据接口
export const reqShopCart = ()=>requests({url:'/cart/cartList',method:'get'});

//删除购物产品的接口
//URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeleteCartById = (skuId) => requests ({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckById = (skuId,isChecked) => requests ({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'}) 

//注册的接口
export const reqRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

//登录的接口:请求体携带参数 phone&&password
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',method:'post',data});

//获取用户登录成功以后用户信息的接口
export const reqUserInfo = ()=>requests({url:`/user/passport/auth/getUserInfo`,method:'get'});

//退出登录
export const reqLogout =()=>({url:''})