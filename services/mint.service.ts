import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const mintService = {
  createMintOrder: (data: any) => {
    return axiosClient.post(`${backend}/create/mint/order`, data)
  },
  mint: (data: any) => {
    return axiosClient.post(`${backend}/pay/mint`, data)
  },
  payWallet: (data: any) => {
    return axiosClient.post(`${backend}/wallet/mint/nft`, data)
  },
  confirm: (data: any) => {
    return axiosClient.post(`${backend}/mint/check`, data)
  },
}
