import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'

const RoundedBar = (props) => {
  const { x, y, width, height, fill } = props
  const r = Math.min(height / 2, 999)
  return <rect x={x} y={y} width={width} height={height} rx={r} ry={r} fill={fill} />
}

export default function ProgressBar({
  percent = 50,
  max = 100,
  fillColor = '#4ADE80',
  trackColor = '#C8C8C8',
  barSize = 7,
}) {
  const safe = Math.max(0, Math.min(max, Number(percent) || 0))
  const data = [{ name: 'bar', value: safe }]

  return (
    <div className='h-4 w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} layout='vertical' margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <XAxis type='number' domain={[0, max]} hide />
          <YAxis type='category' dataKey='name' hide />

          <Bar
            dataKey='value'
            barSize={barSize}
            fill={fillColor}
            shape={<RoundedBar />}
            background={<RoundedBar fill={trackColor} />}
            isAnimationActive
            animationDuration={700}
            animationEasing='ease-out'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
