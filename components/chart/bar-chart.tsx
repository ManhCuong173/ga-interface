import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar, Chart } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type Props = {
  backgroundColor: string
  className?: string
}

export default function BarChart({ backgroundColor, className }: Props) {
  return (
    <div className={`${className} size-full`}>
      <Bar
        data={{
          labels: [
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
            'FEB 26',
          ],
          datasets: [
            {
              type: 'bar',
              data: [400, 250, 180, 250, 375, 200, 275, 200, 275, 100, 200],
              backgroundColor: backgroundColor,
            },
            {
              type: 'line' as any,
              data: [400, 250, 180, 250, 375, 200, 275, 200, 275, 100, 200],
            },
          ],
        }}
        options={{
          scales: {
            y: {
              border: {
                display: false,
              },
              max: 600,
              ticks: { stepSize: 200 },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  )
}
