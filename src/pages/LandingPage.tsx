import { FC, useEffect, useRef } from 'react'
import AppFooter from '../components/AppFooter'
import AppBar from '../components/AppBar'
import {
  BsChevronDoubleDown,
  BsCardChecklist,
  BsClipboardCheck,
  BsPeopleFill,
  BsPersonPlusFill,
} from 'react-icons/bs'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../app/hooks'
import { Pages } from '../features/interfaceSlice'

const LandingPage: FC = () => {
  const { isSignedIn } = useAppSelector((state) => state.user)
  const ctaContainer = useRef<null | HTMLDivElement>(null)
  const navigate = useNavigate()

  const handleNavigationtoPage = (page: Pages) => {
    navigate(page)
  }

  useEffect(() => {
    document.title = 'برنامج الإبتعاث'
    window.scroll(0, 0)
  })

  return (
    <div className="w-full min-h-full flex flex-col items-center gap-10 z-10 bg-img">
      <AppBar />
      <div className="w-full h-1024 flex items-center justify-center relative noselect">
        <h1 className="text-6xl font-black bg-rock text-mist p-6 pb-9 rounded">
          برنامج ابتعاث أبناء وبنات السودة ورُجال ألمع
        </h1>
        <BsChevronDoubleDown
          className="text-6xl animate-bounce cursor-pointer centered-axis-xy"
          onClick={() => {
            ctaContainer.current!.scrollIntoView()
          }}
        />
      </div>
      <div className="h-24" ref={ctaContainer} />
      <div className="w-11/12 p-14 py-20 rounded-40 flex flex-col justify-center items-center gap-8 mb-20 bg-glass text-rock animate-grow-light">
        <h2 className="text-5xl text-rock font-black mb-6">
          عن برنامج الإبتعاث
        </h2>
        <div className="w-9/12 flex flex-col justify-center gap-8 rtl">
          <div className="flex justify-start items-center gap-4">
            <BsPeopleFill className="text-4xl text-rock" />
            <p className="text-2xl leading-relaxed text-rock font-bold">
              برنامج ابتعاث أبناء وبنات السودة وُرجال ألمع
            </p>
          </div>
          <p className="text-2xl leading-relaxed text-justify mb-6">
            نؤمن في السودة للتطوير بأن الإنسان هو محور التنمية وأساسها وهو
            الركيزة الأساسية في رحلة التنمية المستدامة، من هذا المنطلق نسعد
            بإعلان أحد أكبر مشاريعنا التنموية الموجهة لأبناء وبنات منطقة المشروع
            الذي يهدف إلى تطوير القدرات البشرية والنهوض بالكفاءات الوطنية لإعداد
            الجيل المقبل من الشباب والشابات في قطاعات السياحة والسفر والترفيه
            والضيافة يوفر برنامج الابتعاث الذي أطلقته السودة للتطوير فرصاً نوعية
            لتأهيل أبناء وبنات المنطقة في قطاعات السياحة والسفر والضيافة حيث
            يستهدف البرنامج 4 من بين أفضل 10 مؤسسات تعليمية بقطاعي السياحة
            والضيافة في العالم.
          </p>
          <div className="flex justify-start items-center gap-4">
            <BsCardChecklist className="text-4xl text-rock" />
            <p className="text-2xl leading-relaxed text-rock font-bold">
              الشروط العامة للقبول في البرنامج
            </p>
          </div>
          <ul className="list-none text-2xl space-y-5 mb-6">
            <li>● أن يكون المتقدم سعودي الجنسية</li>
            <li>● أن يكون المتقدم من أهل منطقة السودة أو رجال ألمع</li>
            <li>
              ● أن يكون التخصص المراد دراسته ضمن التخصصات المحددة أو أحد
              تفرعاتها
            </li>
            <li>
              ● للتقديم على درجة الدبلوم أو البكالوريوس، يجب أن لايتجاوز عمر
              المتقدم عن 30 سنة وأن يكون حاصلًا على شهادة الثانوية العامة
            </li>
            <li>
              ● للتقديم على درجة الماجستير، يجب أن لايتجاوز عمر المتقدم عن 35
              سنة وأن يكون حاصلًا على شهادة البكالوريوس
            </li>
            <li>
              ● الجدية والالتزام في الدراسة طوال فترة برنامج الابتعاث والتي تشمل
              مرحلة اللغة (إن وجد) ومرحلة الدراسة الأكاديمية
            </li>
            <li>● أن يتّصف المتقدم بحسن السيرة والسلوك</li>
          </ul>
          <div className="flex justify-start items-center gap-4">
            <BsClipboardCheck className="text-4xl text-rock" />
            <p className="text-2xl leading-relaxed text-rock font-bold">
              التخصصات المتاحة ضمن البرنامج
            </p>
          </div>
          <ul className="list-none text-2xl space-y-5">
            <li>● السياحة والضيافة</li>
            <li>● فنون الطهي</li>
          </ul>
          <div
            className={`w-full flex justify-end items-center ${
              isSignedIn ? 'hidden' : 'block'
            }`}
          >
            <div
              className="animate-bounce hover-freeze transform -translate-y-4 flex justify-center items-center gap-3 noselect rounded pt-3 pb-4 px-8 mt-1 bg-rock text-sky hover:bg-sky hover:text-rock cursor-pointer"
              onClick={() => handleNavigationtoPage(Pages.SIGNUP)}
            >
              <BsPersonPlusFill className="text-2xl mt-1" />
              <span className="font-bold text-xl noselect">
                تقدم الآن بطلب الترشيح للبرنامج
              </span>
            </div>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  )
}

export default LandingPage
