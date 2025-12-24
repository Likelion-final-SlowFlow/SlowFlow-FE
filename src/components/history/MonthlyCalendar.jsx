import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import CalendarCaption from './CalendarCaption'
import { addMonths, subMonths } from 'date-fns'

const MontlyCalendar = () => {
  const [month, setMonth] = React.useState(new Date())

  return (
    <div className='rounded-[20px] bg-white p-[22px] shadow-[0_0_4px_0_rgba(0,0,0,0.25)]'>
      <DayPicker
        disabled
        locale={ko}
        month={month}
        onMonthChange={setMonth}
        mode='single'
        components={{
          MonthCaption: (p) => (
            <CalendarCaption
              {...p}
              month={month}
              onPrev={() => setMonth((m) => subMonths(m, 1))}
              onNext={() => setMonth((m) => addMonths(m, 1))}
            />
          ),
        }}
        className='bg-blue'
        classNames={{
          nav: 'hidden',
          month_caption: 'hidden',
          disabled: '',
          month_grid: 'border-separate border-spacing-x-[6px] border-spacing-y-[6px]',
          // 요일
          weekday: 'pb-[6px] font-medium text-[14px] text-black',
          // 날짜
          day: 'h-[30px] w-[30px]',
          day_button: 'h-[30px] w-[30px] p-0 font-medium text-[14px] text-black',
        }}
      />
    </div>
  )
}

export default MontlyCalendar
