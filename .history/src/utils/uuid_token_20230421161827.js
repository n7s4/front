import {v4 as uuidv4} from 'uuid'
//生成一个随机字符串，游客身份持久存储，每次执行不能发生变化
export const getUUID = ()=>{
    let uuid_tiken = localStorage.getItem('UUIDTOKEN')
    if(!uuid_tiken)
}