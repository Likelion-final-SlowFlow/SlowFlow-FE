// @ts-nocheck
import React from 'react'
import { Bar, BarChart, XAxis, LabelList } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const WeeklyChart = ({ chartData }) => {
  const WEEK_LABELS = ['일', '월', '화', '수', '목', '금', '토']

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

  if (!chartData) return null

  const isAllZero = chartData.every(
    (d) => (d.positiveTotal || 0) === 0 && (d.negativeTotal || 0) === 0,
  )

  return (
    <div className='bg-light mt-[30px] w-[290px] rounded-[20px] px-[23px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      {isAllZero ? (
        <div className='flex min-h-[233px] flex-col items-center justify-center text-center'>
          <p className='text-[14px] font-medium text-gray-400'>꾸준히 기록하면</p>
          <p className='text-[14px] font-medium text-gray-400'>
            나만의 건강 패턴을 발견할 수 있어요!
          </p>
        </div>
      ) : (
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
            margin={{ top: 10 }}
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
      )}
    </div>
  )
}

export default WeeklyChart
