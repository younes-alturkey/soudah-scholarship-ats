import { FC, useEffect } from 'react'
import {
  BsFillLaptopFill,
  BsExclamationTriangleFill,
  BsFillClockFill,
  BsFillPersonXFill,
  BsFillPauseBtnFill,
  BsFileEarmarkCheckFill,
} from 'react-icons/bs'
import { useAppSelector } from '../../../app/hooks'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const StartApplication: FC = () => {
  const { currentLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  useEffect(() => {
    document.title = currentLevel
    window.scroll(0, 0)
  })

  return (
    <div className="w-1200 px-2 md:px-14 py-14 rounded-40 flex flex-col justify-center items-center gap-4 bg-glass text-rock animate-grow-light">
      <div className="flex justify-center self-center w-full items-center gap-6 bg-strip text-sky rounded pt-2 pb-3 rtl">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsExclamationTriangleFill className="text-3xl text-sky" />
          يرجى قراءة النصائح التالية والتأكد من فهمها لتجنب مواجهة أي مشاكل
          اثناء تقديم الطلب
        </p>
      </div>
      <h2 className="text-5xl text-rock font-black mb-8">{currentLevel}</h2>
      <div className="w-full flex flex-col justify-center gap-12 rtl">
        <div className="flex flex-col justify-center items-start gap-6 px-8">
          <div className="flex justify-center items-center gap-5">
            <BsFillClockFill className="text-rock text-4xl mt-1" />
            <p className="text-2xl font-bold">
              سيتطلب طلب الترشيح للبرنامج ~30 دقيقة من وقتك على الأقل لإكماله
            </p>
          </div>

          <div className="flex justify-center items-center gap-5">
            <BsFillPauseBtnFill className="text-rock text-4xl mt-1" />
            <p className="text-2xl font-bold">
              يمكنك التوقف في أي وقت وإكمال الطلب لاحقاً من حيث توقفت
            </p>
          </div>

          <div className="flex justify-center items-center gap-5">
            <BsFillLaptopFill className="text-rock text-4xl mt-1" />
            <p className="text-2xl font-bold">
              يفضل تقديم الطلب بإستخدام حاسوب مكتبي أو محمول
            </p>
          </div>

          <div className="flex justify-center items-center gap-5">
            <BsFillPersonXFill className="text-rock text-4xl mt-1" />
            <p className="text-2xl font-bold">
              عدم الدقة في إدخال البيانات بشكل صحيح قد يعرض طلبكم للرفض
            </p>
          </div>

          <div className="flex justify-center items-center gap-5">
            <BsFileEarmarkCheckFill className="text-rock text-4xl mt-1" />
            <p className="text-2xl font-bold">
              من ضروري جداً رفع جميع المستندات المطلوبة بجودة مقبولة
            </p>
          </div>
        </div>
      </div>
      <ApplicationLevelsNavigationButton />
    </div>
  )
}

export default StartApplication
