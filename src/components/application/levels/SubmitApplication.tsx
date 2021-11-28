import { FC, useEffect, useRef, useState } from 'react'
import { BsArrowRight, BsCircle, BsCheckCircleFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setSubmissionError,
  setSubmitted,
} from '../../../features/applicationSlice'

const SubmitApplication: FC = () => {
  const { currentLevel, previousLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { submittionPending, submittionErrorMessage, resubmittion } =
    useAppSelector((state) => state.application)

  const { formData } = useAppSelector((state) => state.application)

  const submitRef = useRef<HTMLInputElement | null>(null)

  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    document.title = currentLevel
    window.scroll(0, 0)
  })

  const dispatch = useAppDispatch()

  return (
    <div className="rounded flex flex-col justify-center items-center gap-4 animate-grow-light">
      <h2 className="text-2xl lg:text-5xl text-mist font-black mb-4">
        التحقق من البيانات
      </h2>
      <div className="flex flex-col justify-center items-center gap-4 rtl mb-6 px-4 py-8 rounded text-rock bg-mist shadow-2xl md:w-10/12 lg: 9/12 2xl:w-8/12">
        <p className="text-lg leading-relaxed text-orange text-center rounded font-bold flex justify-center items-center gap-6 rtl">
          <span>إقرار</span>
        </p>

        <p className="p-3 pb-5 text-xl leading-relaxed text-peak text-justify rounded font-bold flex justify-center items-center gap-6 rtl">
          أقر بأن جميع المعلومات الواردة والمقدمة في هذا النموذج والمستندات
          المرفقة صحيحة ومطابقة للواقع وأتعهد بأن ألتزم بجميع ما ورد فيها من
          شروط وتعهدات والتزامات، وفي حال وجود بيانات غير صحيحة، يحق لإدارة
          البرنامج عدم ترشيح الطلب تلقائيا، كما أدرك أن عدد المقاعد محدودة وأن
          مراحل الترشيح والمفاضلة تتم حسب المعايير الموضحة في صفحة البرنامج.
        </p>
        <div
          className={`mt-2 rtl text-base text-justify p-2 noselect ${
            confirmed ? 'text-rock' : 'text-orange'
          }`}
          onClick={() => {
            setConfirmed(!confirmed)
            setTimeout(() => submitRef.current!.scrollIntoView(), 50)
          }}
        >
          <div className="flex items-center gap-6">
            {confirmed ? (
              <BsCheckCircleFill className="text-5xl md:text-3xl animate-grow" />
            ) : (
              <BsCircle className="text-5xl md:text-3xl cursor-pointer" />
            )}
            <span className="text-sm md:text-lg cursor-pointer">
              أقر وأدرك بأن نموذج التقديم هو للترشيح لمرحلة اللغة فقط وأن تقديم
              الطلب لا يعني الترشيح النهائي.
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col items-center gap-4 w-full md:w-10/12 lg: 9/12 2xl:w-8/12 px-2 md:px-0">
        <div
          className="w-full justify-center items-center gap-2 ltr rounded shadow-2xl px-6 bg-peak text-rock hover-rise p-2 animate-slide-right-xl cursor-pointer"
          onClick={() => {
            dispatch(setApplicationProgress(previousLevel))
          }}
        >
          <p className="text-lg font-bold p-2 pb-3 flex justify-center items-center gap-3">
            {previousLevel}
            <BsArrowRight className="text-2xl mt-2" />
          </p>
        </div>

        <button
          ref={submitRef}
          className={`${
            confirmed ? 'block' : 'hidden'
          } w-full mt-4 text-lg p-3 pb-4 px-20 mb-4 text-rock bg-sky font-bold rounded hover-rise cursor-pointer flex justify-center items-center gap-5`}
          disabled={submittionPending}
          onClick={() => dispatch(setSubmitted())}
        >
          {submittionPending
            ? 'جاري تسليم الطلب'
            : submittionErrorMessage && submittionErrorMessage.includes('500')
            ? 'مشكلة خطأ بالخادم'
            : submittionErrorMessage && submittionErrorMessage.includes('400')
            ? 'تم رفع هذا الطلب من قبل'
            : submittionErrorMessage && submittionErrorMessage.includes('401')
            ? 'الرجاءإعادة تسجيل الدخول'
            : 'تسليم طلب الترشيح'}
        </button>
      </div>
    </div>
  )
}

export default SubmitApplication
