export interface ColumnProps<T> {
    key: string;
    title: string | React.ReactElement;
    render?: (column: ColumnProps<T>, item: T) => React.ReactElement;
    renderColumn?: (column: ColumnProps<T>) => React.ReactElement;
}