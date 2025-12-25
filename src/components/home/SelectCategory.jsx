import { useState } from 'react'
import CategoryDropdown from './CategoryDropdown'
import Button from '../common/Button'
import { actions } from '@/api/home/actions'
import useApi from '@/hook/useApi'
import ActionResultModal from './ActionResultModal'
import BottomSheet from './BottomSheet'

const CATEGORY_CONFIG = {
  식단: {
    type: 'DIET',
    placeholder: `먹은 음식과 양, 시간대를 적어주세요\n\n예: 점심 12시에 샐러드 한 접시`,
  },
  운동: {
    type: 'EXERCISE',
    placeholder: `언제, 어떤 운동을 얼마나 했는지 한 줄로 적어주세요\n\n예: 오후 3시에 집 앞에서 20분 산책`,
  },
  수면: {
    type: 'SLEEP',
    placeholder: `몇 시에 자서, 몇 시간 잤는지, 느낌까지 같이 적어주세요\n\n예: 새벽 1시에 자서 7시간, 푹 잠`,
  },
}

export default function SelectCategory() {
  const [category, setCategory] = useState(null)
  const [text, setText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [modalResult, setModalResult] = useState(null)

  const { execute } = useApi(actions)

  const isCategorySelected = Boolean(category)
  const isButtonEnabled = isCategorySelected && text.length > 0

  const handleActions = async () => {
    try {
      const res = await execute({
        category: CATEGORY_CONFIG[category].type,
        text,
      })
      setModalResult(res ?? null)
    } catch (e) {
      setModalResult(null)
    } finally {
      setIsModalOpen(true)
    }
  }

  const reset = () => {
    window.location.reload()
    setText('')
    setCategory(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)

    if (modalResult == null) return reset()
    if (modalResult.updatedTotalScore < 0) return setIsSheetOpen(true)

    reset()
  }

  return (
    <>
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
          onClick={handleActions}
          text={'확인'}
          disabled={!isButtonEnabled}
          width='w-[100%]'
          marginTop='mt-3'
        />
      </div>

      <ActionResultModal open={isModalOpen} onClose={closeModal} result={modalResult} />

      <BottomSheet
        open={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
        score={modalResult?.updatedTotalScore}
        onLimitExceeded={() => {
          setIsSheetOpen(false)
          setModalResult(null)
          setIsModalOpen(true)
        }}
      />
    </>
  )
}
