import { useAuthBitcoin } from '@/hooks/WalletProvider/useAuthBitcoin'
import { cn } from '@/lib/utils'
import Menu from './menu'

const ProfileDropdown: React.FC<{ mode: 'transparent' | 'solid' }> = ({ mode }) => {
  const { logout } = useAuthBitcoin()

  return (
    <button className={cn('profile-menu-dropdown')}>
      <Menu mode={mode} handleDisconnect={logout} />
    </button>
  )
}

export default ProfileDropdown

