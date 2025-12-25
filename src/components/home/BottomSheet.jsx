import { useEffect, useMemo, useState } from 'react'
import { getBottomsheet } from '@/api/home/getBottomsheet'
import useApi from '@/hook/useApi'

export default function BottomSheet({ open, onClose, score }) {
  const [selectedItemId, setSelectedItemId] = useState(null)
  const { data, execute } = useApi(getBottomsheet)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    setSelectedItemId(null)
    execute()
  }, [open, execute])

  if (!open) return null

  const items = useMemo(() => data?.data?.items ?? [], [data])

  const cardClass = (isSelected) =>
    [
      'rounded-[10px] px-3 py-4 text-center ring-1 transition',
      isSelected ? 'bg-[#EBF4D1] ring-[#C5DF7D]' : 'bg-light ring-white hover:bg-black/[0.02]',
    ].join(' ')

  const selectedItem = items.find((it) => it.id === selectedItemId)

  const handleConfirm = async () => {
    if (!selectedItemId) return

    onClose?.()
  }

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center'>
      <button
        aria-label='close'
        onClick={onClose}
        className='absolute inset-0 bg-black/35 backdrop-blur-[2px]'
      />

      <div className='relative h-[60%] w-full rounded-t-[50px] bg-white p-8'>
        <div className='mx-auto mb-10 h-[5px] w-[52px] rounded-full bg-black/10' />

        <div className='px-1'>
          <h2 className='text-xl leading-[30px] font-bold text-black'>
            오늘 몸에 {score}점 부담을 줬어요
            <br />
            가벼운 채움 행동으로 균형 맞춰볼까요?
          </h2>
          <p className='mt-6 text-base leading-[22px] font-medium whitespace-pre-line text-black'>
            {' '}
            지금 바로 할 수 있는 간단한 것들이에요. {'\n'} 완벽하게 채우지 못해도 괜찮아요, {'\n'}{' '}
            작은 채움도 건강에 도움이 됩니다.{' '}
          </p>
        </div>

        <div className='mt-6 grid h-[40%] grid-cols-3 gap-3'>
          {items.map((item) => {
            const isSelected = selectedItemId === item.id
            return (
              <button
                key={item.id}
                type='button'
                onClick={() => setSelectedItemId(item.id)}
                className={cardClass(isSelected)}
                aria-pressed={isSelected}
              >
                <p className='text-base leading-[18px] font-medium whitespace-pre-line text-black'>
                  {item.behavior.replaceAll(' ', '\n')}
                </p>
                <p className='mt-3 text-base font-medium text-black'>+{item.score} 채움</p>
              </button>
            )
          })}
        </div>

        <div className='mt-6 grid grid-cols-2 gap-5'>
          <button
            type='button'
            onClick={onClose}
            className='bg-disabled h-11 rounded-[10px] text-[14px] font-semibold text-white'
          >
            이대로 둘래요
          </button>

          <button
            type='button'
            disabled={!selectedItemId}
            onClick={handleConfirm}
            className='bg-main-green h-11 rounded-[10px] text-[14px] font-semibold text-white disabled:bg-black/20'
          >
            실천할게요
          </button>
        </div>
      </div>
    </div>
  )
}
