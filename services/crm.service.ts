import { CRMChartData, CRMChartDataResponse } from '@/types/crm'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const crmService = {
  getChartData: async () => (await axiosClient.get<CRMChartDataResponse[]>(`${backend}/crm/chart/data`)).data,
}
