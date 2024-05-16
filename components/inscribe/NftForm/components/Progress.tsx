import ProgressBar from '@/components/progress-bar'
import React from 'react'

const Progress: React.FC<{ amount: number }> = ({ amount }) => {
  return (
    <ProgressBar value={amount} number={amount} className="h-[10px]" bulletSize={40} total={100}>
      <div className="tooltip">
        <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
          <g filter="url(#filter0_d_972_73232)">
            <rect x="10.2642" y="6" width="40" height="40" rx="20" fill="white" shape-rendering="crispEdges" />
            <path
              d="M28.5778 17.0582H31.9386L31.801 16.003L29.6635 15.9934V13.9073H30.8336V12.8387H31.9386V11.8186H33.0958V10.7833H34.2495V9.6958H37.5736V11.8186H35.3667V12.8387H34.2495V13.9073H33.0958V14.9759H31.9386V16.003H37.5736V17.0473H38.7294V18.1017H39.8446V19.1561H40.9801V20.2004H42.0852V21.2548H43.2005V30.6837H42.1157V32.7824H40.9629V34.8585H39.8256V36.9221H38.6708V38.0199H37.5611V39.0744H36.4687V40.1128H33.0593V39.0744H27.4651V40.1128H24.0683V39.0744H22.9418V38.0008H21.7978V36.9623H20.689V34.8151H19.545V32.791H18.4361V30.6614H17.3276V21.2395H18.4463V20.1954H19.5202V19.1878H20.6917V18.123H21.8895V17.0582H22.9211V15.9934H28.5778V17.0582Z"
              fill="#EF232C"
            />
            <path d="M28.5997 11.8145V14.987H26.3148V12.8531H25.2007V10.7571H27.4478V11.8145H28.5997Z" fill="#EF232C" />
          </g>
          <defs>
            <filter
              id="filter0_d_972_73232"
              x="0.26416"
              y="0"
              width="60"
              height="60"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_972_73232" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_972_73232" result="shape" />
            </filter>
          </defs>
        </svg>
        <span className="tooltiptext">{amount}</span>
      </div>
    </ProgressBar>
  )
}

export default Progress
