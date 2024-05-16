import { AxiosResponse } from "axios";
import axiosClient from "./axios-client"
import { backend, claim } from "./endpoint/endpoint"
import { SignClaimType } from "@/types/claim";



export const claimService = {
    signatureClaim: <T>(params: T) => {
        return axiosClient.post<AxiosResponse<SignClaimType>>(`${claim}/signature/claim`, params);
    },
    updateClaimStatus: <T>(params: T) => {
        return axiosClient.post(`${claim}/reward/claimed`, params);
    },
    claimVerify: <T>(params: T) => {
        return axiosClient.post(`${backend}/claim/verify`, params);
    },
    claimReward: <T>(params: T) => {
        return axiosClient.post(`${backend}/claim/reward`, params);
    }

}