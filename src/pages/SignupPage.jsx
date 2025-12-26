import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AuthBox from '../components/auth/AuthBox'
import Button from '../components/common/Button'
import Logo from '../assets/Logo.svg'
import AuthModal from '@/components/auth/AuthModal'

import { checkEmail } from '@/api/login/checkEmail.js'
import { checkUsername } from '@/api/login/checkUsername'
import { signup } from '@/api/login/signup'

const SignupPage = () => {
  const navigate = useNavigate()

  // 모달
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  // 폼
  const [form, setForm] = useState({
    email: '',
    id: '',
    password: '',
    passwordCheck: '',
  })

  const [touched, setTouched] = useState({
    email: false,
    id: false,
    password: false,
    passwordCheck: false,
  })

  // 중복 확인
  const [isIdAvailable, setIsIdAvailable] = useState(null)
  const [isEmailAvailable, setIsEmailAvailable] = useState(null)

  // 유효성 검사
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isValidPassword = (password) =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,}$/.test(password)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))

    // 값 바뀌면 중복확인 결과 초기화
    if (name === 'email') setIsEmailAvailable(null)
    if (name === 'id') setIsIdAvailable(null)
  }

  const openModal = (message) => {
    setModalMessage(message)
    setShowModal(true)
  }

  const checkDuplicateEmail = async () => {
    if (!form.email) {
      setTouched((prev) => ({ ...prev, email: true }))
      setIsEmailAvailable(null)
      return
    }

    if (!isValidEmail(form.email)) {
      setTouched((prev) => ({ ...prev, email: true }))
      setIsEmailAvailable(null)
      return
    }

    try {
      const available = await checkEmail(form.email)
      setIsEmailAvailable(available)
    } catch (err) {
      console.error(err)
      setIsEmailAvailable(null)
      openModal('이메일 중복확인에 실패했습니다.')
    }
  }

  const checkDuplicateId = async () => {
    if (!form.id.trim()) {
      setTouched((prev) => ({ ...prev, id: true }))
      setIsIdAvailable(null)
      return
    }

    try {
      const available = await checkUsername(form.id.trim())
      setIsIdAvailable(available)
    } catch (err) {
      console.error(err)
      setIsIdAvailable(null)
      openModal('아이디 중복확인에 실패했습니다.')
    }
  }

  const handleSignup = async () => {
    if (!form.email || !form.id || !form.password || !form.passwordCheck) return
    if (!isValidEmail(form.email)) return
    if (!isValidPassword(form.password)) return
    if (form.password !== form.passwordCheck) return

    if (isEmailAvailable !== true || isIdAvailable !== true) {
      openModal('이메일/아이디 중복확인을 완료해주세요.')
      return
    }

    try {
      await signup({
        username: form.id.trim(),
        email: form.email.trim(),
        password: form.password,
      })

      openModal('회원가입이 완료되었습니다.')
      navigate('/login')
    } catch (err) {
      console.error(err)

      // 409 (이메일/아이디 중복)
      if (err.code === 'EMAIL_ALREADY_EXISTS') {
        setIsEmailAvailable(false)
        setTouched((prev) => ({ ...prev, email: true }))
        return
      }

      if (err.code === 'USERNAME_ALREADY_EXISTS') {
        setIsIdAvailable(false)
        setTouched((prev) => ({ ...prev, id: true }))
        return
      }

      // 400 VALIDATION_ERROR
      if (err.code === 'VALIDATION_ERROR') {
        const fieldErrors = err.data || {}
        if (fieldErrors.email) setTouched((prev) => ({ ...prev, email: true }))
        if (fieldErrors.password) setTouched((prev) => ({ ...prev, password: true }))
        openModal(err.message || '입력값이 유효하지 않습니다.')
        return
      }
      openModal('회원가입에 실패했습니다.')
    }
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
          type='email'
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
          type='text'
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
          type='password'
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
          type='password'
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
        <AuthModal
          message={modalMessage || '회원가입에 실패했습니다.'}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default SignupPage
