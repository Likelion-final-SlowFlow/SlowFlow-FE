// @ts-nocheck
import React, { useState } from 'react'
import SegmentedControl from '../components/history/SegmentedControl'
import WeeklyComponent from '../components/history/WeeklyComponent'
import MonthlyComponent from '../components/history/MonthlyComponent'
import Footer from '@/components/common/Footer'

const HistoryPage = () => {
  const [mode, setMode] = useState('week')

  return (
    <div className='flex min-h-screen flex-col items-center pt-[19px]'>
      <SegmentedControl value={mode} onChange={setMode} />

      {mode === 'week' && <WeeklyComponent />}
      {mode === 'month' && <MonthlyComponent />}
      <Footer select='history' />
    </div>
  )
}

export default HistoryPage
