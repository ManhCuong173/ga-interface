import Discord from '@/icons/profile/profile-info/discord-lighter.svg'
import TeleIcon from '@/icons/profile/profile-info/tele-lighter.svg'
import X from '@/icons/profile/profile-info/twitter-lighter.svg'

export enum GaSocialLinkVariantEnums {
  Discord = 'discord',
  X = 'x',
  XChina = 'x-china',
  Telegram = 'telegram',
}

export type GaSocialLinkType = {
  url: string
  name: string
  type: GaSocialLinkVariantEnums
  icon: string
}

export const SocialLinks: GaSocialLinkType[] = [
  {
    url: 'https://t.me/goldenapple_io',
    name: 'Telegram',
    type: GaSocialLinkVariantEnums.Telegram,
    icon: TeleIcon,
  },
  {
    url: 'https://discord.gg/j6SGfcXp',
    name: 'Discord',
    type: GaSocialLinkVariantEnums.Discord,
    icon: Discord,
  },
  {
    url: 'https://x.com/goldenapple_io',
    name: 'X',
    type: GaSocialLinkVariantEnums.X,
    icon: X,
  },
  {
    url: 'https://x.com/jinping_io',
    name: 'X China',
    type: GaSocialLinkVariantEnums.XChina,
    icon: X,
  },
]

