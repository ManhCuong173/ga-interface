import { ItemMarket, NetworkAxiosResponse, ResResponsePsbtMarket } from "@/types/market";
import axiosClient from "./axios-client"
import { backend } from "./endpoint/endpoint";

export const marketPlaceService = {
    getMarket: async (params?: any) => {
        return (await axiosClient.get<NetworkAxiosResponse>(`${backend}/filter/marketplace`, {params})).data;
    },
    getFeeBuyNFT: async (params?: any) => { 
        return (await axiosClient.post<NetworkAxiosResponse>(`${backend}/get/fee/buy/nft`,params)).data;
    },
    getPsBTNft: async (params?: any) => { 
        return (await axiosClient.post<ResResponsePsbtMarket>(`${backend}/get/psbt/buy/nft`,params)).data
    },
    exChangeNft: async (params?: any) => { 
        return (await axiosClient.post<ResResponsePsbtMarket>(`${backend}/exchange/nft`, params));
    },
    removeMarketNft: async (params?: any) => { 
        return (await axiosClient.delete(`${backend}/market/nft/remove`, {
            data: params
        }))
    }
}