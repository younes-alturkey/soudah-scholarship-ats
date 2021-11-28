import { FC } from 'react'
import { useNavigate } from 'react-router'
import AppBar from '../components/AppBar'

const EmailConfirmationPage: FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center gap-12 pb-12">
      <AppBar />
      <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex-col justify-center items-center rounded-xl shadow-2xl p-6 md:p-14 bg-peak">
        <div className="text-2xl lg:text-3xl text-center text-green font-black">
          تم تفعيل البريد الأكتروني بنجاح
        </div>
      </div>
      <div
        className="w-full rtl text-xl md:text-2xl text-center text-mist hover:text-sky noselect cursor-pointer mt-8"
        onClick={() => navigate('/login')}
      >
        تسجيل الدخول؟
      </div>
      <div className="mt-8 w-full rtl text-base text-center text-mist noselect flex justify-center items-center gap-4">
        <p
          className="hover:text-sky cursor-pointer"
          onClick={() => navigate('/forgot')}
        >
          نسيت كلمة المرور
        </p>
        <p>|</p>
        <p
          className="hover:text-sky cursor-pointer"
          onClick={() => navigate('/activate')}
        >
          تفعيل الحساب
        </p>
        <p>|</p>
        <a
          className="hover:text-sky cursor-pointer"
          href="mailto:scholarship@soudah.sa"
        >
          المساعدة
        </a>
      </div>
    </div>
  )
}

export default EmailConfirmationPage
