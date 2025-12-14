import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import OnboardingPage from './pages/OnboardingPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ReportPage from './pages/ReportPage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/onboarding',
        element: <OnboardingPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/report',
        element: <ReportPage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
    ],
  },
])

export default router
