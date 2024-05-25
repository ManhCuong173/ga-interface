'use client'

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Chart } from 'chart.js/auto'
import { CSSProperties, useEffect, useRef } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  backgroundColor?: string
  className?: string
  style?: CSSProperties
  labels: string[]
  maxBarThickness?: number
  barChartDataset: number[]
  lineChartDataset: number[]
}

export default function MixedChart({ ...props }: Props) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  const maxVolume = Math.max(...props.barChartDataset)

  useEffect(() => {
    if (chartInstance.current) {
      ;(chartInstance.current as any).destroy()
    }
    const myChartRef = (chartRef.current as any).getContext('2d')
    ;(chartInstance.current as any) = new Chart(myChartRef, {
      data: {
        datasets: [
          {
            type: 'line',
            yAxisID: 'y1',
            borderColor: '#FF9B25',
            borderWidth: 2,
            data: props.lineChartDataset,
            tension: 0.5,
          },
          {
            type: 'bar',
            yAxisID: 'y',
            data: props.barChartDataset,
            backgroundColor: props.backgroundColor,
            maxBarThickness: props.maxBarThickness || 100,
          },
        ],
        labels: props.labels,
      },
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          x: {
            border: { display: false },
            ticks: {
              font: {
                family: 'Proto Mono',
                weight: 500,
                size: 16,
                lineHeight: 1.5,
              },
            },
            grid: {
              display: false,
            },
          },
          y: {
            border: {
              display: false,
            },
            max: maxVolume * 2,
            ticks: {
              font: {
                family: 'Proto Mono',
                weight: 300,
                size: 14,
              },
              callback(tickValue) {
                return parseFloat(Number(tickValue).toFixed(10)).toString()
              },
            },
            title: {
              display: true,
              text: 'Volume(BTC)',
              padding: 10,
              font: {
                family: 'Proto Mono',
                weight: 500,
                size: 16,
                lineHeight: 1.5,
              },
            },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            ticks: {
              font: {
                family: 'Proto Mono',
                weight: 300,
                size: 14,
              },
              callback(tickValue) {
                return parseFloat(Number(tickValue).toFixed(10)).toString()
              },
            },
            title: {
              display: true,
              text: 'AVerage price (btc)',
              padding: 10,
              font: {
                family: 'Proto Mono',
                weight: 500,
                size: 16,
                lineHeight: 1.5,
              },
            },
            beginAtZero: true,
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
                family: 'Proto Mono',
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                return parseFloat(context.parsed.y.toFixed(20)).toString()
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
