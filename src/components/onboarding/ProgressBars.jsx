export default function ProgressBars({ total, current }) {
  return (
    <div className='mx-auto mt-8 flex w-[85%] gap-4'>
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i <= current

        return (
          <div key={i} className='bg-disabled relative h-1.5 flex-1 overflow-hidden rounded-full'>
            <div
              className={[
                'bg-main-green absolute inset-0 rounded-full',
                'origin-left transform transition-transform duration-300 ease-out',
                isActive ? 'scale-x-100' : 'scale-x-0',
              ].join(' ')}
            />
          </div>
        )
      })}
    </div>
  )
}
