import { Cluster, clusterApiUrl } from "@solana/web3.js";


export const CLUSTER: Cluster = 'devnet';   

export const PROGRAM_ID = '13JKmVdB1kviKCqXiKs4UjAQUkxukwBsPZ4uwQNPHech';
export const SOLANA_HOST =
    CLUSTER === 'devnet' ? clusterApiUrl('devnet') : 'http://localhost:8899'