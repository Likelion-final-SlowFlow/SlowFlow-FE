// @ts-nocheck
import React from 'react'
import { Bar, BarChart, XAxis, LabelList } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const MonthlyChart = () => {
  const MONTH_LABELS = ['1주차', '2주차', '3주차', '4주차', '5주차', '6주차']

  const chartData = [
    {
      weekOfMonth: 1,
      positiveTotal: 90,
      negativeTotal: 20,
    },
    {
      weekOfMonth: 2,
      positiveTotal: 610,
      negativeTotal: 190,
    },
    {
      weekOfMonth: 3,
      positiveTotal: 640,
      negativeTotal: 220,
    },
    {
      weekOfMonth: 4,
      positiveTotal: 610,
      negativeTotal: 190,
    },
    {
      weekOfMonth: 5,
      positiveTotal: 660,
      negativeTotal: 220,
    },
    {
      weekOfMonth: 6,
      positiveTotal: 90,
      negativeTotal: 65,
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
  const gapConfig = {
    6: -6,
    5: -15,
    4: -25,
  }
  const currentBarGap = gapConfig[chartData.length] ?? -1

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
          barGap={currentBarGap}
          barCategoryGap={2}
        >
          <XAxis
            dataKey='date'
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tickFormatter={(_, index) => MONTH_LABELS[index]}
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

export default MonthlyChart
