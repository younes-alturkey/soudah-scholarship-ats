import { FC, useEffect } from 'react'
import {
  BsFillPencilFill,
  BsEnvelopeFill,
  BsFillCalendarCheckFill,
  BsHandThumbsUpFill,
} from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../app/hooks'
import { getApplicantData } from '../../../features/applicationSlice'

const ApplicationStatus: FC = () => {
  const { createdAt } = useAppSelector((state) => state.application)
  const { email } = useAppSelector((state) => state.user.user)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = 'الطلب تحت الدراسة'
    window.scroll(0, 0)
  })

  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <h2 className="text-2xl lg:text-5xl text-green font-black mb-4">
        تم إستلام طلبكم بنجاح
      </h2>
      <h2 className="text-xl lg:text-3xl text-mist font-black mb-8">
        طلب ترشيح لبرنامج ابتعاث السودة للتطوير
      </h2>
      <div className="bg-mist p-8 md:p-14 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-10 md:gap-32 animate-grow-light rtl shadow-2xl">
        <div className="w-64 flex flex-col justify-center items-center text-center gap-14">
          <BsHandThumbsUpFill className="w-32 text-rock text-7xl mt-1" />
          <p className="text-lg md:text-2xl text-rock leading-loose">
            نتمنى لك التوفيق
          </p>
        </div>

        <div className="w-64 flex flex-col justify-center items-center text-center gap-14">
          <BsFillCalendarCheckFill className="w-32 text-rock text-7xl mt-1" />
          <p className="text-lg md:text-2xl text-rock leading-loose ltr">
            {createdAt ? createdAt.split(' ')[0] : 'الطلب تحت الدراسة'}
          </p>
        </div>

        <div className="w-64 flex flex-col justify-center items-center text-center gap-14">
          <BsEnvelopeFill className="w-32 text-rock text-7xl mt-1" />
          <p className="text-xl md:text-2xl text-rock leading-loose">
            <a
              className="hover:text-sky cursor-pointer"
              href="mailto:scholarship@soudah.sa"
            >
              scholarship@soudah.sa
            </a>
          </p>
        </div>
      </div>
      <div className="self-center mt-8 md:w-96 text-2xl p-3 pb-4 px-6 mb-4 text-rock bg-sky font-bold rounded hover-rise cursor-pointer flex justify-center items-center gap-5">
        تعديل طلب الترشيح
        <BsFillPencilFill className="mt-2" />
      </div>
      <div className="mb-8 w-full rtl text-base text-center text-mist noselect flex justify-center items-center gap-4">
        <a className="hover:text-sky cursor-pointer" href="https://soudah.sa/">
          السودة للتطوير
        </a>
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

export default ApplicationStatus
