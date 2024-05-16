export type RoundActivatedResponse = {
  round: {
    round: number
    nft1: [
      {
        first_number: number
        end_number: number
      },
    ]
    nft2: [
      {
        first_number: number
        end_number: number
      },
    ]
    nft3: [
      {
        first_number: number
        end_number: number
      },
    ]
    nft4: [
      {
        first_number: number
        end_number: number
      },
    ]
    nft5: [
      {
        first_number: number
        end_number: number
      },
    ]
    time_create: number
    is_active: boolean
    total_sold: number
    reward: {
      Special: number
      Top1: number
      Top2: number
      Top3: number
      Consolation: number
    }
  }
}
