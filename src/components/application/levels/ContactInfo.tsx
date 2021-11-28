import { FC, useEffect, useRef, useState } from 'react'
import {
  BsBuilding,
  BsEnvelopeFill,
  BsPersonBoundingBox,
  BsPhone,
  BsPeople,
  BsMailbox,
} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setNationalAddressDocument,
  setUploadPending,
  setUserContactInfo,
} from '../../../features/applicationSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const arRegex = /^[\u0621-\u064A\u0660-\u0669 ]+$/
const numRegex = /^[0-9]+$/

const ContactInfoSchema = Yup.object().shape({
  email: Yup.string()
    .email('البريد المدخل غير صحيح')
    .max(255, 'البريد طويل جداً')
    .required('هذا الحقل إلزامي'),
  phoneNumber: Yup.string()
    .min(10, 'يجب أن لا يقل عن 10')
    .required('هذا الحقل إلزامي')
    .matches(numRegex, 'يسمح فقط بالأرقام'),
  province: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  city: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  area: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  street: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  postalCode: Yup.string()
    .required('هذا الحقل إلزامي')
    .matches(numRegex, 'يسمح فقط بالأرقام'),
  emergencyContactName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .matches(arRegex, 'يسمح فقط بالعربية')
    .required('هذا الحقل إلزامي'),
  emergencyContactPhoneNumber: Yup.string()
    .required('هذا الحقل إلزامي')
    .matches(numRegex, 'يسمح فقط بالأرقام'),
  emergencyContactRelation: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
})

