import { CreateQrCodeParamas, CreateQrCodeResponse } from '@/types/qr'
import axiosClient from './axios-client'
import { backend } from './endpoint/endpoint'

export const qrService = {
  createQrCode: async (data: CreateQrCodeParamas) =>
    (await axiosClient.post<CreateQrCodeResponse>(`${backend}/create/transfer/qrcode`, data)).data,
}
