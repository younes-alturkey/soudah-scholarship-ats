import { FC, useEffect, useRef, useState } from 'react'
import {
  BsBuilding,
  BsCardHeading,
  BsBank,
  BsPinMap,
  BsClipboardData,
  BsCalendar2Check,
  BsFillStarFill,
  BsStack,
  BsClipboardCheck,
  BsTranslate,
  BsJournalMedical,
  BsUpload,
} from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setUploadedEducationCert,
  setUploadedEducationSupportDocx,
  setUploadedOfficalEnglishTest,
  setUserEducationInfo,
} from '../../../features/applicationSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'

const EduInfoSchema = Yup.object().shape({
  level: Yup.string().min(2, 'هذا الحقل إلزامي').required('هذا الحقل إلزامي'),
  lastInstitutionName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  countryOfLastStudy: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  gpaType: Yup.string().min(2, 'هذا الحقل إلزامي').required('هذا الحقل إلزامي'),
  gpa: Yup.number()
    .when('gpaType', {
      is: 'of 4',
      then: Yup.number()
        .typeError('لا بد من إدخال رقم')
        .max(4, 'يجب أن تكون القيمة من ٠.١ إلى ٤')
        .min(0.1, 'لا يمكن أن يقل المعدل عن صفر')
        .required('لا بد من إدخال معدلك الدراسي'),
    })
    .when('gpaType', {
      is: 'of 5',
      then: Yup.number()
        .typeError('لا بد من إدخال رقم')
        .max(5, 'يجب أن تكون القيمة من ٠.١ إلى ٥')
        .min(0.1, 'لا يمكن أن يقل المعدل عن صفر')
        .required('لا بد من إدخال معدلك الدراسي'),
    })
    .when('gpaType', {
      is: 'of 100',
      then: Yup.number()
        .typeError('لا بد من إدخال رقم')
        .max(100, 'يجب أن تكون القيمة من ٠.١ إلى ١٠٠')
        .min(0.1, 'لا يمكن أن يقل المعدل عن صفر')
        .required('لا بد من إدخال معدلك الدراسي'),
    }),
  graduationYear: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  highschoolName: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  receivedScholarshipBefore: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  educationLevelForLastScholarship: Yup.string().when(
    'receivedScholarshipBefore',
    {
      is: 'نعم',
      then: Yup.string()
        .min(2, 'هذا الحقل إلزامي')
        .required('هذا الحقل إلزامي'),
    }
  ),
  gatScore: Yup.number(),
  aatScore: Yup.number(),
  englishProficiency: Yup.number()
    .min(1, 'لا بد من تقيم مستوى لغتك')
    .max(10, 'أعلى مستوى هو 10')
    .required('هذا الحقل إلزامي'),
  tookOfficalEnglishTest: Yup.string()
    .min(2, 'هذا الحقل إلزامي')
    .required('هذا الحقل إلزامي'),
  officalEnglishTestName: Yup.string().when('tookOfficalEnglishTest', {
    is: 'نعم',
    then: Yup.string().min(2, 'هذا الحقل إلزامي').required('هذا الحقل إلزامي'),
  }),
  officalEnglishTestScore: Yup.string().when('tookOfficalEnglishTest', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي'),
  }),
})

