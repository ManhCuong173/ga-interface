export type HistoryLuckyDraw = {
    round: number;
    time_creatable: number;
    prize: {
        wallet_address: string;
        top: string;
        lucky_number: string;
        award_information: {
            txid: string;
            complete: boolean;
        }
    } []
}