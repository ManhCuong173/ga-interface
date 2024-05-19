import { handleAddItem } from '@/lib/item'
import { FiveElements } from '@/types/fiveElements'
import { NFT } from '@/types/nft'
import React, { createContext, useContext, useReducer } from 'react'




type InscribeData = {
    pickedNfts: NFT[],
    pickedFiveElement: FiveElements[]
}

type InscribeAction = | {
    type: 'PICK_NFT',
    nft: NFT,
} | {
    type: 'PICK_ALL_NFT',
    nfts: NFT[] | undefined,
} | {
    type: 'PICK_FIVE_ELEMENTS',
    id: string,
}




const inscribeReducer = (state: InscribeData, action: InscribeAction): InscribeData => {

    switch (action.type) { 

        case "PICK_NFT": {

            const { nft } = action;
            const pickedNFTUpdate = [...state.pickedNfts];

            handleAddItem(pickedNFTUpdate, nft);

            return { ...state, pickedNfts: pickedNFTUpdate }
        }
        case "PICK_ALL_NFT": {
            if (action.nfts) {
                return { ...state, pickedNfts: action.nfts }
            }
        }
        default:
            return state;
    }
}


const defaultValues:InscribeData = {
    pickedNfts: [],
    pickedFiveElement: []
}

const myInscribe = {
    inscribeData: defaultValues,
    setInscribeData: (action: InscribeAction):void => {}
}

const InscribeContext = createContext<{
    inscribeData: InscribeData,
    setInscribeData: React.Dispatch<InscribeAction>;
}>(myInscribe)



const InscribeContextProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [inscribeData, setInscribeData] = useReducer(inscribeReducer, defaultValues);

  return (
      <InscribeContext.Provider value={{
          inscribeData,
          setInscribeData
      }}>
          {children}
      </InscribeContext.Provider>
  )
}

export default InscribeContextProvider


export const useInscribeContext = () => useContext(InscribeContext);
