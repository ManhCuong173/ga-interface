export type ProfileType = {
    avatar: string;
    bio: string;
    cover: string;
    discord_connect: boolean;
    discord_username: string;
    solana_connect: boolean;
    solana_wallet: string;
    name: string;
    public_key: string;
    twitter_connect: boolean;
    twitter_username: string;
    wallet_address: string;
}

export type FileType = {
    file_url: string;
    message?: string;
}