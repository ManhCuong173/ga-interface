import { appearAnimation } from '@/constants/animation.constant'
import { useAuthBitcoin } from '@/hooks/WalletProvider/useAuthBitcoin'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Menu from './menu'

const ProfileDropdown: React.FC<{ mode: 'transparent' | 'solid' }> = ({ mode }) => {
  const { logout } = useAuthBitcoin()

  return (
    <motion.div {...appearAnimation} className="flex items-center justify-center">
      <button className={cn('profile-menu-dropdown', 'w-fit md:w-[180px]')}>
        <Menu mode={mode} handleDisconnect={logout} />
      </button>
    </motion.div>
  )
}

export default ProfileDropdown

