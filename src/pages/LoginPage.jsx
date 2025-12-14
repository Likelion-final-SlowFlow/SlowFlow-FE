import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthBox from '../components/auth/AuthBox'
import Button from '../components/common/Button'
import Logo from '../assets/Logo.svg'
import AuthModal from '@/components/auth/AuthModal'

const LoginPage = () => {
  const [showModal, setShowModal] = useState(false)
  // 모달 테스트용
  useEffect(() => {
    setShowModal(true)
  }, [])

  const [form, setForm] = useState({ id: '', password: '' })
  const [touched, setTouched] = useState({ id: false, password: false })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = () => {
    // 연동 코드 작성 예정
  }

  const isDisabled = !form.id || !form.password

  return (
    <div className='screen-center'>
      <img src={Logo} alt='SlowFlow Logo' className='mb-[19px] w-[116px]' />

      <form className='flex flex-col gap-[18px]' onSubmit={(e) => e.preventDefault()}>
        <AuthBox
          label='아이디'
          name='id'
          value={form.id}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, id: true }))}
          invalid={touched.id && !form.id}
          errorMessage='아이디를 입력해주세요'
        />
        <AuthBox
          label='비밀번호'
          name='password'
          value={form.password}
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          invalid={touched.password && !form.password}
          errorMessage='비밀번호를 입력해주세요'
        />
      </form>

      <Button text='로그인' onClick={handleLogin} disabled={isDisabled} />

      <p className='mt-[11px] text-base font-medium'>
        아직 계정이 없으신가요?
        <Link to='/Signup' className='ml-1 underline'>
          회원가입하기
        </Link>
      </p>

      {showModal && (
        <AuthModal message='로그인 정보를 다시 확인해 주세요' onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default LoginPage
