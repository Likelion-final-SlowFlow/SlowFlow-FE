// @ts-nocheck
import React from 'react'
import { ko } from 'date-fns/locale'
import { addWeeks, subWeeks, startOfWeek, addDays, format, getWeekOfMonth } from 'date-fns'

import LeftIcon from '@/assets/chevron-left.svg'
import RightIcon from '@/assets/chevron-right.svg'

const WEEK_STARTS_ON = 0

const WeeklyCalendar = () => {
  const [weekStart, setWeekStart] = React.useState(
    startOfWeek(new Date(), { weekStartsOn: WEEK_STARTS_ON }),
  )

  const days = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart],
  )

  const captionText = `${format(weekStart, 'M월', { locale: ko })} ${getWeekOfMonth(weekStart, {
    weekStartsOn: WEEK_STARTS_ON,
  })}주차`

  return (
    <div className='rounded-[20px] bg-white p-[22px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      <div className='flex pb-[9px]'>
        <button
          type='button'
          onClick={() => setWeekStart((d) => subWeeks(d, 1))}
          className='pr-[13px]'
        >
          <img src={LeftIcon} alt='prev' className='h-[13px] w-[13px]' />
        </button>

        <div className='pb-0.5 text-[16px] font-medium text-black'>{captionText}</div>

        <button
          type='button'
          onClick={() => setWeekStart((d) => addWeeks(d, 1))}
          className='pl-[13px]'
        >
          <img src={RightIcon} alt='next' className='h-[13px] w-[13px]' />
        </button>
      </div>

      {/* 요일 */}
      <div className='grid grid-cols-[repeat(7,30px)] place-items-center gap-x-[6px] pb-[9px] text-center text-[14px] font-medium text-black'>
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* 날짜 */}
      <div className='grid grid-cols-[repeat(7,30px)] place-items-center gap-x-[6px] text-center'>
        {' '}
        {days.map((date) => (
          <DayCircle key={date.toISOString()} day={format(date, 'd', { locale: ko })} />
        ))}
      </div>
    </div>
  )
}

export default WeeklyCalendar

function DayCircle({ day, variant = 'gray' }) {
  const ring =
    variant === 'green'
      ? 'ring-[4px] ring-[#A8E063]'
      : variant === 'red'
        ? 'ring-[4px] ring-[#F2A08D]'
        : 'ring-[4px] ring-[#E4E4E4]'

  return (
    <div
      className={`flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white text-center ${ring}`}
    >
      <span className='text-[14px] font-medium text-black'>{day}</span>
    </div>
  )
}
