import { Activity } from '@/types/activity'
import { BaseResponse, Paging } from './core/BaseRequest'
import { GoldenRequest } from './core/GoldenRequest'
import { APIEndpointEnum } from './core/endpoints'

class ActivityService extends GoldenRequest {
  public getActivities(data: {
    size?: number
    page?: number
    address?: string
  }): Promise<BaseResponse<Paging<Activity>>> {
    const result = this._get(APIEndpointEnum.activity, {
      page_size: data.size,
      page: data.page,
      address: data.address,
    })
    return result
  }
}

const instance = new ActivityService()
export default instance
