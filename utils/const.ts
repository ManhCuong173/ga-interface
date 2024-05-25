import { FiveElements } from '@/types/fiveElements'
import ic_mental from '@/images/five-elements/mental.svg'
import ic_wood from '@/images/five-elements/wood.svg'
import ic_water from '@/images/five-elements/water.svg'
import ic_fire from '@/images/five-elements/fire.svg'
import ic_earth from '@/images/five-elements/earth.svg'
import type_mental from '@/images/five-elements/type_metal.svg'
import type_fire from '@/images/five-elements/type_fire.svg'
import type_water from '@/images/five-elements/type_water.svg'
import type_wood from '@/images/five-elements/type_tree.svg'
import type_earth from '@/images/five-elements/type_earth.svg'

export const TypeSelectNFT = {
  pick_nft: 'PICK_NFT',
  pick_all_nft: 'PICK_ALL_NFT',
}

export const fiveElements: FiveElements[] = [
  {
    id: 1,
    title: 'Fire',
    icon: ic_fire,
    type: type_fire,
  },
  {
    id: 2,
    title: 'Earth',
    icon: ic_earth,
    type: type_earth,
  },
 
  {
    id: 5,
    title: 'Mental',
    icon: ic_mental,
    type: type_mental,
  },
  {
    id: 4,
    title: 'Wood',
    icon: ic_wood,
    type: type_wood,
  },
  {
    id: 3,
    title: 'Water',
    icon: ic_water,
    type: type_water,
  },
 
]
