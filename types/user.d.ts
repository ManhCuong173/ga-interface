export type ImportUserAuthRequest = {
  message: string
  public_key: string
  ref_code: string
  signature: string
  wallet_address: string
}

export type ImportUserAuthResponse = {
  message: string
  token: string
}

export type UserRefCodeIdResponse = {
  ref_id: string
}

export type UserTotalRefResponse = {
  ref_total: number
}

