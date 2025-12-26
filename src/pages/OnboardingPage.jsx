import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBars from '@/components/onboarding/ProgressBars'
import Button from '@/components/common/Button'

import img1 from '@/assets/onboarding1.svg'
import img2 from '@/assets/onboarding2.svg'
import img3 from '@/assets/onboarding3.svg'
import img4 from '@/assets/onboarding4.svg'

export default function OnboardingPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const steps = useMemo(
    () => [
      {
        title: '하루가 왜 이렇게 피곤한지,\n원인을 모르겠나요?',
        desc: [
          '생활 속 여러 행동이 건강을 적립하거나 차감해요',
          '',
          '',
          '하지만 우리는 그 흐름을 거의 몰라요',
        ],
        image: img1,
        cta: '다음',
      },
      {
        title: '당신의 하루는\n‘채움’과 ‘부담’으로 흘러갑니다',
        desc: ['', '꾸준한 걷기 → 채움', '', '점심 폭식 → 부담'],
        image: img2,
        cta: '다음',
      },
      {
        title: '채움과 부담을 합쳐\n오늘의 점수를 만들어줘요',
        desc: [],
        image: img3,
        cta: '다음',
      },
      {
        title: '하루가 좋아지도록,\n행동별로 쉽게 알려드릴게요',
        desc: [],
        image: img4,
        cta: '시작하기',
        onDone: () => {
          localStorage.setItem('onboarding_done', '1')
          navigate('/login')
        },
      },
    ],
    [navigate],
  )

  const total = steps.length
  const current = steps[step]

  const goNext = () => {
    if (step === total - 1) {
      current.onDone?.()
      return
    }
    setStep((s) => Math.min(s + 1, total - 1))
  }

  return (
    <div className='h-screen w-full overflow-auto bg-white'>
      <ProgressBars total={total} current={step} />

      <div className='mx-auto mt-[3vh] flex h-[calc(100vh-140px)] w-[85%] flex-col pt-8 pb-8'>
        <div>
          <h1 className='text-2xl leading-8 font-bold whitespace-pre-line text-black'>
            {current.title}
          </h1>

          {current.desc?.length > 0 && (
            <div className='text-primary mt-[7vh] min-h-[8vh] text-xl leading-tight font-medium'>
              {current.desc.map((line, idx) =>
                line === '' ? <div key={idx} className='h-2' /> : <p key={idx}>{line}</p>,
              )}
            </div>
          )}
        </div>

        <div className='flex flex-1 items-center justify-center'>
          <img src={current.image} alt={`onboarding-${step + 1}`} className='select-none' />
        </div>

        <button
          onClick={goNext}
          className='fixed bottom-[4vh] left-1/2 h-[60px] w-[75%] -translate-x-1/2 rounded-full bg-[#2F2F2F] text-xl font-medium text-white active:scale-[0.99]'
        >
          {current.cta}
        </button>
      </div>
    </div>
  )
}
