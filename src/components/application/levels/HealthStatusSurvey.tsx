import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setHealthStatusSurvey,
} from '../../../features/applicationSlice'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'
const HealthSurveyInfoSchema = Yup.object().shape({
  issuesWithVisionEvenWithGlasses: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithHearingEvenWithADevice: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithWalkingAndClimbing: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithMemoryAndFocus: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithDepressionAndAnxiety: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithShoweringAndChanging: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  issuesWithVerbvalCommunication: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  doYouUseSignLanguage: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  doYouUseProsthetics: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  doYouHaveDisabilityOfAnyKind: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  typeOfDisability: Yup.string().when('doYouHaveDisabilityOfAnyKind', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  }),
  doesDisabilityHinderYourStudyOrWork: Yup.string().when(
    'doYouHaveDisabilityOfAnyKind',
    {
      is: 'نعم',
      then: Yup.string()
        .required('هذا الحقل إلزامي')
        .min(2, 'هذا الحقل إلزامي'),
    }
  ),
  doYouHaveAnyChronicIllness: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  typeOfChronicIllness: Yup.string().when('doYouHaveAnyChronicIllness', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  }),
  doesChronicIllnessHinderYourStudyOrWork: Yup.string().when(
    'doYouHaveAnyChronicIllness',
    {
      is: 'نعم',
      then: Yup.string()
        .required('هذا الحقل إلزامي')
        .min(2, 'هذا الحقل إلزامي'),
    }
  ),
})

