import ProgressBar from './ProgressBar'

export default function ScoreSummaryCard({
  title = '오늘의 점수: +0',
  goal = 100,
  positiveValue = '+0',
  positivePercent = 0,
  negativeValue = '0',
  negativePercent = 0,
}) {
  return (
    <div className='bg-light rounded-[20px] px-5 py-5'>
      <div className='flex items-center'>
        <p className='text-primary text-base font-semibold'>{title}</p>
      </div>
      <div className='text-right text-xs font-semibold'>
        <p className='text-charge-green'>
          {'채움'} {positiveValue}
        </p>
        <ProgressBar percent={positivePercent} fillColor='#a8e063' max={goal} />
      </div>
      <div className='mt-0.5 text-right text-xs font-semibold'>
        <p className='text-drain-peach'>
          {'부담'} {negativeValue}
        </p>
        <ProgressBar percent={negativePercent} fillColor='#ffab9d' max={goal} />
      </div>
    </div>
  )
}
