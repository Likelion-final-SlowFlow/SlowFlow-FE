import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthBox from '../components/auth/AuthBox'
import Button from '../components/common/Button'
import Logo from '../assets/logo1.svg'
import AuthModal from '@/components/auth/AuthModal'
import { login } from '@/api/login/login'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  // 모달
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const openModal = (msg) => {
    setModalMessage(msg)
    setShowModal(true)
  }

  const [form, setForm] = useState({ id: '', password: '' })
  const [touched, setTouched] = useState({ id: false, password: false })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async () => {
    if (!form.id.trim() || !form.password) {
      setTouched({ id: true, password: true })
      return
    }

    try {
      await login({
        username: form.id.trim(),
        password: form.password,
      })
      // 로그인 성공
      navigate('/')
    } catch (err) {
      console.error(err)
      // 401/404
      if (err.code === 'USER_NOT_FOUND') {
        openModal('존재하지 않는 사용자입니다.')
        return
      }
      if (err.code === 'INVALID_PASSWORD') {
        openModal('비밀번호가 일치하지 않습니다.')
        return
      }
      // 그 외
      openModal('로그인 정보를 다시 확인해 주세요')
    }
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
          type='text'
          onChange={handleChange}
          onBlur={() => setTouched((prev) => ({ ...prev, id: true }))}
          invalid={touched.id && !form.id}
          errorMessage='아이디를 입력해주세요'
        />
        <AuthBox
          label='비밀번호'
          name='password'
          type='password'
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
        <AuthModal
          message={modalMessage || '로그인 정보를 다시 확인해 주세요'}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default LoginPage
