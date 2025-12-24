import React from 'react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import LeftIcon from '@/assets/chevron-left.svg'
import RightIcon from '@/assets/chevron-right.svg'

export default function CalendarCaption({ month, onPrev, onNext }) {
  return (
    <div className='flex items-center pb-[9px]'>
      <button type='button' onClick={onPrev} className='pr-[13px]'>
        <img src={LeftIcon} alt='prev' className='h-[13px] w-[13px]' />
      </button>

      <div className='pb-0.5 text-[16px] font-medium text-black'>
        {format(month, 'yyyy년 M월', { locale: ko })}
      </div>

      <button type='button' onClick={onNext} className='pl-[13px]'>
        <img src={RightIcon} alt='next' className='h-[13px] w-[13px]' />
      </button>
    </div>
  )
}
