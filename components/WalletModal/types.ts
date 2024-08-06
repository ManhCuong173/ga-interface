export interface WalletItemCardProps {
  logo: string
  name: string
  isSelected?: boolean
  onSelect: () => void
}

export const DEFAULT_WALLET_KEY = 'unisat'
