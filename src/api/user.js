import { request } from "@/utils/request";

export function userRegister(params){
    return  request({
        method: 'post',
        url: '/user/add',
        data: params,
        // headers:{
        //     'Authorization': window.localStorage.token,
        // }
    })
}

export function userLogin(params){
    return  request({
        method: 'post',
        url: '/user/login',
        data: params,
        // headers:{
        //     'Authorization': window.localStorage.token,
        // }
    })
}

export function getUserInfo(params){
    return  request({
        method: 'get',
        url: '/user/getUserInfo?username='+params,
    })
}