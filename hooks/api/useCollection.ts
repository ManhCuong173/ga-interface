import { useQuery } from '@tanstack/react-query';
import { nftService } from '../../services/nft.service';



const getCollectionNft = async () => {
    const data = await nftService.getCollection();
    return data.nft_collection;
}

const useCollection = () => {

    return useQuery({
        queryKey: ['collection'],
        queryFn: () => {
            return getCollectionNft();
        }
    })
}

export default useCollection
