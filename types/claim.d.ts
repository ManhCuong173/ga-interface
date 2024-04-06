
type DataSign = {
    round: number;
    solanaAddress: string;
    luckyNumber: string;
    amount: number;
}

export type SignClaimType = {
    signature: number[];
    recoveryId: number;
    uuid?: string;
    signData: DataSign;
}