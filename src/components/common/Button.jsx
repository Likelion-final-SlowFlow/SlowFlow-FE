import React from 'react'

const Button = ({
  onClick,
  text,
  disabled = false,
  width = 'w-[81.7vw]',
  maxWidth = 'max-w-[837px]',
  rounded = 'rounded-[15px]',
  marginTop = 'mt-[29px]',
}) => {
  return (
    <div>
      <button
        className={`${marginTop} h-[41px] ${width} ${maxWidth} ${rounded} text-base font-semibold text-white ${
          disabled ? 'bg-disabled' : 'bg-primary'
        }`}
        onClick={onClick}
        disabled={disabled}
        type='button'
      >
        {text}
      </button>
    </div>
  )
}

export default Button
