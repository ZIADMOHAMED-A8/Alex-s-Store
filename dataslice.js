import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const dataApi=createApi({
    reducerPath:'dataApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'/'
    }),
    endpoints:(builder)=>({
        getData:builder.query({
            query:()=>"alex_shop_prices.json"
        })
    })
})

export const {useGetDataQuery}=dataApi