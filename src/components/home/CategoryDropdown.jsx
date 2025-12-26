import { useState } from 'react'
import Dropdown1 from '@/assets/dropdown.svg?react'
import Dropdown2 from '@/assets/dropdown2.svg?react'

const CATEGORIES = ['식단', '운동', '수면']

export default function CategoryDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const isSelected = Boolean(value)

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={() => setOpen(!open)}
        className={`flex w-full items-center justify-between rounded-[15px] px-4 py-3 text-base font-medium ${isSelected ? 'bg-white text-black' : 'text-disabled bg-white'} `}
      >
        {isSelected ? value : '카테고리를 선택하세요'}
        {open ? <Dropdown2 /> : <Dropdown1 />}
      </button>

      {open && (
        <div className='absolute top-full left-0 z-2 mt-2 w-full overflow-hidden rounded-[15px] bg-white shadow-md'>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                onChange(category)
                setOpen(false)
              }}
              className='hover:bg-lightgreen w-full px-4 py-3 text-left text-base font-medium text-black'
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
