import {v4 as uuidv4} from 'uuid'
//生成一个随机字符串，游客身份持久存储，每次执行不能发生变化
export const getUUID = ()=>{
    //先从本地存储获取uuid
    let uuid_tiken = localStorage.getItem('UUIDTOKEN')
    //如果没有
    if(!uuid_tiken){
        uuid_tiken = uuidv4();
        //本地存储存储一次
        localStorage.setItem('UUIDTOKEN',uuid_tiken);
    }
    return uuid_tiken;
}