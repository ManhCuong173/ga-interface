'use client'
import { ArcElement, Legend, Tooltip } from 'chart.js'
import Chart from 'chart.js/auto'
import { CSSProperties, useEffect, useRef } from 'react'

Chart.register(ArcElement, Tooltip, Legend)

type Props = {
  className?: string
  style?: CSSProperties
  labels: string[]
  dataset: any[]
}

export default function LineChart({ ...props }: Props) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      ;(chartInstance.current as any).destroy()
    }

    const myChartRef = (chartRef.current as any).getContext('2d')

    ;(chartInstance.current as any) = new Chart(myChartRef, {
      data: {
        labels: props.labels,
        datasets: [
          {
            type: 'line',
            borderColor: '#FF9B25',
            data: props.dataset,
            backgroundColor: (context) => {
              const bgColor = ['rgba(255, 180, 66, 0.4)', 'rgba(255, 180, 66, 0.0)']

              if (!context.chart.chartArea) return
              const {
                ctx,
                chartArea: { top, bottom },
              } = context.chart
              const gradientBg = ctx.createLinearGradient(0, top, 0, bottom)
              const colorTranches = 1 / (bgColor.length - 1)
              for (let i = 0; i < bgColor.length; i++) {
                gradientBg.addColorStop(0 + i * colorTranches, bgColor[i])
              }

              return gradientBg
            },
            pointBorderColor: '#fff',
            pointBackgroundColor: '#EF232C',
            pointStyle: 'circle',
            pointRadius: 4,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 4,
            pointHoverRadius: 8,
            fill: true,
            tension: 0.5,
          },
        ],
      },
      options: {
        animation: {
          duration: 3000,
        },
        scales: {
          x: {
            border: {
              display: false,
            },
            ticks: {
              font: {
                size: 12,
                family: 'Proto Mono',
                weight: 300,
              },
            },
            grid: {
              color: '#FFDFAC',
            },
          },
          y: {
            border: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              font: {
                size: 14,
                family: 'Proto Mono',
                weight: 300,
              },
            },
            grid: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            labels: {
              color: '#4E473F',
              font: {
                style: 'italic',
                weight: 'bold',
              },
            },
          },
          tooltip: {
            backgroundColor: '#4E473F',
            bodyColor: '#fff',
            bodyFont: {
              family: 'Proto Mono',
              size: 12,
              weight: 300,
            },
            caretPadding: 0,
            displayColors: false,
            titleColor: '#fff',
            titleFont: {
              family: 'Proto Mono',
              size: 12,
              weight: 300,
            },
            yAlign: 'bottom',
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                return parseFloat(context.parsed.y.toFixed(5)).toString()
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ;(chartInstance.current as any).destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={`${props.className}`} style={props.style}>
      <canvas ref={chartRef} />
    </div>
  )
}
