export enum APIEndpointEnum {
  // nft
  nftCollection = 'api/backend/nft/collection',
  filterNft = 'api/backend/filter/nft',
  nftDetail = 'api/backend/inscription/info',

  // order
  orders = 'api/backend/filter/list/order/info',
  orderMintInfo = 'api/backend/order/info',

  // fee
  fee = 'api/backend/public/network/fee',
  feeMint = 'api/backend/public/network/fee/mint',

  // mint
  createMintOrder = 'api/backend/create/mint/order',
  checkOrder = 'api/backend/mint/check',
}
