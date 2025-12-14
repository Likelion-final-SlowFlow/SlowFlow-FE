import React, { useEffect, useState } from 'react'
import AuthBox from '../components/auth/AuthBox'
import Button from '../components/common/Button'
import Logo from '../assets/Logo.svg'
import AuthModal from '@/components/auth/AuthModal'

const SignupPage = () => {
  const [showModal, setShowModal] = useState(false)
  // 모달 테스트용
  useEffect(() => {
    setShowModal(true)
  }, [])

  const [form, setForm] = useState({ email: '', id: '', password: '', passwordCheck: '' })
  const [touched, setTouched] = useState({
    email: false,
    id: false,
    password: false,
    passwordCheck: false,
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // 중복 확인
  const [isIdAvailable, setIsIdAvailable] = useState(null)
  const [isEmailAvailable, setIsEmailAvailable] = useState(null)

  const checkDuplicateEmail = () => {
    // 연동 코드 작성 예정
    // 성공 시
    // setIsEmailAvailable(true)
    // 실패 시
    // setIsEmailAvailable(false)
  }
  const checkDuplicateId = () => {
    // 연동 코드 작성 예정
    // 성공 시
    // setIsIdAvailable(true)
    // 실패 시
    // setIsIdAvailable(false)
  }

  // 유효성 검사
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/.test(password)

  // 회원가입 처리
  const handleSignup = () => {
    // 연동 코드 작성 예정
  }

  const isDisabled = !(
    isEmailAvailable &&
    isIdAvailable &&
    form.password &&
    form.passwordCheck &&
    form.password === form.passwordCheck
  )

  return (
    <div className='screen-center'>
      <img src={Logo} alt='SlowFlow Logo' className='mb-[19px] w-[116px]' />

      <form className='flex flex-col gap-[18px]' onSubmit={(e) => e.preventDefault()}>
        <AuthBox
          label='이메일'
          name='email'
          value={form.email}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          onCheck={checkDuplicateEmail}
          showCheckButton={true}
          invalid={
            touched.email &&
            (!form.email || !isValidEmail(form.email) || isEmailAvailable === false)
          }
          successMessage={
            touched.email && form.email && isEmailAvailable ? '사용 가능한 이메일입니다' : ''
          }
          errorMessage={
            !form.email
              ? '이메일을 입력해주세요'
              : !isValidEmail(form.email)
                ? '올바른 이메일 형식이 아닙니다'
                : isEmailAvailable === false
                  ? '이미 사용 중인 이메일입니다'
                  : ''
          }
        />
        <AuthBox
          label='아이디'
          name='id'
          value={form.id}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, id: true }))}
          onCheck={checkDuplicateId}
          showCheckButton={true}
          invalid={touched.id && (!form.id || isIdAvailable === false)}
          successMessage={touched.id && form.id && isIdAvailable ? '사용 가능한 아이디입니다' : ''}
          errorMessage={
            !form.id
              ? '아이디를 입력해주세요'
              : isIdAvailable === false
                ? '이미 사용 중인 아이디입니다'
                : ''
          }
        />
        <AuthBox
          label='비밀번호'
          name='password'
          value={form.password}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          invalid={touched.password && (!form.password || !isValidPassword(form.password))}
          errorMessage={
            !form.password
              ? '비밀번호를 입력해주세요'
              : !isValidPassword(form.password)
                ? '비밀번호는 8자 이상, 영문·숫자·특수문자를 포함해야 합니다'
                : ''
          }
        />
        <AuthBox
          label='비밀번호 확인'
          name='passwordCheck'
          value={form.passwordCheck}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, passwordCheck: true }))}
          invalid={
            touched.passwordCheck && (!form.passwordCheck || form.passwordCheck !== form.password)
          }
          errorMessage={
            !form.passwordCheck
              ? '비밀번호를 입력해주세요'
              : form.passwordCheck !== form.password
                ? '비밀번호가 일치하지 않습니다'
                : ''
          }
        />
      </form>
      <Button text='회원가입 하기' onClick={handleSignup} disabled={isDisabled} />

      {showModal && (
        <AuthModal message='회원가입에 실패했습니다.' onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default SignupPage
