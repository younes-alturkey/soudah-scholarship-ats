import { FC } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hooks'
import { setApplicationProgress } from '../features/applicationSlice'

interface IProps {
  type?: 'button' | 'submit' | 'reset' | undefined
}

const ApplicationLevelsNavigationButton: FC<IProps> = ({ type }) => {
  const { nextLevel, previousLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const dispatch = useDispatch()
  return (
    <div className="w-full">
      <div className="text-center bg-orange text-mist p-2 mb-8 rounded w-full my-1 rtl">
        <p className="text-xl text-mist rounded w-full my-1 rtl">
          الرجاء التأكد من ملء جميع الحقول الإلزمية وبالشكل الصحيح
        </p>
      </div>
      <div
        className={`w-full flex ${
          previousLevel === null ? 'justify-start' : 'justify-between'
        } items-center rtl flex-col lg:flex-row gap-6`}
      >
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
          type={type}
          className="w-full justify-center items-center gap-2 ltr rounded shadow-2xl px-6 bg-gradient-to-r from-sky to-sky-300 text-rock hover-rise p-2 animate-slide-right-xl cursor-pointer"
          onClick={(e) => {
            if (!type) dispatch(setApplicationProgress(nextLevel))
          }}
        >
          <p className="text-lg font-bold p-2 pb-3 flex justify-center items-center gap-3">
            <BsArrowLeft className="text-2xl mt-2" />
            {nextLevel}
          </p>
        </button>
      </div>
    </div>
  )
}

export default ApplicationLevelsNavigationButton
