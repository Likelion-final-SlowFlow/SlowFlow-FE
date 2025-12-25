import { useEffect } from 'react'
import Button from '../common/Button'

export default function ActionResultModal({ open, onClose, result }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const hasResult = result != null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center px-6'>
      <button
        aria-label='close'
        onClick={onClose}
        className='absolute inset-0 bg-black/35 backdrop-blur-[2px]'
      />

      <div className='relative w-[85%] max-w-[340px] rounded-[20px] bg-white p-8 shadow-2xl'>
        <h2 className='text-center text-xl font-semibold text-black'>
          {hasResult
            ? result.rawScore > 0
              ? `+${result.rawScore} 채움`
              : `${result.rawScore} 부담`
            : '오늘 해당 카테고리 점수 한도에 도달했습니다.'}
        </h2>

        {hasResult && (
          <>
            <div className='mt-4 rounded-[20px] bg-[#FFF6EA] p-4'>
              <p className='text-xs font-medium text-black'>{result.reason}</p>
            </div>

            <div className='mt-4 flex h-[55px] items-center rounded-[20px] bg-[#F3F3F3] px-4 py-3 text-start'>
              <span className='text-sm font-medium text-black'>
                오늘 점수: {result.updatedTotalScore}
              </span>
            </div>
          </>
        )}

        <Button onClick={onClose} text={'확인'} width='w-full' marginTop='mt-4' />
      </div>
    </div>
  )
}
