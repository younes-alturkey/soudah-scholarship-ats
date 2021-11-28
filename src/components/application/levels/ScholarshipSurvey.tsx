import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import {
  setApplicationProgress,
  setScholarShipSurvey,
} from '../../../features/applicationSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import ApplicationLevelsNavigationButton from '../../ApplicationLevelsNavigationButton'
const positiveNumberRegex = /^([1-9][0-9]{0,9})$/
const ScholarshipSurveyInfoSchema = Yup.object().shape({
  residentOfSoudah: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  livingInSoudah: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  yearsOfLivingInSoudah: Yup.string().when('livingInSoudah', {
    is: 'نعم',
    then: Yup.string()
      .required('هذا الحقل إلزامي')
      .min(1, 'هذا الحقل إلزامي')
      .matches(positiveNumberRegex, 'الرقم المدخل غير صحيح'),
  }),
  haveVolunteeredBefore: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  volunteeringExp: Yup.string().when('haveVolunteeredBefore', {
    is: 'نعم',
    then: Yup.string().required('هذا الحقل إلزامي').min(2, 'هذا الحقل إلزامي'),
  }),
  willingToStudyAbroadFrom2To5Yrs: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  willingToStudyEnglishFor6Mos: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  willingToCommitInPrepartoryPhase: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  willingToBePunctual: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  backgroundInTourismAndHospitality: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(150, 'يجب أن لا يقل عن ١٥٠ حرف'),
  willingToWorkInTourismAndHospitality: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  willingToWorkInMixedEnv: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  hinderableBySoicalCommitments: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(2, 'هذا الحقل إلزامي'),
  hinderingSoicalCommitments: Yup.string(),
  doYouConsiderYourselfAmbitiousAndWhy: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(150, 'يجب أن لا يقل عن ١٥٠ حرف'),
  whyDoThinkYoureQualified: Yup.string()
    .required('هذا الحقل إلزامي')
    .min(150, 'يجب أن لا يقل عن ١٥٠ حرف'),
})

