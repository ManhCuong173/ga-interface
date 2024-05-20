import { APIEndpointEnum } from '../core/endpoints'
import { FeeMapper, FeeMintMapper } from './fee'
import { CheckOrderMapper, CreateMintOrderMapper } from './mint'
import { NFTFilterMapper } from './nft'
import { OrderMintInfoMapper } from './order'

class Mapper {
  private _mapper = {
    [APIEndpointEnum.filterNft]: NFTFilterMapper,
    [APIEndpointEnum.fee]: FeeMapper,
    [APIEndpointEnum.feeMint]: FeeMintMapper,
    [APIEndpointEnum.orderMintInfo]: OrderMintInfoMapper,
    [APIEndpointEnum.checkOrder]: CheckOrderMapper,
    [APIEndpointEnum.createMintOrder]: CreateMintOrderMapper,
  }

  public getMapper(url: string) {
    return (this._mapper as any)[url]
  }
}

const mapper = new Mapper()

export default mapper
