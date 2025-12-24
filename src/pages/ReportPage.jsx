import { useState } from 'react'
import AICommentCard from '@/components/report/AICommentCard'
import CategoryAccordion from '@/components/report/CategoryAccordion'
import ScoreSummaryCard from '@/components/report/ScoreSummaryCard'
import DateNavigator from '@/components/report/DateNavigator'

export default function ReportPage() {
  const [date, setDate] = useState(new Date())

  return (
    <div className='no-scrollbar h-screen w-full overflow-y-auto'>
      <div className='flex w-full flex-col items-center justify-center'>
        <div className='mt-10 w-[75%]'>
          <DateNavigator date={date} onChange={setDate} />

          <section className='mt-6'>
            <h2 className='text-primary text-lg font-semibold'>오늘의 요약</h2>

            <div className='mt-3'>
              <ScoreSummaryCard
                title='오늘의 점수: +65'
                goal={200}
                positiveValue='+85'
                positivePercent={60}
                negativeValue='-20'
                negativePercent={35}
              />
            </div>
          </section>

          <section className='mt-8'>
            <h2 className='text-primary text-lg font-semibold'>행동별 분석</h2>

            <div className='mt-3 space-y-3'>
              <CategoryAccordion
                label='수면'
                score='-20'
                tone='neutral'
                items={[{ text: '수면 6시간 / 중간 각성 1회', value: '-20' }]}
              />
              <CategoryAccordion label='운동' score='0' tone='warm' items={[]} />
              <CategoryAccordion
                label='식단'
                score='+35'
                tone='neutral'
                items={[
                  { text: '샐러드 + 계란 + 요거트', value: '+30' },
                  { text: '연어 덮밥 + 미소국', value: '+20' },
                  { text: '카페 라떼 + 쿠키', value: '-15' },
                ]}
              />
            </div>
          </section>

          <section className='mt-8'>
            <h2 className='text-primary text-lg font-semibold'>AI 통합 코멘트</h2>

            <div className='mt-3 mb-10'>
              <AICommentCard>
                <p>수면이 조금 부족했어요</p>
                <p>운동도 꾸준히 하셨네요</p>
                <p>식단을 건강하게 채웠어요</p>
                <br />
                <p>내일은 일찍 자는 것만</p>
                <p>신경 써도 완벽할 거예요!</p>
              </AICommentCard>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