const HealthStatusSurvey: FC = () => {
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
          initialValues={formData.healthStatusSurvey}
          onSubmit={(values) => {
            dispatch(setHealthStatusSurvey(values))
            dispatch(setApplicationProgress(nextLevel))
          }}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في الرؤية، حتى عند استخدامك النظرات؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithVisionEvenWithGlasses"
                  value={values.issuesWithVisionEvenWithGlasses}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                </select>
                {errors.issuesWithVisionEvenWithGlasses &&
                touched.issuesWithVisionEvenWithGlasses ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithVisionEvenWithGlasses}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في السمع، حتى عند استخدامك جهاز للسمع؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithHearingEvenWithADevice"
                  value={values.issuesWithHearingEvenWithADevice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>
                {errors.issuesWithHearingEvenWithADevice &&
                touched.issuesWithHearingEvenWithADevice ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithHearingEvenWithADevice}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في المشي أو صعود الدرج؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithWalkingAndClimbing"
                  value={values.issuesWithWalkingAndClimbing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>

                {errors.issuesWithWalkingAndClimbing &&
                touched.issuesWithWalkingAndClimbing ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithWalkingAndClimbing}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في الذاكرة أو القدرة على التركيز؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithMemoryAndFocus"
                  value={values.issuesWithMemoryAndFocus}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>

                {errors.issuesWithMemoryAndFocus &&
                touched.issuesWithMemoryAndFocus ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithMemoryAndFocus}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في ممارسة حياتك اليومية بسبب الاكتئاب أو القلق
                  المفرط؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithDepressionAndAnxiety"
                  value={values.issuesWithDepressionAndAnxiety}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>

                {errors.issuesWithDepressionAndAnxiety &&
                touched.issuesWithDepressionAndAnxiety ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithDepressionAndAnxiety}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تواجه صعوبة في الاعتناء بنفسك، مثلاً عند الإستحمام أو عند
                  تغير ملابسك؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithShoweringAndChanging"
                  value={values.issuesWithShoweringAndChanging}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>

                {errors.issuesWithShoweringAndChanging &&
                touched.issuesWithShoweringAndChanging ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithShoweringAndChanging}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  عند استخدامك للغتك المعتادة؛ هل تواجه صعوبة في التواصل، مثلاً:
                  في فهم ما يقوله الأخرون، أو فهم الأخرين لك؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="issuesWithVerbvalCommunication"
                  value={values.issuesWithVerbvalCommunication}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="لا، ليست لدي صعوبة">لا، ليست لدي صعوبة</option>
                  <option value="نعم، لدي بعض الصعوبة">
                    نعم، لدي بعض الصعوبة
                  </option>
                  <option value="نعم، لدي الكثير من الصعوبة">
                    نعم، لدي الكثير من الصعوبة
                  </option>
                  <option value="نعم، لا استطيع القيام بذلك إطلاقاً">
                    نعم، لا استطيع القيام بذلك إطلاقاً
                  </option>
                </select>

                {errors.issuesWithVerbvalCommunication &&
                touched.issuesWithVerbvalCommunication ? (
                  <div className="text-orange text-center mt-4">
                    {errors.issuesWithVerbvalCommunication}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تستخدم لغة الاشارة؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doYouUseSignLanguage"
                  value={values.doYouUseSignLanguage}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                {errors.doYouUseSignLanguage && touched.doYouUseSignLanguage ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doYouUseSignLanguage}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تستخدم أيا من الأجهزة المساندة الأتية
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doYouUseProsthetics"
                  value={values.doYouUseProsthetics}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="كرسي متحرك">كرسي متحرك</option>
                  <option value="مشايه أو إطار مشي">مشايه أو إطار مشي</option>
                  <option value="عكاز أو عصا">عكاز أو عصا</option>
                  <option value="ركائز عضو صناعي ( رجل ، قدم ، يد )">
                    ركائز عضو صناعي ( رجل ، قدم ، يد )
                  </option>
                  <option value="شخص مساعد">شخص مساعد</option>
                  <option value="لا استخدم اي اجهزة او ادوات مساندة">
                    لا استخدم اي اجهزة او ادوات مساندة
                  </option>
                  <option value="اخرى">اخرى</option>
                </select>

                {errors.doYouUseProsthetics && touched.doYouUseProsthetics ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doYouUseProsthetics}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك إعاقة؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doYouHaveDisabilityOfAnyKind"
                  value={values.doYouHaveDisabilityOfAnyKind}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                {errors.doYouHaveDisabilityOfAnyKind &&
                touched.doYouHaveDisabilityOfAnyKind ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doYouHaveDisabilityOfAnyKind}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.doYouHaveDisabilityOfAnyKind !== 'نعم'}
              >
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  ما نوع الاعاقة؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="typeOfDisability"
                  value={values.typeOfDisability}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="إعاقة بصرية">إعاقة بصرية</option>
                  <option value="إعاقة سمعية">إعاقة سمعية</option>
                  <option value="إعاقة حركية">إعاقة حركية</option>
                  <option value="إعاقة ذهنية">إعاقة ذهنية</option>
                  <option value="إعاقة نفسية">إعاقة نفسية</option>
                  <option
                    value=" إعاقة تواصلية ( مشكلة في النطق والتخاطب او مشكلة في استخدام
                    او فهم اللغة)"
                  >
                    إعاقة تواصلية ( مشكلة في النطق والتخاطب او مشكلة في استخدام
                    او فهم اللغة)
                  </option>
                  <option value="اخرى">اخرى</option>
                </select>

                {errors.typeOfDisability && touched.typeOfDisability ? (
                  <div className="text-orange text-center mt-4">
                    {errors.typeOfDisability}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.doYouHaveDisabilityOfAnyKind !== 'نعم'}
              >
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل الاعاقة تؤثر على قدرتك على الدراسة و العمل؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doesDisabilityHinderYourStudyOrWork"
                  value={values.doesDisabilityHinderYourStudyOrWork}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                {errors.doesDisabilityHinderYourStudyOrWork &&
                touched.doesDisabilityHinderYourStudyOrWork ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doesDisabilityHinderYourStudyOrWork}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك أيا مرض مزمن أو مشكلة صحية مزمنة؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doYouHaveAnyChronicIllness"
                  value={values.doYouHaveAnyChronicIllness}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                {errors.doYouHaveAnyChronicIllness &&
                touched.doYouHaveAnyChronicIllness ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doYouHaveAnyChronicIllness}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.doYouHaveAnyChronicIllness !== 'نعم'}
              >
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  ما نوع المرض المزمن أو المشكلة الصحية المزمنة؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="typeOfChronicIllness"
                  value={values.typeOfChronicIllness}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="مرض الأنيميا">مرض الأنيميا</option>
                  <option value="مرض الربو">مرض الربو</option>
                  <option value="ضغط الدم">ضغط الدم</option>
                  <option value="مرض السكر">مرض السكر</option>
                  <option value="مرض القلب">مرض القلب</option>
                  <option value="مرض الفشل الكلوي">مرض الفشل الكلوي</option>
                  <option value="مرض الصرع (التشنجات)">
                    مرض الصرع (التشنجات)
                  </option>
                  <option value="مرض الكبد الوبائي">مرض الكبد الوبائي</option>
                  <option value="الدسك (مشاكل في العامود الفقري )">
                    الدسك (مشاكل في العامود الفقري )
                  </option>
                  <option value="مرض نفسي (الاكتئاب)">
                    مرض نفسي (الاكتئاب)
                  </option>
                  <option value="اخرى">اخرى</option>
                </select>

                {errors.typeOfChronicIllness && touched.typeOfChronicIllness ? (
                  <div className="text-orange text-center mt-4">
                    {errors.typeOfChronicIllness}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.doYouHaveAnyChronicIllness !== 'نعم'}
              >
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل المرض المزمن أو المشكلة الصحية المزمنة تؤثر على قدرتك على
                  الدراسة و العمل؟
                </p>
                <select
                  className="w-full p-1 pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doesChronicIllnessHinderYourStudyOrWork"
                  value={values.doesChronicIllnessHinderYourStudyOrWork}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>

                {errors.doesChronicIllnessHinderYourStudyOrWork &&
                touched.doesChronicIllnessHinderYourStudyOrWork ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doesChronicIllnessHinderYourStudyOrWork}
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

export default HealthStatusSurvey
