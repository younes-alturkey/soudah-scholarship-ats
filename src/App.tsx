import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import ProgramPage from './pages/ProgramPage'
import SignupPage from './pages/SignupPage'
import NewPasswordPage from './pages/NewPasswordPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ConfirmEmailPage from './pages/ConfirmEmailPage'
import EmailConfirmationPage from './pages/EmailConfirmationPage'
import ApplicationPage from './pages/ApplicationPage'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useEffect } from 'react'
import {
  getApplicationStatusFromStorage,
  getFormDataFromStorage,
  getProgressFromStorage,
  hasApplicantSubmitted,
} from './features/applicationSlice'
import {
  getUserFromStorage,
  setClearStorageOnPreAppVersion,
} from './features/userSlice'

export default function App() {
  const dispatch = useAppDispatch()
  const { email } = useAppSelector((state) => state.user.user)
  const { submittedApplication } = useAppSelector((state) => state.application)

  useEffect(() => {
    dispatch(setClearStorageOnPreAppVersion())
    dispatch(getApplicationStatusFromStorage())
    dispatch(getFormDataFromStorage())
    dispatch(getProgressFromStorage())
    dispatch(getUserFromStorage())
    if (email && !submittedApplication) dispatch(hasApplicantSubmitted(email))
  }, [email, submittedApplication, dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProgramPage />} />
        <Route path="apply" element={<ApplicationPage />} />
        <Route path="login" element={<SignupPage />} />
        <Route path="forgot" element={<ForgotPasswordPage />} />
        <Route path="activate" element={<ConfirmEmailPage />} />
        <Route path="confirmed" element={<EmailConfirmationPage />} />
        <Route path="newpassword" element={<NewPasswordPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
