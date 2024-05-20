import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { BaseRequest, BaseResponse, BaseService } from './BaseRequest'
import Mapper from '../mapper'
import axiosClient, { baseUrl } from '../axios-client'

export abstract class GoldenRequest extends BaseService {
  protected async _get(url: string, params?: any, config: AxiosRequestConfig = {}, mapperKey?: string): Promise<any> {
    try {
      const mapper = Mapper.getMapper(mapperKey || url)
      const _config = this.buildConfig(config, mapper)

      const result = await axiosClient.get(url, { params, ..._config })

      return result.data
    } catch (e: any) {
      return {
        message: e?.response?.data?.message || '',
        code: null,
        data: null,
      }
    }
  }

  protected _post<T = any>(
    url: string,
    payload?: any,
    config = {} as AxiosRequestConfig & { excludeErrors?: string[] },
    mapperKey?: string,
  ): BaseRequest<BaseResponse<T>> {
    const _source = this.AxiosCancelToken

    const call = async (): Promise<BaseResponse<any>> => {
      const response = await this._request(
        url,
        payload,
        {
          ...config,
          cancelToken: _source.token,
        },
        mapperKey,
      )

      return response
    }

    return {
      call,
      cancel: () => {
        _source.cancel()
      },
    }
  }

  protected async _request<T = any>(
    url: string,
    payload?: any,
    config = {} as AxiosRequestConfig & { excludeErrors?: string[]; disabledToast?: boolean },
    mapperKey?: string,
  ): Promise<BaseResponse<T>> {
    try {
      const mapper = Mapper.getMapper(mapperKey || url)
      const { excludeErrors = [], ...axiosConfig } = config
      const _config = this.buildConfig(axiosConfig, mapper)

      const result: AxiosResponse<BaseResponse<any>> = await this.callRequest(url, _config, payload)
      return result.data
    } catch (e: any) {
      if (!axios.isCancel(e)) {
        console.error(e)
      }
      return {
        message: e?.response?.data?.message || '',
        code: null,
        data: null,
      }
    }
  }

  protected async callRequest(url: string, config: AxiosRequestConfig, payload?: any) {
    return axiosClient.post(url, payload, config)
  }

  protected buildConfig(config: AxiosRequestConfig, mapper: any): AxiosRequestConfig {
    let _config = {
      baseURL: baseUrl,
      ...config,
    }

    if (mapper) {
      _config = { ..._config, transformResponse: mapper }
    }

    return _config
  }
}
