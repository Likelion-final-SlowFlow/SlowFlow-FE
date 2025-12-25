import { useNavigate } from 'react-router-dom'
import Home from '@/assets/home.svg?react'
import Report from '@/assets/report.svg?react'
import History from '@/assets/history.svg?react'
import Profile from '@/assets/profile.svg?react'
import Home2 from '@/assets/home2.svg?react'
import Report2 from '@/assets/report2.svg?react'
import History2 from '@/assets/history2.svg?react'
import Profile2 from '@/assets/profile2.svg?react'

export default function Footer({ select = 'home' }) {
  const navigate = useNavigate()

  const tabs = [
    { key: 'home', path: '/', Icon: Home, ActiveIcon: Home2, label: '홈' },
    { key: 'report', path: '/report', Icon: Report, ActiveIcon: Report2, label: '리포트' },
    { key: 'history', path: '/history', Icon: History, ActiveIcon: History2, label: '히스토리' },
    { key: 'profile', path: '/profile', Icon: Profile, ActiveIcon: Profile2, label: '프로필' },
  ]

  return (
    <nav className='fixed bottom-[3vh] left-1/2 z-3 h-[55px] w-[75%] -translate-x-1/2 rounded-full bg-[#2B2B2B] px-6'>
      <ul className='flex h-full items-center justify-between'>
        {tabs.map((t) => {
          const isActive = select === t.key
          const IconComp = isActive ? t.ActiveIcon : t.Icon

          return (
            <li key={t.key} className='flex-1'>
              <button
                type='button'
                onClick={() => navigate(t.path)}
                className='relative mx-auto flex h-11 w-11 items-center justify-center'
                aria-current={isActive ? 'page' : undefined}
                aria-label={t.label}
              >
                <IconComp className='h-7 w-7' />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
