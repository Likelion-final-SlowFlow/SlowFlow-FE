import PieChart from './PieChart'

export default function Score({
  currentScore = 50,
  goalScore = 200,
  messageTitle = '건강하게 채우고 있어요!',
  messageDesc = '조금만 더 쌓으면 더 든든할 거예요.',
}) {
  return (
    <div className='mb-2 w-[75%] rounded-[40px] bg-[#F7F7F7] p-7'>
      <div className='flex items-center justify-between rounded-[30px] bg-white p-4'>
        <div className='md:h-30" flex h-25 w-25 items-center justify-center sm:h-30 sm:w-30 md:w-30'>
          <PieChart goal={goalScore} value={currentScore} width={15} />
        </div>

        <div className='mr-[2%] flex flex-col items-center'>
          <span className='text-base font-semibold text-black'>목표 점수</span>
          <span className='text-base font-semibold text-black'>{goalScore}</span>
        </div>
      </div>

      <div className='mt-4 rounded-[20px] bg-white p-4'>
        <p className='text-sm font-medium text-black'>{messageTitle}</p>
        <p className='mt-1 text-sm font-medium text-black'>{messageDesc}</p>
      </div>
    </div>
  )
}
