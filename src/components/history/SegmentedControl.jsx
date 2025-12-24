import { useState } from 'react'
import { cn } from '@/lib/utils'

const SegmentedControl = ({ value, onChange }) => {
  const isWeek = value === 'week'

  return (
    <div className='bg-light relative flex h-14 w-[75.1vw] max-w-[295px] rounded-full px-2 py-[5px]'>
      {/* 슬라이딩 */}
      <div
        className={cn(
          'absolute top-[5px] h-[46px] w-[37.4vw] max-w-[147px] rounded-full bg-black transition-all duration-300',
          isWeek ? 'left-1' : 'right-1',
        )}
      />

      {/* 주간 */}
      <button
        onClick={() => onChange('week')}
        className={cn(
          'relative z-10 flex-1 text-[18px] font-medium transition-colors',
          isWeek ? 'text-white' : 'text-black',
        )}
      >
        주간
      </button>

      {/* 월간 */}
      <button
        onClick={() => onChange('month')}
        className={cn(
          'relative z-10 flex-1 text-[18px] font-medium transition-colors',
          !isWeek ? 'text-white' : 'text-black',
        )}
      >
        월간
      </button>
    </div>
  )
}

export default SegmentedControl
