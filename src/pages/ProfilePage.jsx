// @ts-nocheck
import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { Slider } from '@/components/ui/slider'

const ProfilePage = () => {
  const navigate = Navigate()
  const [value, setValue] = React.useState([200]) // Slider 값 상태 관리
  const min = 0
  const max = 400
  const thumbSize = 18
  const percent = ((value[0] - min) / (max - min)) * 100
  const offset = (0.5 - percent / 100) * thumbSize
  const hideMin = value[0] <= 10
  const hideMax = value[0] >= 390
  const [userId, setUserId] = React.useState('')

  const getId = () => {
    axios
      .get('/profile')
      .then((response) => {
        console.log(response.data) // 확인 후 삭제 예정
        setUserId(response.data.userId)
      })
      .catch((error) => {
        console.log(error)
        // 추가 에러 처리 예정
      })
  }

  const postLogout = () => {
    axios
      .post('/auth/logout', {
        userId: userId,
      })
      .then((response) => {
        console.log(response.data) // 확인 후 삭제 예정
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        // 추가 에러 처리 예정
      })
  }

  return (
    <div className='screen-center'>
      <div className='mt-[34px] mb-[17px] w-[73.8vw] max-w-[756px]'>
        {/* 사용자 아이디 */}
        <section className='text-sb-18 bg-light mb-[34px] flex h-[97px] items-center rounded-[20px] pl-5'>
          사용자 아이디님
        </section>
        {/* 목표 설정*/}
        <section className='mb-[37px]'>
          <p className='text-sb-18 mb-2.5'>목표 설정하기</p>
          <div className='bg-light flex h-auto flex-col items-center justify-center rounded-[20px]'>
            <div className='w-[62.9vw] max-w-[643px]'>
              <p className='pt-[15px] pb-6 text-[16px] font-medium'>오늘의 목표</p>
              <div className='relative'>
                <Slider value={value} onValueChange={setValue} min={min} max={max} step={1} />
                {/* 현재 값 (Thumb 아래) */}
                <span
                  className='text-main-green absolute bottom-full mb-1 -translate-x-1/2 text-[14px] font-medium'
                  style={{ left: `calc(${percent}% + ${offset}px)` }}
                >
                  {value[0]}
                </span>
                {/* min / max */}
                <div className='text-disabled mt-1.5 flex justify-between text-[14px] font-medium'>
                  <span className={hideMin ? 'invisible' : ''}>{min}</span>
                  <span className={hideMax ? 'invisible' : ''}>{max}</span>
                </div>
              </div>
              <p className='font-regular text-disabled pb-3.5 text-[11px]'>
                목표값을 바꾸지 않으면 오늘도 같은 목표로 진행해요
              </p>
            </div>
          </div>
        </section>
        {/* 스코어링 기준표 */}
        <section className='mb-[25px]'>
          <p className='text-sb-18 mb-2.5'>스코어링 기준표</p>
          <div className='bg-soft flex h-auto flex-col items-center rounded-[20px] py-[27px]'>
            <div className='w-[62.6vw] max-w-[641px]'>
              <p className='pb-1.5 text-[14px] font-medium'>점수는 이렇게 매겨져요 </p>
              <div className='mb-[15px] flex flex-col gap-1.5 rounded-[20px] bg-white py-[17px] pl-5'>
                <div className='flex justify-between pr-[22px] pb-7'>
                  <p className='highlight-center text-[14px] font-medium'>
                    <span className='highlight-text'>채움</span>
                  </p>
                  <p className='text-[14px] font-medium'>건강에 좋은 행동</p>
                </div>
                <div className='flex justify-between pr-[22px]'>
                  <p className='highlight-center text-[14px] font-medium'>
                    <span className='highlight-text'>부담</span>
                  </p>
                  <p className='text-[14px] font-medium'>몸에 무리가 가는 행동</p>
                </div>
              </div>
              <p className='pb-1.5 text-[14px] font-medium'>점수 크기 가이드</p>
              <div className='mb-[15px] flex flex-col gap-1.5 rounded-[20px] bg-white py-[17px] pl-5'>
                <p className='highlight-center w-[119px] text-[14px] font-medium'>
                  <span className='highlight-text'>작은 점수(±20~40)</span>
                </p>
                <p className='text-[14px] font-medium'>일상의 작은 습관들</p>
                <p className='text-[14px] font-medium'>예: 가벼운 스트레칭, 과자 조금</p>
              </div>
              <div className='mb-[15px] flex flex-col gap-1.5 rounded-[20px] bg-white py-[17px] pl-5'>
                <p className='highlight-center w-[119px] text-[14px] font-medium'>
                  <span className='highlight-text'>중간 점수(±40~80)</span>
                </p>
                <p className='text-[14px] font-medium'>한 끼나 한 번의 행동</p>
                <p className='text-[14px] font-medium'>예: 20분 운동, 수면 부족</p>
              </div>
              <div className='flex flex-col gap-1.5 rounded-[20px] bg-white py-[17px] pl-5'>
                <p className='highlight-center w-[124px] text-[14px] font-medium'>
                  <span className='highlight-text'>높은 점수(±80 이상)</span>
                </p>
                <p className='text-[14px] font-medium'>드물게 나타나는 점수</p>
                <p className='text-[14px] font-medium'>예: 여러 건강 행동, 폭식, 밤샘</p>
              </div>
            </div>
          </div>

          <div className='bg-soft h-auto rounded-[20px]'></div>
        </section>
        {/* 로그아웃 */}
        <section className='bg-light flex h-[53px] items-center rounded-[20px] pl-[38px]'>
          <button className='text-[16px] font-medium' onClick={postLogout}>
            로그아웃
          </button>
        </section>
      </div>
    </div>
  )
}

export default ProfilePage
