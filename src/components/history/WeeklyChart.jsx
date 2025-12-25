// @ts-nocheck
import React from 'react'
import { Bar, BarChart, XAxis, LabelList } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const WeeklyChart = () => {
  const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토']

  const chartData = [
    {
      date: '2025-11-23',
      totalScore: 85,
      positiveTotal: 120,
      negativeTotal: 35,
    },
    {
      date: '2025-11-24',
      totalScore: 10,
      positiveTotal: 40,
      negativeTotal: 30,
    },
    {
      date: '2025-11-25',
      totalScore: 90,
      positiveTotal: 130,
      negativeTotal: 40,
    },
    {
      date: '2025-11-26',
      totalScore: 70,
      positiveTotal: 110,
      negativeTotal: 40,
    },
    {
      date: '2025-11-27',
      totalScore: 60,
      positiveTotal: 90,
      negativeTotal: 30,
    },
    {
      date: '2025-11-28',
      totalScore: 75,
      positiveTotal: 100,
      negativeTotal: 25,
    },
    {
      date: '2025-11-29',
      totalScore: 50,
      positiveTotal: 70,
      negativeTotal: 20,
    },
  ]
  const chartConfig = {
    desktop: {
      label: 'positiveTotal',
      color: '#A8E063',
    },
    mobile: {
      label: 'negativeTotal',
      color: '#FFAB9D',
    },
  }

  return (
    <div className='bg-light mt-[30px] w-[290px] rounded-[20px] px-[23px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      <ChartContainer
        config={chartConfig}
        className='mx-auto min-h-[233px] w-[244px] pt-[15px] pb-[15px]'
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          maxBarSize={14}
          barGap={-1}
          barCategoryGap={2}
        >
          <XAxis
            dataKey='date'
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tickFormatter={(_, index) => WEEK_LABELS[index]}
            tick={{
              fontSize: 14,
              fontWeight: 500,
              fill: '#000000',
            }}
          />
          <Bar dataKey='positiveTotal' fill='var(--color-desktop)' radius={[5, 5, 0, 0]}>
            <LabelList
              dataKey='positiveTotal'
              position='top'
              fill='var(--color-desktop)'
              offset={2}
              fontSize={9}
              formatter={(value) => (value === 0 ? value : `+${value}`)}
            />
          </Bar>
          <Bar dataKey='negativeTotal' fill='var(--color-mobile)' radius={[5, 5, 0, 0]}>
            <LabelList
              dataKey='negativeTotal'
              position='top'
              fill='var(--color-mobile)'
              offset={2}
              fontSize={9}
              formatter={(value) => (value === 0 ? value : `-${value}`)}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}

export default WeeklyChart
