import { FC, useEffect } from 'react'
import { useAppSelector } from '../app/hooks'
import AppBar from '../components/AppBar'
import ContactInfo from '../components/application/levels/ContactInfo'
import EducationInfo from '../components/application/levels/EducationInfo'
import HealthStatusSurvey from '../components/application/levels/HealthStatusSurvey'
import InfoConfirmation from '../components/application/levels/InfoConfirmation'
import PersonalInfo from '../components/application/levels/PersonalInfo'
import ProfessionalExpInfo from '../components/application/levels/ProfessionalExpInfo'
import ScholarchipApplicationInfo from '../components/application/levels/ScholarchipApplicationInfo'
import ScholarshipSurvey from '../components/application/levels/ScholarshipSurvey'
import SubmitApplication from '../components/application/levels/SubmitApplication'
import ApplicationStatus from '../components/application/levels/ApplicationStatus'

import TermsAndConditions from '../components/application/levels/TermsAndConditions'
import { ApplicationLevels } from '../features/applicationSlice'
import { useNavigate } from 'react-router'

const ApplicationPage: FC = () => {
  const { applicationProgress, applicationSubmitted, resubmittion } =
    useAppSelector((state) => state.application)
  const { isSignedIn } = useAppSelector((state) => state.user)

  const navigate = useNavigate()
  useEffect(() => {
    if (!isSignedIn) {
      navigate('/login')
    }
  })

  if (applicationSubmitted && !resubmittion)
    return (
      <div className="flex flex-col items-center justify-start gap-12">
        <AppBar />
        <div className="w-full flex items-center justify-center relative noselect">
          <ApplicationStatus />
        </div>
      </div>
    )

  return (
    <div className="flex flex-col items-center justify-start gap-6">
      <AppBar />
      <div className="w-full flex items-center justify-center relative noselect">
        {applicationProgress.currentLevel ===
        ApplicationLevels.TERMS_AND_CONDITIONS ? (
          <TermsAndConditions />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.PERSONAL_INFO ? (
          <PersonalInfo />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.CONTACT_INFO ? (
          <ContactInfo />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.EDUCATION_INFO ? (
          <EducationInfo />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.PROFESSIONAL_EXP_INFO ? (
          <ProfessionalExpInfo />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.SCHOLARSHIP_APPLICATION_INFO ? (
          <ScholarchipApplicationInfo />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.SCHOLARSHIP_SURVEY ? (
          <ScholarshipSurvey />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.HEALTH_STATUS ? (
          <HealthStatusSurvey />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.INFO_CONFIRMATION ? (
          <InfoConfirmation />
        ) : applicationProgress.currentLevel ===
          ApplicationLevels.SUBMIT_APPLICATION ? (
          <SubmitApplication />
        ) : (
          <div>Wow such error!</div>
        )}
      </div>
    </div>
  )
}
export default ApplicationPage
