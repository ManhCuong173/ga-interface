import ic_earth from '@/images/five-elements/earth.svg'
import ic_fire from '@/images/five-elements/fire.svg'
import ic_mental from '@/images/five-elements/mental.svg'
import ic_water from '@/images/five-elements/water.svg'
import ic_wood from '@/images/five-elements/wood.svg'
import { NFTType } from '@/types/nft'

export const nftTypes: NFTType[] = [
  {
    id: 1,
    label: 'Fire',
    color: '#EF232C',
    icon: ic_fire,
  },
  {
    id: 2,
    label: 'Earth',
    color: '#B26802',
    icon: ic_earth,
  },
  {
    id: 5,
    label: 'Metal',
    color: '#FFD744',
    icon: ic_mental,
  },
  {
    id: 4,
    label: 'Wood',
    color: '#2D8B6F',
    icon: ic_wood,
  },
  {
    id: 3,
    label: 'Water',
    color: '#0BA5EC',
    icon: ic_water,
  },
  
]
