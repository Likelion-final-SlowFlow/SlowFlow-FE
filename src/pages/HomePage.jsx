import React from 'react'
import Score from '@/components/home/Score'
import SelectCategory from '@/components/home/SelectCategory'

const HomePage = () => {
  return (
    <div className='screen-center'>
      <div className='mb-4 ml-[15%] self-start'>
        <p className='text-xl font-semibold text-black'>오늘의 목표 도달까지</p>
        <p className='text-xl font-semibold text-black'>200점 남았어요!</p>
      </div>
      <Score />
      <SelectCategory />
    </div>
  )
}

export default HomePage
