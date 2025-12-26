// @ts-nocheck
import React, { useState, useEffect } from 'react'
import { format, startOfWeek, addWeeks, subWeeks } from 'date-fns'
import WeeklyCalendar from './WeeklyCalendar'
import WeeklyChart from './WeeklyChart'
import { getWeeklyHistory } from '@/api/history/weekly.js'

const WeeklyComponent = () => {
  // 초기 기준 날짜
  const [baseDate, setBaseDate] = useState(() => startOfWeek(new Date(), { weekStartsOn: 0 }))

  // API 데이터 상태
  const [weeklyData, setWeeklyData] = useState(null)

  // API 호출
  const fetchData = async () => {
    try {
      const formattedDate = format(baseDate, 'yyyy-MM-dd')

      const data = await getWeeklyHistory({ baseDate: formattedDate })
      setWeeklyData(data)
    } catch (error) {
      console.error('주간 히스토리 조회 실패:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [baseDate])

  // 이전 주 / 다음 주 핸들러
  const handlePrevWeek = () => {
    setBaseDate((prev) => subWeeks(prev, 1))
  }

  const handleNextWeek = () => {
    setBaseDate((prev) => addWeeks(prev, 1))
  }

  // 로딩 중
  if (!weeklyData) {
    return <div className='w-[290px] pt-10 text-center text-gray-400'>로딩 중...</div>
  }
  return (
    <div className='w-[290px]'>
      <div className='pt-[22px] pb-8'>
        <p className='text-sb-18 pb-[9px]'>월간 히트맵</p>

        <WeeklyCalendar
          month={weeklyData.month}
          weekOfMonth={weeklyData.weekOfMonth}
          days={weeklyData.days}
          onPrev={handlePrevWeek}
          onNext={handleNextWeek}
          canGoNext={weeklyData.canGoNext}
          canGoPrev={weeklyData.canGoPrev}
        />
      </div>

      <div>
        <p className='text-sb-18 pb-[9px]'>월간 목표 달성</p>
        <div className='bg-soft flex h-17 items-center rounded-[20px] px-7'>
          <p className='text-[16px] font-medium text-black'>
            {weeklyData.goalAchievedDays === 0
              ? '하루 목표 달성한 날이 아직 없어요.'
              : `7일 중 ${weeklyData.goalAchievedDays}일 목표 달성!`}
          </p>
        </div>
      </div>

      <div>
        <WeeklyChart chartData={weeklyData.days} />
      </div>
    </div>
  )
}

export default WeeklyComponent
