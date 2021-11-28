import { FC, useEffect } from 'react'
import { BsCardChecklist, BsFillBriefcaseFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setUserApplicationInfo,
} from '../../../features/applicationSlice'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'
const ScholarshipInfoSchema = Yup.object().shape({
  desiredEducationLevel: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  allowDowngradeToDiploma: Yup.string().when('desiredEducationLevel', {
    is: 'درجة البكالوريوس',
    then: Yup.string().min(2, 'هذا الحقل إلزامي').required('هذا الحقل إلزامي'),
  }),
  desiredStudySpeciality: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
})

const ScholarchipApplicationInfo: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { formData } = useAppSelector((state) => state.application)

  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = currentLevel
    window.scroll(0, 0)
  })

  return (
    <div className="w-full lg:w-9/12 2xl:w-7/12 mb-8">
      <div className="flex flex-col justify-between items-center gap-4 animate-grow-light rtl">
        <h2 className="text-2xl lg:text-5xl text-mist font-black mb-4">
          {currentLevel}
        </h2>

        <Formik
          initialValues={formData.applicationInfo}
          onSubmit={(values) => {
            dispatch(setUserApplicationInfo(values))
            dispatch(setApplicationProgress(nextLevel))
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="desiredEducationLevel"
                  value={values.desiredEducationLevel}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الدرجة العلمية المرغوبة للابتعاث</option>
                  <option value="درجة الدبلوم">درجة الدبلوم</option>
                  <option value="درجة البكالوريوس">درجة البكالوريوس</option>
                  <option value="درجة الماجستير">درجة الماجستير</option>
                </select>
                <BsFillBriefcaseFill className="text-3xl absolute top-3 right-3" />
                {errors.desiredEducationLevel &&
                touched.desiredEducationLevel ? (
                  <div className="text-orange text-center mt-4">
                    {errors.desiredEducationLevel}
                  </div>
                ) : null}
              </div>

              <div
                className={`${
                  values.desiredEducationLevel !== 'درجة البكالوريوس'
                    ? 'hidden'
                    : ' inline-block'
                } p-2 text-sm leading-relaxed text-rock bg-orange text-justify rounded font-bold flex justify-center items-center gap-6 rtl`}
              >
                في حال لم يتم ترشيحك للحصول على ابتعاث في درجة البكالوريوس بسبب
                اكتمال العدد، هل ترغب في تقديم طلب على درجة الدبلوم؟
              </div>

              <div
                className={'relative w-full'}
                hidden={values.desiredEducationLevel !== 'درجة البكالوريوس'}
              >
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="allowDowngradeToDiploma"
                  value={values.allowDowngradeToDiploma}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                <BsCardChecklist className="text-3xl absolute top-3 right-3" />
                {errors.allowDowngradeToDiploma &&
                touched.allowDowngradeToDiploma ? (
                  <div className="text-orange text-center mt-4">
                    {errors.allowDowngradeToDiploma}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="desiredStudySpeciality"
                  value={values.desiredStudySpeciality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">المجال العام للتخصص المرغوب</option>
                  <option value="إدارة ضيافة وسياحة">
                    {' '}
                    إدارة ضيافة وسياحة{' '}
                  </option>
                  <option value="فنون طهي">فنون الطهي</option>
                </select>
                <BsFillBriefcaseFill className="text-3xl absolute top-3 right-3" />
                {errors.desiredStudySpeciality &&
                touched.desiredStudySpeciality ? (
                  <div className="text-orange text-center mt-4">
                    {errors.desiredStudySpeciality}
                  </div>
                ) : null}
              </div>

              <ApplicationLevelsNavigationButton type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ScholarchipApplicationInfo
