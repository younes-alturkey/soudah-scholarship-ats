import { FC, useEffect, useState } from 'react'
import {
  BsArrowLeft,
  BsArrowRight,
  BsCheckCircleFill,
  BsCircle,
} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setApplicationProgress } from '../../../features/applicationSlice'

const Guidelines: FC = () => {
  const { currentLevel, nextLevel, previousLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const [confirmed, setConfirmed] = useState(false)

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = currentLevel
  })

  return (
    <div className="p-3 rounded flex flex-col justify-center items-center gap-4 animate-grow-light">
      <h2 className="text-4xl text-center text-rock font-black mb-8">
        {currentLevel}
      </h2>
      <div className="flex flex-col justify-center gap-4 rtl mb-6">
        <ul className="space-y-6 text-lg font-bold mb-2 px-1 rtl">
          <li>
            - يتحمل المتقدم مسؤولية المعلومات التي يسجلها في نموذج التقديم
          </li>
          <li>- يجب أن يكون للمتقدم هوية وطنية</li>
          <li>- يجب أن يكون للمتقدم رقم جوال دائم، وبريد إلكتروني متاح</li>
          <li>- يجب التأكد من توفر المستندات المطلوبة للتقديم</li>
          <li>
            - المستندات المطلوبة (الهوية الوطنية، شهادة المؤهل العلمي الأخيرة،
            إثبات العنوان الوطني)
          </li>
          <li>
            - لن يتمكن المتقدم من الاستمرار في استكمال إجراءاته إلا إذا رفع
            وثائقه كاملة أثناء التسجيل
          </li>
          <li>
            - على المتقدم ان يتجاوب مع فريق عمل البرنامج في حال تم التواصل معه،
            و عدم التجاوب مع فريق عمل البرنامج يعني وعدم رغبة المتقدم في استكمال
            الإجراءات الخاصة بالبرنامج و يعد ذلك انسحابا. و سيقوم المسؤول عن
            التدقيق برفض طلبه
          </li>
          <li>
            - تقديم الطلب لا يترتب عليه اي التزام من السودة للتطوير بضمان
            الإبتقاث ا المقعد في اي مرحلة من مراحل البرنامج
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-center items-start gap-12">
        <div
          className={`mt-2 w-full rtl text-base text-center px-2 noselec ${
            confirmed ? 'text-rock' : 'text-orange font-bold font-bold'
          }`}
          onClick={() => setConfirmed(!confirmed)}
        >
          <label className="inline-flex items-center gap-3">
            {confirmed ? (
              <BsCheckCircleFill className="text-5xl md:text-3xl animate-grow" />
            ) : (
              <BsCircle className="text-5xl md:text-3xl cursor-pointer" />
            )}
            <span className="font-black text-lg cursor-pointer">
              أتعهد بالاطلاع والالتزام بالضوابط والشروط الواردة أعلاه وعلى ذلك
              أوافق.
            </span>
          </label>
        </div>

        <div
          className="w-full justify-center items-center gap-2 ltr rounded-3xl px-6 bg-rock text-sky hover-rise p-2 animate-slide-right-xl cursor-pointer"
          onClick={() => {
            if (confirmed) dispatch(setApplicationProgress(nextLevel))
          }}
        >
          <p className="text-lg p-2 pb-3 flex justify-center items-center gap-3">
            <BsArrowLeft className="text-2xl mt-2" />
            {nextLevel}
          </p>
        </div>

        <div
          className="w-full justify-center items-center gap-2 ltr rounded-3xl px-6 bg-rock text-sky hover-rise p-2 animate-slide-right-xl cursor-pointer"
          onClick={() => {
            dispatch(setApplicationProgress(previousLevel))
          }}
        >
          <p className="text-lg p-2 pb-3 flex justify-center items-center gap-3">
            {previousLevel}
            <BsArrowRight className="text-2xl mt-2" />
          </p>
        </div>
      </div>
    </div>
  )
}

export default Guidelines
