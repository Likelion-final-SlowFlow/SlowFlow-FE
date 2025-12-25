import React from 'react'
import WeeklyCalendar from './WeeklyCalendar'
import WeeklyChart from './WeeklyChart'
const WeeklyComponent = () => {
  return (
    <div className='w-[290px]'>
      <div className='pt-[22px] pb-8'>
        <p className='text-sb-18 pb-[9px]'>월간 히트맵</p>
        <WeeklyCalendar />
      </div>
      <div>
        <p className='text-sb-18 pb-[9px]'>월간 목표 달성</p>
        <div className='bg-soft flex h-17 items-center rounded-[20px] px-7'>
          <p className='text-[16px] font-medium text-black'>월간 목표 달성</p>
        </div>
      </div>
      <div>
        <WeeklyChart />
      </div>
    </div>
  )
}

export default WeeklyComponent
