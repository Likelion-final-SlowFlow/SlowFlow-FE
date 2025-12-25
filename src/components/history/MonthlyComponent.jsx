// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { format, addMonths, subMonths, startOfMonth, isSameMonth } from 'date-fns' // isSameMonth 추가
import MonthlyCalendar from './MonthlyCalendar'
import MonthlyChart from './MonthlyChart'
import { getMonthlyHistory } from '@/api/history/monthly.js'

const MonthlyComponent = () => {
  const [baseDate, setBaseDate] = useState(() => startOfMonth(new Date()))
  const [monthlyData, setMonthlyData] = useState(null)
  const [loading, setLoading] = useState(false)
  const canGoNext = !isSameMonth(baseDate, new Date())

  const fetchData = async () => {
    setLoading(true)
    try {
      const formattedDate = format(baseDate, 'yyyy-MM-dd')
      const data = await getMonthlyHistory({ baseDate: formattedDate })
      setMonthlyData(data)
    } catch (error) {
      console.error('월간 히스토리 조회 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [baseDate])

  const handlePrevMonth = () => {
    setBaseDate((prev) => subMonths(prev, 1))
  }

  const handleNextMonth = () => {
    if (!canGoNext) return
    setBaseDate((prev) => addMonths(prev, 1))
  }

  if (loading || !monthlyData) {
    return <div className='w-[290px] pt-10 text-center text-gray-400'>로딩 중...</div>
  }

  return (
    <div className='w-[290px]'>
      <div className='pt-[22px] pb-8'>
        <p className='text-sb-18 pb-[9px]'>월간 히트맵</p>

        <MonthlyCalendar
          year={monthlyData.year}
          month={monthlyData.month}
          days={monthlyData.days}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
          canGoNext={canGoNext}
        />
      </div>

      <div>
        <p className='text-sb-18 pb-[9px]'>월간 목표 달성</p>
        <div className='bg-soft flex h-17 items-center rounded-[20px] px-7'>
          <p className='text-[16px] font-medium text-black'>
            {monthlyData.goalAchievedDays === 0
              ? '하루 목표 달성한 날이 아직 없어요.'
              : `이번 달 ${monthlyData.goalAchievedDays}일 목표 달성!`}
          </p>
        </div>
      </div>

      <div>
        <MonthlyChart chartData={monthlyData.weeks} />
      </div>
    </div>
  )
}

export default MonthlyComponent
