import { FC, useEffect, useState } from 'react'
import { BsArrowLeft, BsCheckCircleFill, BsCircle } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setApplicationProgress } from '../../../features/applicationSlice'

const TermsAndConditions: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )
  const dispatch = useAppDispatch()

  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    document.title = currentLevel
  })

  return (
    <div className="rounded flex flex-col justify-center items-center gap-4 animate-grow-light">
      <h2 className="text-2xl lg:text-5xl text-mist font-black mb-4">
        {currentLevel}
      </h2>
      <div className="flex flex-col justify-center gap-4 rtl mb-6 px-4 md:px-14 py-8 rounded-3xl text-rock bg-mist shadow-2xl md:w-8/12">
        <h2 className="text-2xl md:text-4xl text-center text-rock font-black mb-8">
          الشروط العامة
        </h2>

        <ul className="space-y-8 text-justify text-lg md:text-xl text-peak font-bold mb-2 px-4">
          <li>أن يكون المتقدم سعودي الجنسية</li>
          <li>أن يكون المتقدم من أهل منطقة السودة أو رجال ألمع</li>
          <li>
            أن يكون التخصص المراد دراسته ضمن التخصصات المحددة أو أحد تفرعاتها
          </li>
          <li>
            للتقديم على درجة الدبلوم أوالبكالوريوس، يجب أن لايتجاوز عمر المتقدم
            30 سنة وأن يكون حاصلًا على شهادة الثانوية العامة
          </li>
          <li>
            للتقديم على درجة الماجستير، يجب أن لايتجاوز عمر المتقدم عن 35 سنة
            وأن يكون حاصلًا على شهادة البكالوريوس
          </li>
          <li>
            الجدية والالتزام في الدراسة طوال فترة برنامج الابتعاث والتي تشمل
            مرحلة اللغة (إن وجد) ومرحلة الدراسة الأكاديمية
          </li>
          <li>أن يتّصف المتقدم بحسن السيرة والسلوك</li>
        </ul>

        <h2 className="text-2xl md:text-4xl text-center text-rock font-black my-8">
          التعليمات التنبيهات
        </h2>
        <ul className="space-y-10 text-justify text-lg md:text-xl text-peak font-bold mb-2 px-1">
          <li>يتحمل المتقدم مسؤولية المعلومات التي يسجلها في نموذج التقديم</li>
          <li>يجب أن يكون للمتقدم هوية وطنية</li>
          <li>يجب أن يكون للمتقدم رقم جوال دائم، وبريد إلكتروني متاح</li>
          <li>
            لن يتمكن المتقدم من الاستمرار في استكمال إجراءاته إلا إذا رفع وثائقه
            كاملة أثناء التسجيل
          </li>
          <li>
            يجب التأكد من توفر المستندات المطلوبة للتقديم (الهوية الوطنية، شهادة
            المؤهل العلمي الأخيرة، إثبات العنوان الوطني
          </li>
          <li>
            على المتقدم أن يتجاوب مع فريق عمل البرنامج في حال تم التواصل معه،
            وتجاهله لطلباتهم يعني عدم رغبته في استكمال الإجراءات، ويُعدّ ذلك
            انسحاباً منه، وسيقوم المسؤول عن التدقيق برفض طلبه
          </li>
          <li>
            تقديم الطلب لا يترتب عليه أي التزام من السودة للتطوير بضمان الابتعاث
            أو المقعد في أي مرحلة من مراحل البرنامج
          </li>
        </ul>
        <div
          className={`p-3 text-xl leading-relaxed text-orange text-center rounded font-bold ${
            confirmed ? 'hidden' : 'flex'
          } justify-center items-center gap-6 rtl`}
        >
          <p>هذا التعهد إلزامي</p>
        </div>
        <div
          className={`w-full mt-2 rtl text-base text-center p-2 noselect rounded bg-mist shadow-2xl${
            confirmed ? 'text-rock' : 'texred'
          }`}
          onClick={() => setConfirmed(!confirmed)}
        >
          <label className="inline-flex items-center gap-3">
            {confirmed ? (
              <BsCheckCircleFill className="text-xl lg:text-3xl animate-grow" />
            ) : (
              <BsCircle className="text-xl lg:text-3xl cursor-pointer" />
            )}
            <span className="font-black text-sm md:text-lg cursor-pointer">
              أتعهد بالاطلاع والالتزام بالضوابط والشروط الواردة أعلاه وعلى ذلك
              أوافق
            </span>
          </label>
        </div>
        <div
          className="self-center mt-8 md:w-72 text-2xl p-3 pb-4 px-20 mb-4 text-rock bg-sky font-bold rounded hover-rise cursor-pointer flex justify-center items-center gap-5"
          onClick={() => {
            if (confirmed) dispatch(setApplicationProgress(nextLevel))
          }}
        >
          التالي
          <BsArrowLeft className="mt-2" />
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions
