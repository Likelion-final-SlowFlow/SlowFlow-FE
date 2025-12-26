import { useEffect } from 'react'
import Score from '@/components/home/Score'
import SelectCategory from '@/components/home/SelectCategory'
import { getDashboard } from '@/api/home/getDashboard'
import useApi from '@/hook/useApi'
import Footer from '@/components/common/Footer'

const HomePage = () => {
  const { data, loading, execute } = useApi(getDashboard)

  useEffect(() => {
    execute()
  }, [])

  return (
    !loading && (
      <div className='flex h-screen flex-col'>
        <div className='no-scrollbar flex-1 overflow-y-auto'>
          <div className='flex min-h-full flex-col items-center'>
            <div className='mt-[15%] mb-4 ml-[15%] self-start'>
              <p className='text-xl font-semibold text-black'>오늘의 목표 도달까지</p>
              <p className='text-xl font-semibold text-black'>
                {data?.remainingToGoal}점 남았어요!
              </p>
            </div>
            <Score
              currentScore={data?.currentScore}
              goalScore={data?.goalScore}
              message={data?.feedback}
            />
            <SelectCategory />
            <div className='h-[95px]' />
          </div>
        </div>
        <Footer select='home' />
      </div>
    )
  )
}

export default HomePage
