import { FC, useEffect } from 'react'
import { BsClipboardCheck } from 'react-icons/bs'
import { useAppSelector } from '../../../app/hooks'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const NominationCriteria: FC = () => {
  const { currentLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  useEffect(() => {
    document.title = currentLevel
    window.scroll(0, 0)
  })

  return (
    <div className="w-1200 h-712 rtl px-14 py-14 rounded-40 flex flex-col justify-between items-center gap-4 bg-glass text-rock animate-grow-light">
      <h2 className="text-5xl text-rock font-black">{currentLevel}</h2>
      <div className="flex justify-center self-center w-full items-center gap-6 bg-strip text-sky rounded pt-2 pb-3 rtl">
        <p className="text-2xl leading-relaxed text-sky bg-rock p-2 pb-3 rounded font-bold flex justify-center items-center gap-6">
          <BsClipboardCheck className="text-3xl text-sky" />
          ستتم آلية الفرز والمفاضلة كما هو موضح في الصفحة الرئيسية للبرنامج.
        </p>
      </div>

      {/* <div className="h-80" /> */}
      <ApplicationLevelsNavigationButton />
    </div>
  )
}

export default NominationCriteria
