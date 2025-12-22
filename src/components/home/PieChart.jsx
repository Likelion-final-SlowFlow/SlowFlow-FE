import { PieChart as Chart } from 'react-minimal-pie-chart'

export default function PieChart({ goal, value, width }) {
  const chartColor = value > 0 ? '#A8E063' : '#FFAB9D'

  return (
    <Chart
      totalValue={goal}
      data={[
        {
          value: value,
          color: chartColor,
        },
      ]}
      lineWidth={width}
      background='#F0F0F0'
      lengthAngle={360}
      startAngle={-90}
      animate
      label={() => value}
      labelPosition={0}
      labelStyle={{
        fontSize: '20px',
        fontWeight: '600',
        fill: chartColor,
      }}
    />
  )
}
