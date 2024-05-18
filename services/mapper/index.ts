import { APIEndpointEnum } from '../core/endpoints'
import { FeeMapper, FeeMintMapper } from './fee'
import { NFTFilterMapper } from './nft'

class Mapper {
  private _mapper = {
    [APIEndpointEnum.filterNft]: NFTFilterMapper,
    [APIEndpointEnum.fee]: FeeMapper,
    [APIEndpointEnum.feeMint]: FeeMintMapper,
  }

  public getMapper(url: string) {
    return (this._mapper as any)[url]
  }
}

const mapper = new Mapper()

export default mapper