const ScholarshipSurvey: FC = () => {
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
          initialValues={formData.scholarshipSurvey}
          onSubmit={(values) => {
            dispatch(setScholarShipSurvey(values))
            dispatch(setApplicationProgress(nextLevel))
          }}
        >
          {({ errors, touched, values, handleBlur, handleChange }) => (
            <Form className="w-full flex flex-col items-center gap-10 justify-center px-2">
              <div className="w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل أنت من أهل منطقة السودة أو رجال ألمع؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="residentOfSoudah"
                  value={values.residentOfSoudah}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                {errors.residentOfSoudah && touched.residentOfSoudah ? (
                  <div className="text-orange text-center mt-4">
                    {errors.residentOfSoudah}
                  </div>
                ) : null}
              </div>
              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل يقع مقر سكنك الحالي في السودة أو رجال ألمع؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="livingInSoudah"
                  value={values.livingInSoudah}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                {errors.livingInSoudah && touched.livingInSoudah ? (
                  <div className="text-orange text-center mt-4">
                    {errors.livingInSoudah}
                  </div>
                ) : null}
              </div>
              <div
                className="relative w-full"
                hidden={values.livingInSoudah !== 'نعم'}
              >
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  كم عدد سنوات إقامتك في السودة أو رجال ألمع حتى الآن؟
                </p>
                <Field
                  name="yearsOfLivingInSoudah"
                  placeholder="الجواب"
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                />
                {errors.yearsOfLivingInSoudah &&
                touched.yearsOfLivingInSoudah ? (
                  <div className="text-orange text-center mt-4">
                    {errors.yearsOfLivingInSoudah}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل سبق لك المشاركة في أي أنشطة تطوعية أو اجتماعية أو ثقافية؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="haveVolunteeredBefore"
                  value={values.haveVolunteeredBefore}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                {errors.haveVolunteeredBefore &&
                touched.haveVolunteeredBefore ? (
                  <div className="text-orange text-center mt-4">
                    {errors.haveVolunteeredBefore}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.haveVolunteeredBefore !== 'نعم'}
              >
                <textarea
                  placeholder="ما هي الأنشطة التي تم المشاركة فيها؟"
                  maxLength={500}
                  className="h-32 w-full p-1 pr-4 pt-4 placeholder-peak pb-2 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="volunteeringExp"
                  value={values.volunteeringExp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>

                {errors.volunteeringExp && touched.volunteeringExp ? (
                  <div className="text-orange text-center mt-4">
                    {errors.volunteeringExp}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك إمكانية للسفر والدراسة خارج المملكة لفترات طويلة
                  تتراوح بين سنتين إلى أربع سنوات؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToStudyAbroadFrom2To5Yrs"
                  value={values.willingToStudyAbroadFrom2To5Yrs}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="ممكن">ممكن</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا يمكن">لا يمكن</option>
                </select>
                {errors.willingToStudyAbroadFrom2To5Yrs &&
                touched.willingToStudyAbroadFrom2To5Yrs ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToStudyAbroadFrom2To5Yrs}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك الاستعداد والإلتزام لتطوير لغتك الإنجليزية في مرحلة
                  اللغة لمدة قد تصل إلى ستة أشهر لتحقيق المستوى المطلوب من
                  الجامعة؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToStudyEnglishFor6Mos"
                  value={values.willingToStudyEnglishFor6Mos}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا يمكن">لا يمكن</option>
                </select>

                {errors.willingToStudyEnglishFor6Mos &&
                touched.willingToStudyEnglishFor6Mos ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToStudyEnglishFor6Mos}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  إذا تم ترشيحك للبرنامج، هل تؤكد إلتزامك بالحضور في المرحلة
                  التحضيرية كاملة؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToCommitInPrepartoryPhase"
                  value={values.willingToCommitInPrepartoryPhase}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا يمكن">لا يمكن</option>
                </select>
                {errors.willingToCommitInPrepartoryPhase &&
                touched.willingToCommitInPrepartoryPhase ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToCommitInPrepartoryPhase}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  إذا تم ترشيحك للبرنامج، هل تؤكد إلتزامك بمواعيد الدوام؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToBePunctual"
                  value={values.willingToBePunctual}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا يمكن">لا يمكن</option>
                </select>
                {errors.willingToBePunctual && touched.willingToBePunctual ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToBePunctual}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  ماذا تعرف عن الوظائف والعمل في قطاع السياحة والضيافة وفنون
                  الطهي؟
                </p>
                <textarea
                  placeholder="يمكنك الإجابة باللغة العربية أو الإنجليزية"
                  maxLength={500}
                  className="h-32 w-full p-5 placeholder-peak text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="backgroundInTourismAndHospitality"
                  value={values.backgroundInTourismAndHospitality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.backgroundInTourismAndHospitality &&
                touched.backgroundInTourismAndHospitality ? (
                  <div className="text-orange text-center mt-4">
                    {errors.backgroundInTourismAndHospitality}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك القابلية للعمل في قطاع السياحة والضيافة وفنون الطهي؟
                  (مثال: فندق، منتجع سياحي أم مطعم)
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToWorkInTourismAndHospitality"
                  value={values.willingToWorkInTourismAndHospitality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="أقبل">أقبل</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا أقبل">لا أقبل</option>
                </select>
                {errors.willingToWorkInTourismAndHospitality &&
                touched.willingToWorkInTourismAndHospitality ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToWorkInTourismAndHospitality}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك القابلية للدراسة والعمل في بيئة مختلطة؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="willingToWorkInMixedEnv"
                  value={values.willingToWorkInMixedEnv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="أقبل">أقبل</option>
                  <option value="إلى حد ما">إلى حد ما</option>
                  <option value="لا أقبل">لا أقبل</option>
                </select>
                {errors.willingToWorkInMixedEnv &&
                touched.willingToWorkInMixedEnv ? (
                  <div className="text-orange text-center mt-4">
                    {errors.willingToWorkInMixedEnv}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل لديك مسؤوليات عائلية أو اجتماعية قد تمنعك من السفرأو قد
                  تؤثر على التزامك بالابتعاث؟
                </p>
                <select
                  className="w-full p-1 placeholder-peak pb-2 pr-12 text-xl bg-mist cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="hinderableBySoicalCommitments"
                  value={values.hinderableBySoicalCommitments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">الجواب</option>
                  <option value="نعم">نعم</option>
                  <option value="لا">لا</option>
                </select>
                {errors.hinderableBySoicalCommitments &&
                touched.hinderableBySoicalCommitments ? (
                  <div className="text-orange text-center mt-4">
                    {errors.hinderableBySoicalCommitments}
                  </div>
                ) : null}
              </div>

              <div
                className="relative w-full"
                hidden={values.hinderableBySoicalCommitments !== 'نعم'}
              >
                <textarea
                  maxLength={500}
                  placeholder="الرجاء تحديد المسؤوليات التي قد تمنعك أو قد تؤثر على التزامك
                  بالابتعاث"
                  className="h-32 w-full placeholder-peak p-5 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="hinderingSoicalCommitments"
                  value={values.hinderingSoicalCommitments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>

                {errors.hinderingSoicalCommitments &&
                touched.hinderingSoicalCommitments ? (
                  <div className="text-orange text-center mt-4">
                    {errors.hinderingSoicalCommitments}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  هل تعتبر نفسك شخص طموح ولماذا؟
                </p>
                <textarea
                  maxLength={500}
                  className="h-32 w-full placeholder-peak p-5 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="doYouConsiderYourselfAmbitiousAndWhy"
                  placeholder="يمكنك الإجابة باللغة العربية أو الإنجليزية"
                  value={values.doYouConsiderYourselfAmbitiousAndWhy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>

                {errors.doYouConsiderYourselfAmbitiousAndWhy &&
                touched.doYouConsiderYourselfAmbitiousAndWhy ? (
                  <div className="text-orange text-center mt-4">
                    {errors.doYouConsiderYourselfAmbitiousAndWhy}
                  </div>
                ) : null}
              </div>

              <div className="relative w-full">
                <p className="px-3 text-mist text-justify text-lg mb-6">
                  لماذا تعتبر نفسك مرشح مناسب؟
                </p>
                <textarea
                  maxLength={500}
                  className="h-32 w-full placeholder-peak p-5 text-xl bg-mist rounded focus:outline-none focus:ring-2 focus:ring-rock border-rock border"
                  name="whyDoThinkYoureQualified"
                  value={values.whyDoThinkYoureQualified}
                  placeholder="يمكنك الإجابة باللغة العربية أو الإنجليزية"
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>

                {errors.whyDoThinkYoureQualified &&
                touched.whyDoThinkYoureQualified ? (
                  <div className="text-orange text-center mt-4">
                    {errors.whyDoThinkYoureQualified}
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

export default ScholarshipSurvey
