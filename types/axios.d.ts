export type AxiosNetworkResponse<T> = {
    data?: T[],
    currentPage?: number;
    totalPages?: number;
}