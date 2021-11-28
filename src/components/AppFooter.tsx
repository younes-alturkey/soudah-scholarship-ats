import { FC } from 'react'
import PIFLogo from '../assets/images/pif.svg'
import V2030Logo from '../assets/images/v2030.svg'

const AppFooter: FC = () => {
  return (
    <footer className="footer w-full absolute bottom-0">
      <div className="footer-info-container">
        <h2 className="footer--more-info text-base text-mist">
          لمزيد من الأسئلة والاستفسارات يسعدنا تواصلكم على البريد الإلكتروني
          التالي
        </h2>
        <a
          href="mailto:scholarship@soudah.sa"
          className="footer--link text-base text-sky"
        >
          scholarship@soudah.sa
        </a>
      </div>
      <div className="footer--image-container">
        <img src={V2030Logo} className="footer--image" alt="" />
        <img src={PIFLogo} className="footer--image" alt="" />
      </div>
    </footer>
  )
}

export default AppFooter
