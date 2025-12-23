import Left from '@/assets/left.svg?react'
import Right from '@/assets/right.svg?react'

const startOfDay = (d) => {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

const addDays = (d, delta) => {
  const x = new Date(d)
  x.setDate(x.getDate() + delta)
  return x
}

const format = (d) => {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}.${m}.${day}`
}

export default function DateNavigator({ date, onChange, maxDate = new Date() }) {
  const cur = startOfDay(date)
  const max = startOfDay(maxDate)
  const disableNext = cur.getTime() >= max.getTime()

  const move = (delta) => {
    const next = startOfDay(addDays(cur, delta))
    if (next.getTime() > max.getTime()) return
    onChange(next)
  }

  return (
    <div className='flex w-full items-center justify-center'>
      <div className='bg-light flex w-full items-center justify-between rounded-full px-4 py-2'>
        <button
          onClick={() => move(-1)}
          className='grid h-9 w-9 place-items-center rounded-full hover:bg-black/5'
          aria-label='이전 날짜'
        >
          <Left />
        </button>

        <p className='text-base font-semibold text-black/80'>{format(cur)}</p>

        <button
          onClick={() => move(1)}
          disabled={disableNext}
          className='grid h-9 w-9 place-items-center rounded-full hover:bg-black/5 disabled:opacity-40 disabled:hover:bg-transparent'
          aria-label='다음 날짜'
        >
          <Right />
        </button>
      </div>
    </div>
  )
}
