// @ts-nocheck
import React, { useState } from 'react'
import SegmentedControl from '../components/history/SegmentedControl'
import WeeklyComponent from '../components/history/WeeklyComponent'
import MonthlyComponent from '../components/history/MonthlyComponent'

const HistoryPage = () => {
  const [mode, setMode] = useState('week')

  return (
    <div className='mt-[19px] flex min-h-screen flex-col items-center'>
      <SegmentedControl value={mode} onChange={setMode} />

      {mode === 'week' && <WeeklyComponent />}
      {mode === 'month' && <MonthlyComponent />}
    </div>
  )
}

export default HistoryPage
