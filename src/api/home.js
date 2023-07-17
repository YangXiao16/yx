import { request } from "@/utils/request";

export function searchHostGoods(){
    return request({
        method: 'get',
        url: '/home/searchHostGoods'
    })
}

export function selectAllGoods(params){
    return request({
        method: 'post',
        url: '/home/findOrdersPage',
        data: params
    })
}