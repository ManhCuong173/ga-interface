interface OptionSliderCaptcha {
  id: string
  loadingText: string
  failedText: string
  barText: string
  repeatIcon: string
  onSuccess: () => void
  setSrc?: () => string
}

interface Window {
  sliderCaptcha: (options: OptionSliderCaptcha) => {
    reset: () => void
  }
}
