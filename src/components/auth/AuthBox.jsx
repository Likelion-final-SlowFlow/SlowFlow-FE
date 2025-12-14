import React from 'react'

const AuthBox = ({
  label,
  value,
  type,
  name,
  onChange,
  onBlur,
  invalid,
  errorMessage,
  showCheckButton = false,
  onCheck = undefined,
  successMessage = '',
}) => {
  const isInvalid = Boolean(invalid)

  return (
    <div className='flex w-[81.7vw] max-w-[837px] flex-col'>
      <p className='mb-2.5 text-xl font-medium'>{label}</p>
      <div className='relative w-full'>
        <input
          className={`h-11 w-full rounded-[15px] border-1 border-solid pr-[70px] pl-4 text-lg font-medium focus:outline-none ${invalid ? 'border-red-500' : 'border-bg-medium focus:border-color-accent'} `}
          name={name}
          value={value}
          type={type || 'text'}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete='off'
        />

        {showCheckButton && (
          <button
            type='button'
            disabled={!value.trim()}
            onClick={onCheck}
            className={`absolute top-1/2 right-2.5 h-6 w-[59px] -translate-y-1/2 rounded-[15px] text-[11px] font-medium ${!value.trim() ? 'bg-medium cursor-not-allowed' : 'bg-primary text-white'}`}
          >
            중복확인
          </button>
        )}
      </div>
      {isInvalid && <span className='text-red text-sm'>{errorMessage}</span>}
      {!invalid && successMessage && (
        <span className='text-green mt-1 text-sm'>{successMessage}</span>
      )}
    </div>
  )
}

export default AuthBox
