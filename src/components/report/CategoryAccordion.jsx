import Dropdown1 from '@/assets/dropdown_black.svg?react'
import Dropdown2 from '@/assets/dropdown_black2.svg?react'

export default function CategoryAccordion({
  label = '수면',
  score = '0',
  tone = 'soft',
  items = [],
}) {
  const cardBg = tone === 'warm' ? 'bg-warm' : 'bg-soft'

  return (
    <details className={`group overflow-hidden rounded-[20px] ${cardBg}`}>
      <summary className='flex cursor-pointer list-none items-center justify-between px-5 py-4'>
        <p className='text-primary text-base font-medium'>{label}</p>

        <div className='flex items-center gap-3'>
          <p className='text-base font-medium text-black'>{score}</p>
          <Dropdown1 className='h-5 w-5 group-open:hidden' />
          <Dropdown2 className='hidden h-5 w-5 group-open:block' />
        </div>
      </summary>

      <div className='min-h-[100px] px-7 pb-7'>
        {items.length === 0 ? (
          <div className='flex min-h-[100px] items-center justify-center pb-2 text-center text-xs font-medium text-black'>
            오늘 아직 입력된 {label}이 없어요
          </div>
        ) : (
          <div className='space-y-3'>
            {items.map((it, idx) => (
              <div
                key={`${it.text}-${idx}`}
                className='flex items-center justify-between rounded-xl bg-white px-4 py-3'
              >
                <p className='text-xs font-medium text-black'>{it.text}</p>
                <p className='text-xs font-medium text-black'>{it.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  )
}
