import { useEffect } from 'react'
import Score from '@/components/home/Score'
import SelectCategory from '@/components/home/SelectCategory'
import { getDashboard } from '@/api/home/getDashboard'
import useApi from '@/hook/useApi'
import Footer from '@/components/common/Footer'

const HomePage = () => {
  const { data, error, loading, execute } = useApi(getDashboard)

  useEffect(() => {
    execute()
  }, [])

  if (loading) return <p>불러오는 중…</p>
  if (error) return <p>{error.message}</p>

  return (
    <div className='flex min-h-screen flex-col items-center'>
      <div className='mt-[15%] mb-4 ml-[15%] self-start'>
        <p className='text-xl font-semibold text-black'>오늘의 목표 도달까지</p>
        <p className='text-xl font-semibold text-black'>{data?.remainingToGoal}점 남았어요!</p>
      </div>
      <Score
        currentScore={data?.currentScore}
        goalScore={data?.goalScore}
        message={data?.feedback}
      />
      <SelectCategory />
      <Footer select='home' />
    </div>
  )
}

export default HomePage