const EducationInfo: FC = () => {
  const { currentLevel, nextLevel } = useAppSelector(
    (state) => state.application.applicationProgress
  )

  const { formData } = useAppSelector((state) => state.application)
  const [uploadError, setUploadError] = useState(false)

  const englishResultFileRef = useRef<HTMLInputElement | null>(null)
  const supportDocxFileRef = useRef<HTMLInputElement | null>(null)
  const educationFileRef = useRef<HTMLInputElement | null>(null)

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
          initialValues={formData.education}
          onSubmit={(values) => {
            dispatch(
              setUserEducationInfo({
                ...values,
                officalEnglishTestResultFilePath:
                  formData.education.officalEnglishTestResultFilePath,
                officalEnglishTestResultFileUploaded:
                  formData.education.officalEnglishTestResultFileUploaded,
                supportDocumentFilePath:
                  formData.education.supportDocumentFilePath,
                supportDocumentFileUploaded:
                  formData.education.supportDocumentFileUploaded,
                educationCertFilePath: formData.education.educationCertFilePath,
                educationCertFileUploaded:
                  formData.education.educationCertFileUploaded,
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
                  name="level"
                  value={values.level}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">المستوى التعليمي</option>
                  <option value="حاصل على شهادة الثانوية العامة">
                    حاصل على شهادة الثانوية العامة
                  </option>
                  <option value="حاصل على شهادة الدبلوم">
                    حاصل على شهادة الدبلوم
                  </option>
                  <option value="حاصل على درجة البكالوريوس">
                    حاصل على درجة البكالوريوس
                  </option>
                  <option value="حاصل على درجة الماجستير">
                    حاصل على درجة الماجستير
                  </option>
                </select>
                <BsCardHeading className="text-3xl absolute top-3 right-3" />
                {errors.level && touched.level ? (
                  <div className="text-orange text-center mt-4">
                    {errors.level}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="lastInstitutionName"
                  placeholder="اسم الجهة التعليمية لآخر مستوى تعليمي"
                  className={`w-full text-xl p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.lastInstitutionName && touched.lastInstitutionName
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsBank className="text-3xl absolute top-3 right-3" />
                {errors.lastInstitutionName && touched.lastInstitutionName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.lastInstitutionName}
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
                  id="supportingDocumentPath"
                  name="supportingDocumentPath"
                  ref={educationFileRef}
                  className="w-full p-3 pr-14 rounded invisible"
                  type="file"
                  onChange={() => {
                    var filesize =
                      educationFileRef.current.files[0].size / 1024 / 1024
                    if (filesize > 2.5) {
                      setUploadError(true)
                      return
                    } else {
                      setUploadError(false)
                    }
                    var formDataToUpload = new FormData()
                    formDataToUpload.append(
                      `${formData.personal.nationalId}_EDUCATION_CERT`,
                      educationFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedEducationCert({
                        path: `${formData.personal.nationalId}_EDUCATION_CERT`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.education.educationCertFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : 'focus:ring-rock border border-rock bg-mist'
                  }`}
                  onClick={() => {
                    educationFileRef.current!.click()
                  }}
                >
                  <span
                    className={`ltr cursor-pointer fileName font-bold text-rock`}
                  >
                    {formData.education.educationCertFilePath
                      ? formData.education.educationCertFilePath
                      : 'يرجى إرفاق صورة من الشهادة التعليمية — إلزامي'}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.proExp.supportingDocumentPath
                    ? 'تم رفع الملف على الخادم و يمكنك رفع ملف أخر أو مضغوط'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB max'}
                </p>
                {!formData.education.educationCertFilePath ? (
                  <div className="text-orange text-center mt-4">
                    يجب إرفاق صورة من الشهادة التعليمية
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="countryOfLastStudy"
                  value={values.countryOfLastStudy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">دولة الدراسة</option>
                  <option value="المملكة العربية السعودية">
                    المملكة العربية السعودية
                  </option>
                  <option value="أفغانستان">أفغانستان</option>
                  <option value="ألبانيا">ألبانيا</option>
                  <option value="الجزائر">الجزائر</option>
                  <option value="أندورا">أندورا</option>
                  <option value="أنغولا">أنغولا</option>
                  <option value="أنتيغوا وباربودا">أنتيغوا وباربودا</option>
                  <option value="الأرجنتين">الأرجنتين</option>
                  <option value="أرمينيا">أرمينيا</option>
                  <option value="أستراليا">أستراليا</option>
                  <option value="النمسا">النمسا</option>
                  <option value="أذربيجان">أذربيجان</option>
                  <option value="البهاما">البهاما</option>
                  <option value="البحرين">البحرين</option>
                  <option value="بنغلاديش">بنغلاديش</option>
                  <option value="باربادوس">باربادوس</option>
                  <option value="بيلاروسيا">بيلاروسيا</option>
                  <option value="بلجيكا">بلجيكا</option>
                  <option value="بليز">بليز</option>
                  <option value="بنين">بنين</option>
                  <option value="بوتان">بوتان</option>
                  <option value="بوليفيا">بوليفيا</option>
                  <option value="البوسنة والهرسك ">البوسنة والهرسك </option>
                  <option value="بوتسوانا">بوتسوانا</option>
                  <option value="البرازيل">البرازيل</option>
                  <option value="بروناي">بروناي</option>
                  <option value="بلغاريا">بلغاريا</option>
                  <option value="بوركينا فاسو ">بوركينا فاسو </option>
                  <option value="بوروندي">بوروندي</option>
                  <option value="كمبوديا">كمبوديا</option>
                  <option value="الكاميرون">الكاميرون</option>
                  <option value="كندا">كندا</option>
                  <option value="الرأس الأخضر">الرأس الأخضر</option>
                  <option value="جمهورية أفريقيا الوسطى ">
                    جمهورية أفريقيا الوسطى
                  </option>
                  <option value="تشاد">تشاد</option>
                  <option value="تشيلي">تشيلي</option>
                  <option value="الصين">الصين</option>
                  <option value="كولومبيا">كولومبيا</option>
                  <option value="جزر القمر">جزر القمر</option>
                  <option value="كوستاريكا">كوستاريكا</option>
                  <option value="ساحل العاج">ساحل العاج</option>
                  <option value="كرواتيا">كرواتيا</option>
                  <option value="كوبا">كوبا</option>
                  <option value="قبرص">قبرص</option>
                  <option value="التشيك">التشيك</option>
                  <option value="جمهورية الكونغو الديمقراطية">
                    جمهورية الكونغو الديمقراطية
                  </option>
                  <option value="الدنمارك">الدنمارك</option>
                  <option value="جيبوتي">جيبوتي</option>
                  <option value="دومينيكا">دومينيكا</option>
                  <option value="جمهورية الدومينيكان">
                    جمهورية الدومينيكان
                  </option>
                  <option value="تيمور الشرقية ">تيمور الشرقية </option>
                  <option value="الإكوادور">الإكوادور</option>
                  <option value="مصر">مصر</option>
                  <option value="السلفادور">السلفادور</option>
                  <option value="غينيا الاستوائية">غينيا الاستوائية</option>
                  <option value="إريتريا">إريتريا</option>
                  <option value="إستونيا">إستونيا</option>
                  <option value="إثيوبيا">إثيوبيا</option>
                  <option value="فيجي">فيجي</option>
                  <option value="فنلندا">فنلندا</option>
                  <option value="فرنسا">فرنسا</option>
                  <option value="الغابون">الغابون</option>
                  <option value="غامبيا">غامبيا</option>
                  <option value="جورجيا">جورجيا</option>
                  <option value="ألمانيا">ألمانيا</option>
                  <option value="غانا">غانا</option>
                  <option value="اليونان">اليونان</option>
                  <option value="جرينادا">جرينادا</option>
                  <option value="غواتيمالا">غواتيمالا</option>
                  <option value="غينيا">غينيا</option>
                  <option value="غينيا بيساو">غينيا بيساو</option>
                  <option value="غويانا">غويانا</option>
                  <option value="هايتي">هايتي</option>
                  <option value="هندوراس">هندوراس</option>
                  <option value="المجر">المجر</option>
                  <option value="آيسلندا">آيسلندا</option>
                  <option value="الهند">الهند</option>
                  <option value="إندونيسيا">إندونيسيا</option>
                  <option value="إيران">إيران</option>
                  <option value="العراق">العراق</option>
                  <option value="جمهورية أيرلندا ">جمهورية أيرلندا </option>
                  <option value="فلسطين">فلسطين</option>
                  <option value="إيطاليا">إيطاليا</option>
                  <option value="جامايكا">جامايكا</option>
                  <option value="اليابان">اليابان</option>
                  <option value="الأردن">الأردن</option>
                  <option value="كازاخستان">كازاخستان</option>
                  <option value="كينيا">كينيا</option>
                  <option value="كيريباتي">كيريباتي</option>
                  <option value="الكويت">الكويت</option>
                  <option value="قرغيزستان">قرغيزستان</option>
                  <option value="لاوس">لاوس</option>
                  <option value="لاوس">لاوس</option>
                  <option value="لاتفيا">لاتفيا</option>
                  <option value="لبنان">لبنان</option>
                  <option value="ليسوتو">ليسوتو</option>
                  <option value="ليبيريا">ليبيريا</option>
                  <option value="ليبيا">ليبيا</option>
                  <option value="ليختنشتاين">ليختنشتاين</option>
                  <option value="ليتوانيا">ليتوانيا</option>
                  <option value="لوكسمبورغ">لوكسمبورغ</option>
                  <option value="مدغشقر">مدغشقر</option>
                  <option value="مالاوي">مالاوي</option>
                  <option value="ماليزيا">ماليزيا</option>
                  <option value="جزر المالديف">جزر المالديف</option>
                  <option value="مالي">مالي</option>
                  <option value="مالطا">مالطا</option>
                  <option value="جزر مارشال">جزر مارشال</option>
                  <option value="موريتانيا">موريتانيا</option>
                  <option value="موريشيوس">موريشيوس</option>
                  <option value="المكسيك">المكسيك</option>
                  <option value="مايكرونيزيا">مايكرونيزيا</option>
                  <option value="مولدوفا">مولدوفا</option>
                  <option value="موناكو">موناكو</option>
                  <option value="منغوليا">منغوليا</option>
                  <option value="الجبل الأسود">الجبل الأسود</option>
                  <option value="المغرب">المغرب</option>
                  <option value="موزمبيق">موزمبيق</option>
                  <option value="بورما">بورما</option>
                  <option value="ناميبيا">ناميبيا</option>
                  <option value="ناورو">ناورو</option>
                  <option value="نيبال">نيبال</option>
                  <option value="هولندا">هولندا</option>
                  <option value="نيوزيلندا">نيوزيلندا</option>
                  <option value="نيكاراجوا">نيكاراجوا</option>
                  <option value="النيجر">النيجر</option>
                  <option value="نيجيريا">نيجيريا</option>
                  <option value="كوريا الشمالية ">كوريا الشمالية </option>
                  <option value="النرويج">النرويج</option>
                  <option value="سلطنة عمان">سلطنة عمان</option>
                  <option value="باكستان">باكستان</option>
                  <option value="بالاو">بالاو</option>
                  <option value="بنما">بنما</option>
                  <option value="بابوا غينيا الجديدة">
                    بابوا غينيا الجديدة
                  </option>
                  <option value="باراغواي">باراغواي</option>
                  <option value="بيرو">بيرو</option>
                  <option value="الفلبين">الفلبين</option>
                  <option value="بولندا">بولندا</option>
                  <option value="البرتغال">البرتغال</option>
                  <option value="قطر">قطر</option>
                  <option value="جمهورية الكونغو">جمهورية الكونغو</option>
                  <option value="جمهورية مقدونيا">جمهورية مقدونيا</option>
                  <option value="رومانيا">رومانيا</option>
                  <option value="روسيا">روسيا</option>
                  <option value="رواندا">رواندا</option>
                  <option value="سانت كيتس ونيفيس">سانت كيتس ونيفيس</option>
                  <option value="سانت لوسيا">سانت لوسيا</option>
                  <option value="سانت فنسينت والجرينادينز">
                    سانت فنسينت والجرينادينز
                  </option>
                  <option value="ساموا">ساموا</option>
                  <option value="سان مارينو">سان مارينو</option>
                  <option value="ساو تومي وبرينسيب">ساو تومي وبرينسيب</option>
                  <option value="السنغال">السنغال</option>
                  <option value="صربيا">صربيا</option>
                  <option value="سيشيل">سيشيل</option>
                  <option value="سيراليون">سيراليون</option>
                  <option value="سنغافورة">سنغافورة</option>
                  <option value="سلوفاكيا">سلوفاكيا</option>
                  <option value="سلوفينيا">سلوفينيا</option>
                  <option value="جزر سليمان">جزر سليمان</option>
                  <option value="الصومال">الصومال</option>
                  <option value="جنوب أفريقيا">جنوب أفريقيا</option>
                  <option value="كوريا الجنوبية">كوريا الجنوبية</option>
                  <option value="جنوب السودان">جنوب السودان</option>
                  <option value="إسبانيا">إسبانيا</option>
                  <option value="سريلانكا">سريلانكا</option>
                  <option value="السودان">السودان</option>
                  <option value="سورينام">سورينام</option>
                  <option value="سوازيلاند">سوازيلاند</option>
                  <option value="السويد">السويد</option>
                  <option value="سويسرا">سويسرا</option>
                  <option value="سوريا">سوريا</option>
                  <option value="طاجيكستان">طاجيكستان</option>
                  <option value="تنزانيا">تنزانيا</option>
                  <option value="تايلاند">تايلاند</option>
                  <option value="توغو">توغو</option>
                  <option value="تونجا">تونجا</option>
                  <option value="ترينيداد وتوباغو">ترينيداد وتوباغو</option>
                  <option value="تونس">تونس</option>
                  <option value="تركيا">تركيا</option>
                  <option value="تركمانستان">تركمانستان</option>
                  <option value="توفالو">توفالو</option>
                  <option value="أوغندا">أوغندا</option>
                  <option value="أوكرانيا">أوكرانيا</option>
                  <option value="الإمارات العربية المتحدة">
                    الإمارات العربية المتحدة
                  </option>
                  <option value="المملكة المتحدة">المملكة المتحدة</option>
                  <option value="الولايات المتحدة">الولايات المتحدة</option>
                  <option value="أوروغواي">أوروغواي</option>
                  <option value="أوزبكستان">أوزبكستان</option>
                  <option value="فانواتو">فانواتو</option>
                  <option value="فنزويلا">فنزويلا</option>
                  <option value="فيتنام">فيتنام</option>
                  <option value="اليمن">اليمن</option>
                  <option value="زامبيا">زامبيا</option>
                  <option value="زيمبابوي">زيمبابوي</option>
                </select>

                <BsPinMap className="text-3xl absolute top-3 right-3" />
                {errors.countryOfLastStudy && touched.countryOfLastStudy ? (
                  <div className="text-orange text-center mt-4">
                    {errors.countryOfLastStudy}
                  </div>
                ) : null}
              </div>
              <div className="relative  w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="gpaType"
                  value={values.gpaType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">
                    اختر نوع المعدل بحسب المسجل في الشهادة
                  </option>
                  <option value="of 4">من 4</option>
                  <option value="of 5">من 5</option>
                  <option value="of 100">100%</option>
                </select>

                <BsClipboardData className="text-3xl absolute top-3 right-3" />
                {errors.gpaType && touched.gpaType ? (
                  <div className="text-orange text-center mt-4">
                    {errors.gpaType}
                  </div>
                ) : null}
              </div>
              <div className="relative  w-full " hidden={!values.gpaType}>
                <Field
                  name="gpa"
                  placeholder="قيمة المعدل الدراسي بحسب المسجل في الشهادة"
                  className={`w-full text-xl p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.gpa && touched.gpa
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsClipboardData className="text-3xl absolute top-3 right-3" />
                {errors.gpa && touched.gpa ? (
                  <div className="text-orange text-center mt-4">
                    {errors.gpa}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="graduationYear"
                  value={values.graduationYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">سنة التخرج</option>
                  <option value="2000">۲۰۰۰</option>
                  <option value="2001">۲۰۰۱</option>
                  <option value="2002">۲۰۰۲</option>
                  <option value="2003">۲۰۰۳</option>
                  <option value="2004">۲۰۰۴</option>
                  <option value="2005">۲۰۰۵</option>
                  <option value="2006">۲۰۰۶</option>
                  <option value="2007">۲۰۰۷</option>
                  <option value="2008">۲۰۰۸</option>
                  <option value="2009">۲۰۰۹</option>
                  <option value="2010">۲۰۱۰</option>
                  <option value="2011">۲۰۱۱</option>
                  <option value="2012">۲۰۱۲</option>
                  <option value="2013">۲۰۱۳</option>
                  <option value="2014">۲۰۱۴</option>
                  <option value="2015">۲۰۱۵</option>
                  <option value="2016">۲۰۱۶</option>
                  <option value="2017">۲۰۱۷</option>
                  <option value="2018">۲۰۱۸</option>
                  <option value="2019">۲۰۱۹</option>
                  <option value="2020">۲۰۲۰</option>
                  <option value="2021">۲۰۲۱</option>
                  <option value="2022">۲۰۲۲</option>
                </select>
                <BsCalendar2Check className="text-3xl absolute top-3 right-3" />
                {errors.graduationYear && touched.graduationYear ? (
                  <div className="text-orange text-center mt-4">
                    {errors.graduationYear}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="highschoolName"
                  placeholder="اسم المدرسة الثانوية التي تم التخرج منها"
                  className={`w-full text-xl p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.highschoolName && touched.highschoolName
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsBuilding className="text-3xl absolute top-3 right-3" />
                {errors.highschoolName && touched.highschoolName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.highschoolName}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="receivedScholarshipBefore"
                  value={values.receivedScholarshipBefore}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">هل حصلت على ابتعاث سابقـًا؟</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                <BsFillStarFill className="text-3xl absolute top-3 right-3" />
                {errors.receivedScholarshipBefore &&
                touched.receivedScholarshipBefore ? (
                  <div className="text-orange text-center mt-4">
                    {errors.receivedScholarshipBefore}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={
                  !values.receivedScholarshipBefore ||
                  values.receivedScholarshipBefore === 'لا'
                }
              >
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="educationLevelForLastScholarship"
                  value={values.educationLevelForLastScholarship}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">مرحلة التعليم للابتعاث السابق؟</option>
                  <option value="الثانوية العامة">الثانوية العامة</option>
                  <option value="الدبلوم">الدبلوم</option>
                  <option value="البكالوريوس">البكالوريوس</option>
                  <option value="الماجستير">الماجستير</option>
                </select>
                <BsStack className="text-3xl absolute top-3 right-3" />
                {errors.educationLevelForLastScholarship &&
                touched.educationLevelForLastScholarship ? (
                  <div className="text-orange text-center mt-4">
                    {errors.educationLevelForLastScholarship}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="gatScore"
                  placeholder="درجة اختبار القدرات - إن وجدت"
                  className={`w-full text-xl p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2  ${
                    errors.gatScore && touched.gatScore
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsClipboardCheck className="text-3xl absolute top-3 right-3" />
                {errors.gatScore && touched.gatScore ? (
                  <div className="text-orange text-center mt-4">
                    {errors.gatScore}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <Field
                  name="aatScore"
                  placeholder="درجة اختبار التحصيلي - إن وجدت"
                  className={`w-full text-xl p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.aatScore && touched.aatScore
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsClipboardCheck className="text-3xl absolute top-3 right-3" />
                {errors.aatScore && touched.aatScore ? (
                  <div className="text-orange text-center mt-4">
                    {errors.aatScore}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="englishProficiency"
                  value={values.englishProficiency}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">قيَم مستوى لغتك الإنجليزية</option>
                  <option value="1">١ (ضعيفة)</option>
                  <option value="2">٢</option>
                  <option value="3">٣</option>
                  <option value="4">٤</option>
                  <option value="5">٥</option>
                  <option value="6">٦</option>
                  <option value="7">٧</option>
                  <option value="8">٨</option>
                  <option value="9">٩</option>
                  <option value="10">١٠ (ممتازة)</option>
                </select>
                <BsTranslate className="text-3xl absolute top-3 right-3" />
                {errors.englishProficiency && touched.englishProficiency ? (
                  <div className="text-orange text-center mt-4">
                    {errors.englishProficiency}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="tookOfficalEnglishTest"
                  value={values.tookOfficalEnglishTest}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">
                    هل سبق لك الحصول على اختبار تحديد اللغة الإنجليزية؟
                  </option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                <BsClipboardCheck className="text-3xl absolute top-3 right-3" />
                {errors.tookOfficalEnglishTest &&
                touched.tookOfficalEnglishTest ? (
                  <div className="text-orange text-center mt-4">
                    {errors.tookOfficalEnglishTest}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={
                  !values.tookOfficalEnglishTest ||
                  values.tookOfficalEnglishTest === 'لا'
                }
              >
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="officalEnglishTestName"
                  value={values.officalEnglishTestName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">اسم الاختبار</option>
                  <option value="IELTS">IELTS</option>
                  <option value="TOEFL">TOEFL</option>
                  <option value="STEP">STEP</option>
                  <option value="DUOLINGO">DUOLINGO</option>
                  <option value="Other">Other</option>
                </select>
                <BsJournalMedical className="text-3xl absolute top-3 right-3" />
                {errors.officalEnglishTestName &&
                touched.officalEnglishTestName ? (
                  <div className="text-orange text-center mt-4">
                    {errors.officalEnglishTestName}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={
                  !values.tookOfficalEnglishTest ||
                  values.tookOfficalEnglishTest === 'لا'
                }
              >
                <Field
                  name="officalEnglishTestScore"
                  placeholder="نتيجة الاختبار"
                  className={`w-full p-3 pr-14 rounded border bg-mist focus:outline-none focus:ring-2 ${
                    errors.officalEnglishTestScore &&
                    touched.officalEnglishTestScore
                      ? 'focus:ring-red border-red'
                      : 'focus:ring-rock border-rock'
                  }`}
                />
                <BsClipboardData className="text-3xl absolute top-3 right-3" />
                {errors.officalEnglishTestScore &&
                touched.officalEnglishTestScore ? (
                  <div className="text-orange text-center mt-4">
                    {errors.officalEnglishTestScore}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full cursor-pointer mb-8"
                hidden={
                  !values.tookOfficalEnglishTest ||
                  values.tookOfficalEnglishTest === 'لا'
                }
              >
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="officalEnglishTestResultFilePath"
                  name="officalEnglishTestResultFilePath"
                  ref={englishResultFileRef}
                  className="w-full p-3 pr-14 rounded invisible"
                  type="file"
                  onChange={() => {
                    var formDataTpUpload = new FormData()
                    formDataTpUpload.append(
                      `${formData.personal.nationalId}_EN_TEST_RESULT`,
                      englishResultFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedOfficalEnglishTest({
                        path: `${formData.personal.nationalId}_EN_TEST_RESULT`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.education.officalEnglishTestResultFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    englishResultFileRef.current!.click()
                  }}
                >
                  <BsUpload className="text-2xl" />
                  <span className={`ltr text-rock fileName font-bold`}>
                    {formData.education.officalEnglishTestResultFilePath
                      ? formData.education.officalEnglishTestResultFilePath
                      : 'يرجى إرفاق شهادة نتيجة اختبار اللغة'}
                  </span>
                  {!formData.education.officalEnglishTestResultFilePath ? (
                    <div className="text-orange text-center">إلزامي</div>
                  ) : null}
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.education.officalEnglishTestResultFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB max'}
                </p>
              </div>
              <div className="relative w-full cursor-pointer mt-4 mb-8">
                <input
                  accept=".pdf, .png, .jpg, .jpeg"
                  id="supportDocumentFilePath"
                  name="supportDocumentFilePath"
                  ref={supportDocxFileRef}
                  className="w-full p-3 pr-14 rounded invisible"
                  type="file"
                  onChange={() => {
                    var formDataTpUpload = new FormData()
                    formDataTpUpload.append(
                      `${formData.personal.nationalId}_SUPPORTING_${
                        supportDocxFileRef.current.files[0] &&
                        supportDocxFileRef.current.files[0].name
                      }`,
                      supportDocxFileRef.current.files[0]
                    )
                    dispatch(
                      setUploadedEducationSupportDocx({
                        path: `${formData.personal.nationalId}_SUPPORTING_${
                          supportDocxFileRef.current.files[0] &&
                          supportDocxFileRef.current.files[0].name
                        }`,
                        status: true,
                      })
                    )
                  }}
                />
                <div
                  className={`flex justify-center items-center gap-4 w-full p-3 pr-6 rounded focus:outline-none focus:ring-2 ${
                    formData.education.supportDocumentFilePath
                      ? 'bg-sky focus:ring-rock border border-rock'
                      : 'bg-mist text-rock'
                  }`}
                  onClick={() => {
                    supportDocxFileRef.current!.click()
                  }}
                >
                  <span className={`ltr text-rock fileName font-bold`}>
                    {formData.education.supportDocumentFilePath
                      ? formData.education.supportDocumentFilePath
                      : 'شهادات لورش عمل أو دورات أخرى — إن وجد'}
                  </span>
                </div>
                <p className="ltr text-xs text-mist font-bold absolute top-6 left-3 lowercase">
                  {formData.education.supportDocumentFilePath
                    ? 'تم رفع الملف على الخادم و يمكنك الرفع مرة أخرى'
                    : '.pdf, .png, .jpg, .jpeg — 1 MB max'}
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

export default EducationInfo
