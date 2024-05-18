import { APIEndpointEnum } from '../core/endpoints'
import { NFTFilterMapper } from './nft'

class Mapper {
  private _mapper = {
    [APIEndpointEnum.filterNft]: NFTFilterMapper,
  }

  public getMapper(url: string) {
    return (this._mapper as any)[url]
  }
}

const mapper = new Mapper()

export default mapper
