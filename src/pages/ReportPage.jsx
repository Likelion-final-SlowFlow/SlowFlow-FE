import { useState, useEffect } from 'react'
import AICommentCard from '@/components/report/AICommentCard'
import CategoryAccordion from '@/components/report/CategoryAccordion'
import ScoreSummaryCard from '@/components/report/ScoreSummaryCard'
import DateNavigator from '@/components/report/DateNavigator'
import { getDailyreport } from '@/api/report/getDailyReport'
import useApi from '@/hook/useApi'

export default function ReportPage() {
  const [date, setDate] = useState(new Date())

  const { data, loading, execute } = useApi(getDailyreport)

  useEffect(() => {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    const dateParam = `${yyyy}-${mm}-${dd}`

    console.log(dateParam)
    execute({ date: dateParam })
  }, [date, execute])

  return (
    <div className='no-scrollbar h-screen w-full overflow-y-auto'>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-10 w-[75%]'>
          <DateNavigator date={date} onChange={setDate} />

          {!loading && (
            <>
              <section className='mt-6'>
                <h2 className='text-primary text-lg font-semibold'>오늘의 요약</h2>

                <div className='mt-3'>
                  <ScoreSummaryCard
                    title={
                      data?.totalScore > 0
                        ? `오늘의 점수: +${data?.totalScore}`
                        : `오늘의 점수: ${data?.totalScore}`
                    }
                    goal={200}
                    positiveValue={`+${data?.totalPositive}`}
                    positivePercent={data?.totalPositive}
                    negativeValue={`-${data?.totalNegative}`}
                    negativePercent={data?.totalNegative}
                  />
                </div>
              </section>

              <section className='mt-8'>
                <h2 className='text-primary text-lg font-semibold'>행동별 분석</h2>

                <div className='mt-3 space-y-3'>
                  {data?.categories.map((category, idx) => (
                    <CategoryAccordion
                      key={idx}
                      label={category?.category ?? idx}
                      score={category?.totalScore}
                      tone={idx === 1 ? 'warm' : 'neutral'}
                      items={category?.actions}
                    />
                  ))}
                </div>
              </section>

              <section className='mt-8'>
                <h2 className='text-primary text-lg font-semibold'>AI 통합 코멘트</h2>

                <div className='mt-3 mb-10'>
                  <AICommentCard>{data?.aiComment}</AICommentCard>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
