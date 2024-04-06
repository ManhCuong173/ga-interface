import { AxiosNetworkResponse } from "@/types/axios"
import axiosClient from "./axios-client"
import { Activity } from "@/types/activity"
import { backend } from "./endpoint/endpoint"

export const activityService = {
    getActivity: async <T>(params:T) => {
        return await axiosClient.get<AxiosNetworkResponse<Activity>>(`${backend}/activity/history`,{params})
    }
}