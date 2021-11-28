import { FC, useEffect, useRef, useState } from 'react'
import { BsFillBriefcaseFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setUploadedCvDocument,
  setUploadedSupportDocument,
  setUserProExpInfo,
} from '../../../features/applicationSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const ProExpInfoSchema = Yup.object().shape({
  currentlyEmployed: Yup.string().required('هذا الحقل إلزامي'),
  employerName: Yup.string().when('currentlyEmployed', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  }),
  jobTitle: Yup.string().when('currentlyEmployed', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  }),
  yearsOfExp: Yup.string().when('currentlyEmployed', {
    is: 'نعم',
    then: Yup.string().min(1, 'هذا الحقل إلزامي').required('هذا الحقل إلزامي'),
  }),
})

const ProfessionalExpInfo: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { formData } = useAppSelector((state) => state.application)

  const cvDocumentFileRef = useRef<HTMLInputElement | null>(null)
  const supportingDocumentFileRef = useRef<HTMLInputElement | null>(null)

  const [uploadError, setUploadError] = useState(false)

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
          initialValues={formData.proExp}
          onSubmit={(values) => {
            dispatch(
              setUserProExpInfo({
                ...values,
                cvDocumentPath: formData.proExp.cvDocumentPath,
                supportingDocumentPath: formData.proExp.supportingDocumentPath,
              })
            )
            dispatch(setApplicationProgress(nextLevel))
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="currentlyEmployed"
                  value={values.currentlyEmployed}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">هل أنت موظف حاليًا؟</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                <BsFillBriefcaseFill className="text-3xl text-rock absolute top-3 right-3" />
                {errors.currentlyEmployed && touched.currentlyEmployed ? (
                  <div className="text-orange text-center mt-4">
                    {errors.currentlyEmployed}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={values.currentlyEmployed !== 'نعم'}
              >
                <Field
                  name="employerName"
                  placeholder="اسم جهة العمل"
                  className={`w-full p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.employerName && touched.employerName
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsFillBriefcaseFill className="text-3xl absolute top-3 right-3 text-rock" />
                {errors.employerName && touched.employerName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.employerName}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={values.currentlyEmployed !== 'نعم'}
              >
                <Field
                  name="jobTitle"
                  placeholder="المسمى الوظيفي"
                  className={`w-full p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.jobTitle && touched.jobTitle
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsFillBriefcaseFill className="text-3xl absolute top-3 right-3 text-rock" />
                {errors.jobTitle && touched.jobTitle ? (
                  <div className="text-orange text-center mt-4">
                    {errors.jobTitle}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={values.currentlyEmployed !== 'نعم'}
              >
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="yearsOfExp"
                  value={values.yearsOfExp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">سنوات الخبرة العملية</option>
                  <option value="لا أملك خبرة عملية">لا أملك خبرة عملية</option>
                  <option value="أقل من سنة">أقل من سنة</option>
                  <option value="1 سنة إلى 3 سنوات">1 سنة إلى 3 سنوات</option>
                  <option value="3 سنوات و ما فوق">3 سنوات و ما فوق</option>
                </select>

                <BsFillBriefcaseFill className="text-3xl absolute top-3 right-3 text-rock" />
                {errors.yearsOfExp && touched.yearsOfExp ? (
                  <div className="text-orange text-center mt-4">
                    {errors.yearsOfExp}
                  </div>
                ) : null}
              </div>
              <div
                className="text-red text-xl text-center mt-8 animate-pulse"
                hidden={!uploadError}
              >
                يجب أن يكون حجم الملف أقل من 1 ميجا بايت
              </div>
              <div className="relative w-full cursor-pointer">
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="cvDocumentPath"
                  name="cvDocumentPath"
                  ref={cvDocumentFileRef}
                  className="w-full p-3 pr-14 rounded invisible"
                  type="file"
                  onChange={() => {
                    var formDataToUpload = new FormData()
                    formDataToUpload.append(
                      `${formData.personal.nationalId}_CV`,
                      cvDocumentFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedCvDocument({
                        path: `${formData.personal.nationalId}_CV`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.proExp.cvDocumentPath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : 'focus:ring-rock border border-rock bg-mist'
                  }`}
                  onClick={() => {
                    cvDocumentFileRef.current!.click()
                  }}
                >
                  <span
                    className={`ltr cursor-pointer fileName font-bold text-rock`}
                  >
                    {formData.proExp.cvDocumentPath
                      ? formData.proExp.cvDocumentPath
                      : 'السيرة الذاتية - إن وجد'}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.proExp.cvDocumentPath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB'}
                </p>
              </div>

              <div className="relative w-full cursor-pointer">
                <input
                  accept=".pdf, .png, .jpg, .jpeg, .zip, .rar"
                  id="supportingDocumentPath"
                  name="supportingDocumentPath"
                  ref={supportingDocumentFileRef}
                  className="w-full p-3 pr-14 rounded invisible"
                  type="file"
                  onChange={() => {
                    var formDataToUpload = new FormData()
                    formDataToUpload.append(
                      `${formData.personal.nationalId}_ADDITIONALS_${
                        supportingDocumentFileRef.current.files[0] &&
                        supportingDocumentFileRef.current.files[0].name
                      }`,
                      supportingDocumentFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedSupportDocument({
                        path: `${formData.personal.nationalId}_ADDITIONALS_${
                          supportingDocumentFileRef.current.files[0] &&
                          supportingDocumentFileRef.current.files[0].name
                        }`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.proExp.supportingDocumentPath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : 'focus:ring-rock border border-rock bg-mist'
                  }`}
                  onClick={() => {
                    supportingDocumentFileRef.current!.click()
                  }}
                >
                  <span
                    className={`ltr cursor-pointer fileName font-bold text-rock`}
                  >
                    {formData.proExp.supportingDocumentPath
                      ? formData.proExp.supportingDocumentPath
                      : 'شهادات خبرة، توصية، أو شكر - إن وجد'}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.proExp.supportingDocumentPath
                    ? 'تم رفع الملف على الخادم و يمكنك رفع ملف أخر أو مضغوط'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB'}
                </p>
              </div>

              <ApplicationLevelsNavigationButton type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ProfessionalExpInfo
