import { FC, useEffect, useRef, useState } from 'react'
import {
  BsPersonFill,
  BsFillCreditCard2FrontFill,
  BsGenderAmbiguous,
  BsPersonSquare,
  BsPeopleFill,
  BsCalendar2RangeFill,
  BsCalendar2DateFill,
  BsFillFileTextFill,
  BsCheckAll,
} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setUploadedNationalDocument,
  setUploadedPassportDocument,
  setUploadedPhotoDocument,
  setUploadPending,
  setUserPersonalInfo,
} from '../../../features/applicationSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const arRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/
const enRegex = /^[A-Za-z ]+$/
const numRegex = /^[0-9]+$/
const dateRegex =
  /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  fatherName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  grandFatherName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  familyName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  englishFullName: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي')
    .matches(enRegex, 'يسمح فقط بالإنجليزية'),
  nationalId: Yup.string()
    .min(10, 'يجب ان يتكون من 10 أرقام')
    .max(10, 'يجب ان يتكون من 10 أرقام')
    .matches(numRegex, 'يسمح فقط بالأرقام')
    .required('هذا الحقل إلزامي'),
  nationality: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  gender: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  dob: Yup.string()
    .required('هذا الحقل إلزامي')
    .matches(dateRegex, 'يجب أن يكون التنسيق dd/mm/yyyy'),
  martialStatus: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  fullyVaccinated: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  age: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
})

const PersonalInfo: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const nationalIdFileRef = useRef<HTMLInputElement | null>(null)
  const personalPhotoFileRef = useRef<HTMLInputElement | null>(null)
  const passportFileRef = useRef<HTMLInputElement | null>(null)

  const { formData, uploadPending } = useAppSelector(
    (state) => state.application
  )

  const dispatch = useAppDispatch()

  const [uploadError, setUploadError] = useState(false)

  useEffect(() => {
    document.title = currentLevel
  })

  return (
    <div className="w-full lg:w-9/12 2xl:w-7/12 mb-8">
      <div className="flex flex-col justify-between items-center gap-4 animate-grow-light rtl">
        <h2 className="text-2xl lg:text-5xl text-mist font-black mb-4">
          {currentLevel}
        </h2>

        <Formik
          initialValues={formData.personal}
          onSubmit={(values) => {
            dispatch(setApplicationProgress(nextLevel))

            if (formData.personal.nationalIdFilePath) {
              dispatch(
                setUserPersonalInfo({
                  ...values,
                  nationalIdFilePath: formData.personal.nationalIdFilePath,
                  nationalIdFileUploaded:
                    formData.personal.nationalIdFileUploaded,
                  personalPhotoFilePath:
                    formData.personal.personalPhotoFilePath,
                  personalPhotoFileUploaded:
                    formData.personal.personalPhotoFileUploaded,
                  passportFilePath: formData.personal.passportFilePath,
                  passportFileUploaded: formData.personal.passportFileUploaded,
                })
              )
              dispatch(setApplicationProgress(nextLevel))
            }
          }}
        >
          {({ values, touched, errors, handleChange, handleBlur }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div
                className={`${
                  values.firstName !== '' &&
                  values.fatherName !== '' &&
                  values.grandFatherName !== '' &&
                  values.familyName !== ''
                    ? 'hidden'
                    : 'block'
                } p-3 text-sm md:text-lg leading-relaxed text-mist text-center rounded font-bold flex justify-center items-center gap-6 rtl`}
              >
                <span>
                  يتم كتابة الاسم باللغة العربية وحسب ما هو مكتوب في الهوية
                </span>
              </div>

              <div className="relative w-full">
                <Field
                  name="firstName"
                  placeholder="الاسم الأول"
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonFill className="text-3xl text-rock absolute top-2 right-3" />
                {errors.firstName && touched.firstName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.firstName}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="fatherName"
                  placeholder="اسم الأب"
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonFill className="text-3xl text-rock absolute top-2 right-3" />
                {errors.fatherName && touched.fatherName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.fatherName}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="grandFatherName"
                  placeholder="اسم الجد"
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonFill className="text-3xl text-rock absolute top-2 right-3" />
                {errors.grandFatherName && touched.grandFatherName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.grandFatherName}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="familyName"
                  placeholder="اسم العائلة"
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonFill className="text-3xl text-rock absolute top-2 right-3" />
                {errors.familyName && touched.familyName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.familyName}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="englishFullName"
                  placeholder="يتم كتابة الاسم بالإنجليزية حسب ما هو مكتوب في الهوية أو جواز السفر"
                  className="w-full placeholder-peak p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonSquare className="text-3xl text-rock absolute top-4 right-3" />
                {errors.englishFullName && touched.englishFullName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.englishFullName}
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center items-center gap-4 w-full">
                <div className="relative w-full">
                  <Field
                    name="nationalId"
                    placeholder="رقم الهوية الوطنية"
                    className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  />
                  <BsFillCreditCard2FrontFill className="text-3xl text-rock absolute top-4 right-3" />
                  {errors.nationalId && touched.nationalId ? (
                    <div className="text-orange text-center mt-4">
                      {errors.nationalId}
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="relative w-full">
                <select
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="nationality"
                  value={values.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجنسية</option>
                  <option value="سعودي/سعودية">سعودي/سعودية</option>
                  <option value="غير سعودي/غير سعودية">
                    غير سعودي/غير سعودية
                  </option>
                </select>
                <BsFillFileTextFill className="text-3xl absolute top-5 right-3 text-rock" />
                {errors.nationality && touched.nationality ? (
                  <div className="text-orange text-center mt-4">
                    {errors.nationality}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full placeholder-peak p-3 pb-4 pr-12 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجنس</option>
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
                <BsGenderAmbiguous className="text-3xl absolute top-5 right-3 text-rock" />
                {errors.gender && touched.gender ? (
                  <div className="text-orange text-center mt-4">
                    {errors.gender}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="dob"
                  placeholder="dd/mm/yyyy"
                  className="w-full placeholder-peak p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsCalendar2RangeFill className="text-3xl absolute top-4 right-3 text-rock" />
                {errors.dob && touched.dob ? (
                  <div className="text-orange text-center mt-4">
                    {errors.dob}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full p-3 pb-4 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الفئة العمرية</option>
                  <option value="أقل من 18">أقل من 18</option>
                  <option value="18 - 20">18 - 20</option>
                  <option value="21 - 35">21 - 35</option>
                  <option value="أكثر من 35">أكثر من 35</option>
                </select>
                <BsCalendar2DateFill className="text-3xl absolute top-5 right-3 text-rock" />
                {errors.age && touched.age ? (
                  <div className="text-orange text-center mt-4">
                    {errors.age}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <select
                  className="w-full p-3 pb-4 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="martialStatus"
                  value={values.martialStatus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الحالة الاجتماعية</option>
                  <option value="أعزب/عزباء">أعزب/عزباء</option>
                  <option value="متزوج/متزوجة">متزوج/متزوجة</option>
                </select>
                <BsPeopleFill className="text-3xl absolute top-5 right-3 text-rock" />
                {errors.martialStatus && touched.martialStatus ? (
                  <div className="text-orange text-center mt-4">
                    {errors.martialStatus}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full p-3 pb-4 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="fullyVaccinated"
                  value={values.fullyVaccinated}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">هل أخذت الجرعتين من لقاح كورونا؟</option>
                  <option value="أخذت جرعتين من لقاح">
                    أخذت جرعتين من لقاح
                  </option>
                  <option value="لم أخذ جرعتين من لقاح">
                    لم أخذ جرعتين من لقاح
                  </option>
                  <option value="لدي موعد مؤكد">لدي موعد مؤكد</option>
                </select>
                <BsCheckAll className="text-4xl absolute top-4 right-3 text-rock" />
                {errors.fullyVaccinated && touched.fullyVaccinated ? (
                  <div className="text-orange text-center mt-4">
                    {errors.fullyVaccinated}
                  </div>
                ) : null}
              </div>
              {!values.nationalId || errors.nationalId ? (
                <div className="text-orange text-xl text-center">
                  يجب إدخال رقم الهوية
                </div>
              ) : null}
              <div
                className="text-red text-xl text-center mt-8 animate-pulse"
                hidden={!uploadError}
              >
                يجب أن يكون حجم الملف أقل من 1 ميجا بايت
              </div>
              <div
                className="relative w-full cursor-pointer"
                hidden={
                  !!errors.nationalId ||
                  values.nationalId === '' ||
                  (values.nationalId && values.nationalId.length < 10)
                }
              >
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="nationalIdFilePath"
                  name="nationalIdFilePath"
                  ref={nationalIdFileRef}
                  className="w-full p-3 pr-14 invisible"
                  type="file"
                  onChange={() => {
                    dispatch(setUploadPending('national'))
                    var formData = new FormData()
                    formData.append(
                      `${values.nationalId}_NATIONAL_ID`,
                      nationalIdFileRef.current.files[0]
                    )

                    dispatch(
                      setUploadedNationalDocument({
                        path: `${values.nationalId}_NATIONAL_ID`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`relative flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.personal.nationalIdFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : uploadPending === 'national'
                      ? 'bg-orange focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    nationalIdFileRef.current!.click()
                  }}
                >
                  <div className={`ltr text-rock  fileName font-bold`}>
                    {formData.personal.nationalIdFilePath ? (
                      formData.personal.nationalIdFilePath
                    ) : uploadPending === 'national' ? (
                      <div className="flex items-center justify-center space-x-2 animate-bounce">
                        <div className="w-2 h-2 bg-sky rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-700 rounded-full"></div>
                      </div>
                    ) : (
                      'يرجى إرفاق صورة الهوية الوطنية'
                    )}
                  </div>
                </div>

                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.personal.nationalIdFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB'}
                </p>

                {!formData.personal.nationalIdFilePath ? (
                  <div className="text-orange text-center mt-4">
                    يجب إرفاق الهوية الوطنية
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full cursor-pointer"
                hidden={
                  !!errors.nationalId ||
                  values.nationalId === '' ||
                  (values.nationalId && values.nationalId.length < 10)
                }
              >
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="personalPhotoFilePath"
                  name="personalPhotoFilePath"
                  ref={personalPhotoFileRef}
                  className="w-full p-3 pr-14 z-10 invisible"
                  type="file"
                  onChange={() => {
                    dispatch(setUploadPending('personal'))
                    var formData = new FormData()
                    formData.append(
                      `${values.nationalId}_PERSONAL_PHOTO`,
                      personalPhotoFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedPhotoDocument({
                        path: `${values.nationalId}_PERSONAL_PHOTO`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 relative w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.personal.personalPhotoFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : uploadPending === 'personal'
                      ? 'bg-orange focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    personalPhotoFileRef.current!.click()
                  }}
                >
                  <span
                    className={`ltr cursor-pointer fileName font-bold text-rock`}
                  >
                    {formData.personal.personalPhotoFilePath ? (
                      formData.personal.personalPhotoFilePath
                    ) : uploadPending === 'personal' ? (
                      <div className="flex items-center justify-center space-x-2 animate-bounce">
                        <div className="w-2 h-2 bg-sky rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-700 rounded-full"></div>
                      </div>
                    ) : (
                      'الصورة الشخصية — اختياري'
                    )}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.personal.personalPhotoFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB'}
                </p>
              </div>
              <div
                className="relative w-full cursor-pointer"
                hidden={
                  !!errors.nationalId ||
                  values.nationalId === '' ||
                  (values.nationalId && values.nationalId.length < 10)
                }
              >
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="passportFilePath"
                  name="passportFilePath"
                  ref={passportFileRef}
                  className="w-full p-3 pr-14 invisible"
                  type="file"
                  onChange={() => {
                    dispatch(setUploadPending('passport'))
                    var formData = new FormData()
                    formData.append(
                      `${values.nationalId}_PASSPORT`,
                      passportFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedPassportDocument({
                        path: `${values.nationalId}_PASSPORT`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 relative w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.personal.passportFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : uploadPending === 'passport'
                      ? 'bg-orange focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    passportFileRef.current!.click()
                  }}
                >
                  <span
                    className={`ltr text-rock cursor-pointer fileName font-bold`}
                  >
                    {formData.personal.passportFilePath ? (
                      formData.personal.passportFilePath
                    ) : uploadPending === 'passport' ? (
                      <div className="flex items-center justify-center space-x-2 animate-bounce">
                        <div className="w-2 h-2 bg-sky rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-700 rounded-full"></div>
                      </div>
                    ) : (
                      'صورة الجواز — اختياري'
                    )}
                  </span>
                </div>
                <p className="text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.personal.passportFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
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

export default PersonalInfo
