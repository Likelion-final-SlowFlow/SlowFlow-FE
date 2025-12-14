import React from 'react'
import Button from '../common/Button'
const AuthModal = ({ message, onClose }) => {
  return (
    <div className='fixed z-50 flex h-full w-full max-w-5xl items-center justify-center bg-black/60'>
      <div className='flex h-52 w-[81.7vw] max-w-[837px] flex-col items-center justify-center rounded-[20px] bg-white'>
        <p className='text-primary align px-5 text-center text-base font-semibold'>{message}</p>
        <Button
          disabled={false}
          text='확인'
          onClick={onClose}
          width='w-[63.9vw]'
          maxWidth='max-w-[653px]'
          rounded='rounded-[10px]'
        />
      </div>
    </div>
  )
}

export default AuthModal
