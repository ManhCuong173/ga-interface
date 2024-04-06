import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        home: '1114/725',
      },
      backgroundSize: {
        full: '100% 100%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        search: '1px 1px 8px 0px #D0AA5870 inset',
        btn: '2.857142925262451px 2.857142925262451px 0px 0px #2C0B0BB0',
        'btn-lg': '4px 4px 0px 0px #2C0B0BB0',
        'btn-list-hover': '0px 6px 20px 0px #01D09240',
      },
      colors: {
        _white: '#FFF4DD',
        white2: '#FFF5EB',
        _black: '#0D0C22',
        black1: '#4E473F',
        black2: '#B2B0AD',
        line: '#66605B',
        primary: '#BB5C4E',
        text: '#383F4A',
        stroke: '#E5E4E3',
        'text-primary': '#F4EADE',
        'text-black': '#4E473F',
        'text-black_3': '#E5E4E3',
        'text-secondary': '#A88D65',
        'text-secondary-heavy': '#7A7377',
        'text-sub': '#AE9955',
        'text-white': '#FFF7F6',
        'red-light': '#EF232C',
        yellow1: '#FFDFAC',
        orange: '#FF6634',
      },
      fontFamily: {
        Japanese3017: ['"Japanese 3017"'],
        DKLemonYellowSun: ['DK Lemon Yellow Sun'],
        Quicksand: ['Quicksand'],
        ProtoMono: ['Proto Mono'],
      },
      height: {
        header: '106px',
      },
      margin: {
        header: '106px',
      },
      maxWidth: {
        container: '1440px',
      },
      width: {
        container: '1440px',
      },
    },
  },
  plugins: [],
}
export default config