const ContactInfo: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { formData, uploadPending } = useAppSelector(
    (state) => state.application
  )
  const { email, phoneNumber } = useAppSelector((state) => state.user.user)

  const nationalAddressFileRef = useRef<HTMLInputElement | null>(null)

  const [uploadError, setUploadError] = useState(false)

  const dispatch = useAppDispatch()

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
          initialValues={{
            ...formData.contact,
            email: email,
            phoneNumber: phoneNumber,
          }}
          onSubmit={(values) => {
            dispatch(
              setUserContactInfo({
                ...values,
                nationalIdAddressFilePath:
                  formData.contact.nationalIdAddressFilePath,
                nationalIdAddressFileUploaded:
                  formData.contact.nationalIdAddressFileUploaded,
              })
            )
            dispatch(setApplicationProgress(nextLevel))
          }}
        >
          {({ errors, touched, values, handleChange, handleBlur }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div className="relative w-full">
                <Field
                  disabled={email ? true : false}
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className="noselect placeholder-mist w-full p-3 pb-4 pr-14 text-xl bg-rock text-mist rounded focus:outline-none focus:ring-2 focus:ring-mist border-mist border"
                />

                <BsEnvelopeFill className="text-3xl text-mist absolute top-3 right-3" />
                {errors.email && touched.email ? (
                  <div className="text-orange font-bold text-center mt-4">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="phoneNumber"
                  placeholder="رقم الجوال"
                  className="noselect placeholder-mist w-full p-3 pb-4 pr-14 text-xl bg-rock text-mist rounded focus:outline-none focus:ring-2 focus:ring-mist border-mist border"
                />

                <BsPhone className="text-3xl text-mist absolute top-3 right-3" />
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div className="text-orange text-center mt-4">
                    {errors.phoneNumber}
                  </div>
                ) : null}
              </div>

              <a
                href="https://accounts.splonline.com.sa/ar/Account/Login"
                target="_blank"
                rel="noreferrer noopener"
                className={`${
                  values.province !== '' &&
                  values.city !== '' &&
                  values.area !== '' &&
                  values.street !== ''
                    ? 'hidden'
                    : 'block'
                } text-sky`}
              >
                يمكنك الحصول على عنوانك الوطني وطباعته من هنا
              </a>

              <div className="relative w-full">
                <select
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="province"
                  value={values.province}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">المنطقة حسب عنوانك الوطني</option>
                  <option value="منطقة الرياض">منطقة الرياض</option>
                  <option value="منطقة مكة المكرمة">منطقة مكة المكرمة</option>
                  <option value="منطقة المدينة المنورة">
                    منطقة المدينة المنورة
                  </option>
                  <option value="منطقة القصيم">منطقة القصيم</option>
                  <option value="المنطقة الشرقية">المنطقة الشرقية</option>
                  <option value="منطقة عسير">منطقة عسير</option>
                  <option value="منطقة تبوك">منطقة تبوك</option>
                  <option value="منطقة حائل">منطقة حائل</option>
                  <option value="منطقة الحدود الشمالية">
                    منطقة الحدود الشمالية
                  </option>
                  <option value="منطقة جازان">منطقة جازان</option>
                  <option value="منطقة نجران">منطقة نجران</option>
                  <option value="منطقة الباحة">منطقة الباحة</option>
                  <option value="منطقة الجوف">منطقة الجوف</option>
                </select>
                <BsBuilding className="text-3xl text-rock absolute top-3 right-3" />
                {errors.province && touched.province ? (
                  <div className="text-orange text-center mt-4">
                    {errors.province}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="city"
                  placeholder="المدينة حسب عنوانك الوطني"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsBuilding className="text-3xl text-rock absolute top-3 right-3" />
                {errors.city && touched.city ? (
                  <div className="text-orange text-center mt-4">
                    {errors.city}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="area"
                  placeholder="الحي حسب عنوانك الوطني"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsBuilding className="text-3xl text-rock absolute top-3 right-3" />
                {errors.area && touched.area ? (
                  <div className="text-orange text-center mt-4">
                    {errors.area}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="street"
                  placeholder="الشارع حسب عنوانك الوطني"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsBuilding className="text-3xl text-rock absolute top-3 right-3" />
                {errors.street && touched.street ? (
                  <div className="text-orange text-center mt-4">
                    {errors.street}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="postalCode"
                  placeholder=" الرمز البريدي حسب عنوانك الوطني"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsMailbox className="text-3xl text-rock absolute top-3 right-3" />
                {errors.postalCode && touched.postalCode ? (
                  <div className="text-orange text-center mt-4">
                    {errors.postalCode}
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
                  id="nationalIdAddressFilePath"
                  name="nationalIdAddressFilePath"
                  ref={nationalAddressFileRef}
                  className="placeholder-peak w-full p-3 pr-14 invisible"
                  type="file"
                  onChange={() => {
                    dispatch(setUploadPending('address'))
                    var formDataToUpload = new FormData()
                    formDataToUpload.append(
                      `${formData.personal.nationalId}_NATIONAL_ADDRESS`,
                      nationalAddressFileRef.current.files[0]
                    )
                    dispatch(
                      setNationalAddressDocument({
                        path: `${formData.personal.nationalId}_NATIONAL_ADDRESS`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 placeholder-peak w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.contact.nationalIdAddressFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : uploadPending === 'address'
                      ? 'bg-orange focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    nationalAddressFileRef.current!.click()
                  }}
                >
                  <span className={`ltr text-rock fileName font-bold`}>
                    {formData.contact.nationalIdAddressFilePath ? (
                      formData.contact.nationalIdAddressFilePath
                    ) : uploadPending === 'address' ? (
                      <div className="flex items-center justify-center space-x-2 animate-bounce">
                        <div className="w-2 h-2 bg-sky rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-300 rounded-full"></div>
                        <div className="w-2 h-2 bg-sky-700 rounded-full"></div>
                      </div>
                    ) : (
                      'يرجى إرفاق صورة العنوان الوطني'
                    )}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.contact.nationalIdAddressFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB'}
                </p>
                {!formData.contact.nationalIdAddressFilePath ? (
                  <div className="text-orange text-center mt-4">
                    يجب إرفاق صورة العنوان الوطني الرسمي
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <Field
                  name="emergencyContactName"
                  placeholder="اسم شخص يمكن الاتصال به في حالة الطوارئ"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPersonBoundingBox className="text-3xl text-rock absolute top-4 right-2" />
                {errors.emergencyContactName && touched.emergencyContactName ? (
                  <div className="text-orange text-center">
                    {errors.emergencyContactName}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="emergencyContactPhoneNumber"
                  placeholder="رقم الجوال للإتصال"
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                <BsPhone className="text-3xl text-rock absolute top-4 right-2" />
                {errors.emergencyContactPhoneNumber &&
                touched.emergencyContactPhoneNumber ? (
                  <div className="text-orange text-center mt-4">
                    {errors.emergencyContactPhoneNumber}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="placeholder-peak w-full p-3 pb-4 pr-14 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="emergencyContactRelation"
                  value={values.emergencyContactRelation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">صلة القرابة</option>
                  <option value="زوج / زوجة">زوج / زوجة</option>
                  <option value="أخ / أخت">أخ / أخت</option>
                  <option value="صديق / صديقة">صديق / صديقة </option>
                  <option value="أخرى">أخرى</option>
                </select>
                <BsPeople className="text-3xl text-rock absolute top-4 right-2" />
                {errors.emergencyContactRelation &&
                touched.emergencyContactRelation ? (
                  <div className="text-orange text-center">
                    {errors.emergencyContactRelation}
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

export default ContactInfo
