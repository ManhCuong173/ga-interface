import axios, { AxiosRequestConfig } from 'axios'
import { APIEndpointEnum } from './endpoints'

export type BaseResponse<T> = {
  code: string | null
  message?: string
  data?: T | null
}
export type Paging<T> = {
  paging?: PagingInfo
  items: T[]
}

export type PagingInfo = {
  limit?: number
  page?: number
  total?: number
}

export type BaseRequest<T = any> = {
  call: () => Promise<T>
  cancel: () => void
}

export abstract class BaseService {
  protected get AxiosCancelToken() {
    const _cancelToken = axios.CancelToken
    return _cancelToken.source()
  }

  protected abstract _request<T = any>(
    url: string,
    payload: any,
    config: any,
    mapperKey?: APIEndpointEnum,
  ): Promise<BaseResponse<T>>

  protected abstract callRequest(url: string, config: AxiosRequestConfig, payload?: any): Promise<any>

  protected abstract buildConfig(config: AxiosRequestConfig, mapper: any): AxiosRequestConfig
}
