// @ts-nocheck
import React from 'react'
import { Bar, BarChart, XAxis, LabelList } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'

const MonthlyChart = ({ chartData }) => {
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

  const getBarGap = (length) => {
    if (length >= 6) return 5
    if (length === 5) return 9
    if (length === 4) return 13
    return 0 // 기본값
  }

  if (!chartData) return null

  const isAllZero = chartData.every(
    (d) => (d.positiveTotal || 0) === 0 && (d.negativeTotal || 0) === 0,
  )

  const dynamicBarGap = getBarGap(chartData.length)

  return (
    <div className='bg-light mt-[30px] mb-25 w-[290px] rounded-[20px] px-[23px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      {isAllZero ? (
        <div className='flex min-h-[233px] flex-col items-center justify-center text-center'>
          <p className='text-[14px] font-medium text-gray-400'>데이터가 없습니다.</p>
          <p className='text-[14px] font-medium text-gray-400'>꾸준히 기록해보세요!</p>
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
            barCategoryGap={dynamicBarGap}
            margin={{ top: 10 }}
          >
            <XAxis
              dataKey='weekOfMonth'
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => `${value}주`}
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
                formatter={(value) => (value === 0 ? '' : `+${value}`)}
              />
            </Bar>
            <Bar dataKey='negativeTotal' fill='var(--color-mobile)' radius={[5, 5, 0, 0]}>
              <LabelList
                dataKey='negativeTotal'
                position='top'
                fill='var(--color-mobile)'
                offset={2}
                fontSize={9}
                formatter={(value) => (value === 0 ? '' : `-${value}`)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}

export default MonthlyChart
