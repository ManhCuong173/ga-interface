import { AxiosNetworkResponse } from './../types/axios.d';
import { Owner, ParamsOwner } from "@/types/owner";
import axiosClient from "./axios-client";
import { backend } from './endpoint/endpoint';

export const AnalyticsService = {

    getTopOwners: async (params: ParamsOwner) => {
        const response = (await axiosClient.get<AxiosNetworkResponse<Owner>>(`${backend}/top/owner`, { params }));
        return response;
    }

}