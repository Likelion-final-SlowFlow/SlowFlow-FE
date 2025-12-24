import { useState } from 'react'
import CategoryDropdown from './CategoryDropdown'
import Button from '../common/Button'

const CATEGORY_CONFIG = {
  식단: {
    placeholder: `먹은 음식과 양, 시간대를 적어주세요\n\n예: 점심 12시에 샐러드 한 접시`,
  },
  운동: {
    placeholder: `언제, 어떤 운동을 얼마나 했는지 한 줄로 적어주세요\n\n예: 오후 3시에 집 앞에서 20분 산책`,
  },
  수면: {
    placeholder: `몇 시에 자서, 몇 시간 잤는지, 느낌까지 같이 적어주세요\n\n예: 새벽 1시에 자서 7시간, 푹 잠`,
  },
}

export default function SelectCategory() {
  const [category, setCategory] = useState(null)
  const [text, setText] = useState('')

  const isCategorySelected = Boolean(category)
  const isButtonEnabled = isCategorySelected && text.length > 0

  return (
    <div className='w-[75%] rounded-[40px] bg-[#DFF0B4] p-7'>
      <CategoryDropdown
        value={category}
        onChange={(value) => {
          setCategory(value)
          setText('')
        }}
      />

      <textarea
        disabled={!isCategorySelected}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={
          isCategorySelected ? CATEGORY_CONFIG[category].placeholder : '카테고리를 선택해주세요'
        }
        className='placeholder:text-disabled mt-4 h-38 w-full resize-none rounded-[30px] bg-white p-4 text-sm placeholder:text-base focus:outline-none'
      />

      <Button
        onClick={() => {}}
        text={'확인'}
        disabled={!isButtonEnabled}
        width='w-[100%]'
        marginTop='mt-3'
      />
    </div>
  )
}
