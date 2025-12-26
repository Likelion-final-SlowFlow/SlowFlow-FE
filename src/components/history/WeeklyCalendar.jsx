// @ts-nocheck
import React from 'react'
import { format, parseISO } from 'date-fns'
import LeftIcon from '@/assets/chevron-left.svg'
import RightIcon from '@/assets/chevron-right.svg'

const WeeklyCalendar = ({ month, weekOfMonth, days, onPrev, onNext, canGoNext, canGoPrev }) => {
  const captionText = `${month}월 ${weekOfMonth}주차`
  const gridClass = 'grid grid-cols-[repeat(7,30px)] place-items-center gap-x-[6px] text-center'

  return (
    <div className='rounded-[20px] bg-white p-[22px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      {/* 상단 네비게이션 */}
      <div className='flex items-center justify-start gap-[13px] pb-5 pl-1'>
        <button
          type='button'
          onClick={onPrev}
          disabled={!canGoPrev}
          className='disabled:opacity-30'
        >
          <img src={LeftIcon} alt='prev' className='h-[13px] w-[13px]' />
        </button>
        <div className='pb-0.5 text-[16px] font-medium text-black'>{captionText}</div>
        <button
          type='button'
          onClick={onNext}
          disabled={!canGoNext}
          className='disabled:opacity-30'
        >
          <img src={RightIcon} alt='next' className='h-[13px] w-[13px]' />
        </button>
      </div>

      <div className={`${gridClass} pb-[9px] text-[14px] font-medium text-black`}>
        {['일', '월', '화', '수', '목', '금', '토'].map((w) => (
          <div key={w} className='flex w-[30px] justify-center'>
            {w}
          </div>
        ))}
      </div>

      {/* 날짜 및 링 그래프 */}
      <div className={gridClass}>
        {days.map((dayData) => (
          <DayCircle
            key={dayData.date}
            day={format(parseISO(dayData.date), 'd')}
            positiveTotal={dayData.positiveTotal || 0}
            negativeTotal={dayData.negativeTotal || 0}
          />
        ))}
      </div>
    </div>
  )
}

export default WeeklyCalendar
function DayCircle({ day, positiveTotal, negativeTotal }) {
  // 점수 계산
  const totalScore = positiveTotal - negativeTotal
  const absScore = Math.abs(totalScore)

  // 링 디자인
  const size = 30
  const strokeWidth = 4
  const center = size / 2 // 15
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const MAX_VAL = 400

  // 비율 계산
  const percent = Math.min(absScore, MAX_VAL) / MAX_VAL
  const dashArray = `${percent * circumference} ${circumference}`

  // 색상 설정
  let color = '#E4E4E4'
  if (totalScore > 0) color = '#A8E063'
  if (totalScore < 0) color = '#F2A08D'

  // 방향 설정
  const isNegative = totalScore < 0

  return (
    <div
      className='relative flex items-center justify-center'
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className='absolute top-0 left-0 -rotate-90 transform'
      >
        {/* 배경 링 */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill='none'
          stroke='#E4E4E4'
          strokeWidth={strokeWidth}
        />

        {/* 게이지 링 */}
        {totalScore !== 0 && (
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill='none'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeLinecap='round'
            style={{
              transformOrigin: `${center}px ${center}px`,
              transform: isNegative ? 'scaleY(-1)' : 'none',
            }}
          />
        )}
      </svg>
      <span className='relative z-10 text-[14px] font-medium text-black'>{day}</span>
    </div>
  )
}
