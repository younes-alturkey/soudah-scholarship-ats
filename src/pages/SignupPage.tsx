import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import AppBar from '../components/AppBar'
import {
  hideValidationError,
  registerUser,
  setIsSignUp,
  userLogin,
} from '../features/userSlice'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
const numRegex = /^[0-9]+$/

const PersonalInfoSchema = Yup.object().shape({
  email: Yup.string()
    .email('يجب أن يكون بريد صالح')
    .max(255)
    .required('البريد الإلكتروني إلزامي'),
  password: Yup.string()
    .min(8, 'يجب ان لا تقل كلمة المرور عن 8')
    .max(16, 'يجب ان لا تزيد كلمة المرور عن 16')
    .matches(passwordRegex, 'حرف صغير واحد على الأقل وحرف كبير ورمز واحد')
    .required('هذا الحقل إلزامي'),
  phoneNumber: Yup.string()
    .min(10, 'لا يقل عن ١٠ مثل 0568459847')
    .max(10, 'لا يزيد عن ١٠ مثل 0556987454')
    .required('هذا الحقل إلزامي')
    .matches(numRegex, 'يسمح فقط بالأرقام'),
})

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('يجب أن يكون بريد صالح')
    .max(255)
    .required('البريد الإلكتروني إلزامي'),
  password: Yup.string()
    .min(6, 'يجب ان لا تقل كلمة المرور عن 6')
    .max(16, 'يجب ان لا تزيد كلمة المرور عن 16')
    .matches(passwordRegex, 'حرف صغير واحد على الأقل وحرف كبير ورمز واحد')
    .required('هذا الحقل إلزامي'),
})

const SignupPage: FC = () => {
  const {
    user,
    isSignedIn,
    pending,
    errorMessage,
    validationError,
    showSignUp,
  } = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [pleaseConfirm, setPleaseConfirm] = useState(false)

  useEffect(() => {
    if (isSignedIn) navigate('/apply')

    document.title = showSignUp ? 'تسجيل الاشتراك' : 'تسجيل الدخول'
  })

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-12 pb-12">
      <AppBar />

      <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex-col justify-center items-center rounded-xl shadow-2xl px-2 py-6 md:p-14 bg-peak mt-10">
        <div className="text-2xl lg:text-3xl text-center mb-8 text-mist font-black">
          {showSignUp ? 'تسجيل الاشتراك' : 'تسجيل الدخول'}
        </div>
        <div
          className="mb-6 w-full text-center px-2 noselect transform duration-300 hover:-translate-y-1 cursor-pointer"
          onClick={() => dispatch(hideValidationError())}
        >
          {validationError && errorMessage ? (
            <div className="text-center text-sm md:text-lg bg-red text-white py-2 px-0 rounded w-full">
              {errorMessage && errorMessage.includes('400')
                ? showSignUp
                  ? 'هذا المستخدم مسجل مسبقًا'
                  : 'فشل تسجيل الدخول. هل فعلت البريد الإلكتروني؟'
                : errorMessage.includes('401')
                ? 'خطأ في كلمة المرور أو البريد الإلكتروني'
                : errorMessage.includes('404')
                ? 'هذا الإيميل غير مُسجل في النظام'
                : errorMessage.includes('500')
                ? 'خطأ من خادم البرنامج نرجو المحاولة لاحقاً'
                : errorMessage.includes('405') ||
                  errorMessage.includes('Network')
                ? 'تم رفض الوصول إلى الخادم'
                : errorMessage}
            </div>
          ) : null}

          {pleaseConfirm && !validationError ? (
            <div className="text-center text-xs md:text-lg bg-green text-rock py-2 px-1 rounded w-full my-1">
              الرجاء تفعيل حسابك من خلال الرابط المرسل إلى بريدك الإلكتروني
            </div>
          ) : null}
        </div>

        {showSignUp ? (
          <Formik
            initialValues={user}
            onSubmit={(values) => {
              setPleaseConfirm(true)
              dispatch(setIsSignUp(false))

              dispatch(hideValidationError())

              dispatch(
                registerUser({
                  email: values.email,
                  password: values.password,
                  phonwNumber: values.phoneNumber,
                })
              )
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full flex flex-col justify-center items-center gap-8 rounded p-2">
                <div className="w-full flex flex-col justify-center gap-4">
                  <Field
                    name="email"
                    placeholder="البريد الإلكتروني"
                    className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-orange text-base font-bold text-center">
                      {errors.email}
                    </div>
                  ) : null}

                  <Field
                    name="password"
                    type="password"
                    placeholder="كلمة المرور"
                    className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-orange text-base font-bold text-center">
                      {errors.password}
                    </div>
                  ) : null}

                  <Field
                    name="phoneNumber"
                    placeholder="رقم الجوال"
                    className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                  />
                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div className="text-orange text-base font-bold text-center">
                      {errors.phoneNumber}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={pending}
                    className={`text-xl font-bold flex justify-center items-center gap-2 ltr rounded ${
                      pending ? 'bg-mist' : 'bg-sky hover-rise cursor-pointer'
                    } text-rock p-3 pb-4`}
                  >
                    {pending ? 'جاري المعالجة' : 'تسجيل الاشتراك'}
                  </button>
                </div>
                <div className="w-full flex flex-col justify-center items-start gap-4 text-right rtl">
                  <div className="text-right text-xs md:text-lg bg-rock text-mist pt-3 pb-4 px-4 rounded w-full my-1 rtl">
                    <p className="text-mist font-bold text-base mb-2">
                      لتعيين كلمة مرور فعالة يشترط توفر ما يلي
                    </p>
                    <ul className="list-decimal list-inside text-right text-base text-mist leading-loose">
                      <li>أن تتكوّن كلمة المرور من 8 خانات</li>
                      <li>أن تكون كلمة المرور باللغة الإنجليزية</li>
                      <li>أن تحتوي على حرف واحد كبير على الأقل</li>
                      <li>أن تحتوي على حرف واحد صغير على الأقل</li>
                      <li>أن تحتوي على رقم واحد على الأقل</li>
                      <li>أن تحتوي على رمز واحد على الاقل</li>
                    </ul>
                  </div>
                  <div className="text-justify text-xs md:text-lg bg-rock text-mist pt-3 pb-4 px-4 rounded w-full my-1 rtl">
                    <p className="text-sm text-mist pt-3 pb-4 px-2 rounded w-full my-1 rtl">
                      لتفعيل الحساب، يرجى الضغط على زر "تفعيل الحساب" أسفل
                      الصفحة ثم الصغط على الرابط المرسل إلى بريدكم الإلكتروني.
                    </p>
                  </div>
                  <div className="text-justify text-xs md:text-lg bg-rock text-mist pt-3 pb-4 px-4 rounded w-full my-1 rtl">
                    <p className="text-sm text-mist pt-3 pb-4 px-2 rounded w-full my-1 rtl">
                      في حال عدم تلقيك رسالة التفعيل، يرجى التأكد من صحة عنوان
                      البريد الإلكتروني المسجل وتفقد صندوق الرسائل المزعجة
                      (Spam).
                    </p>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik
            initialValues={user}
            onSubmit={(values) => {
              dispatch(hideValidationError())
              setPleaseConfirm(false)
              setTimeout(
                () =>
                  dispatch(
                    userLogin({
                      email: values.email,
                      password: values.password,
                    })
                  ),
                100
              )
            }}
          >
            {({ errors, touched }) => (
              <Form className="w-full flex flex-col justify-center items-center gap-20 rounded p-2">
                <div className="w-full flex flex-col justify-center gap-4">
                  <Field
                    name="email"
                    placeholder=" البريد الإلكتروني"
                    className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-orange text-base font-bold text-center">
                      {errors.email}
                    </div>
                  ) : null}

                  <Field
                    type="password"
                    name="password"
                    placeholder="كلمة المرور"
                    className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                  />
                  {errors.password && touched.password ? (
                    <div className="text-orange text-base font-bold mb-4 text-center">
                      {errors.password}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className={`text-xl font-bold flex justify-center items-center gap-2 ltr rounded ${
                      pending ? 'bg-mist' : 'bg-sky hover-rise cursor-pointer'
                    } text-rock p-3 pb-4`}
                  >
                    {pending ? 'جاري المعالجة' : 'تسجيل الدخول'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div
        className="w-full rtl text-xl md:text-2xl text-center text-mist hover:text-sky noselect cursor-pointer mt-8"
        onClick={() => {
          dispatch(hideValidationError())
          setPleaseConfirm(false)
          dispatch(setIsSignUp(!showSignUp))
        }}
      >
        {showSignUp ? 'تسجيل الدخول؟' : 'تسجيل جديد؟'}
      </div>

      <div className="mt-8 w-full rtl text-base text-center text-mist noselect flex justify-center items-center gap-4">
        <p
          className="hover:text-sky cursor-pointer"
          onClick={() => navigate('/forgot')}
        >
          نسيت كلمة المرور
        </p>
        <p>|</p>
        <p
          className="hover:text-sky cursor-pointer"
          onClick={() => navigate('/activate')}
        >
          تفعيل الحساب
        </p>
        <p>|</p>
        <a
          className="hover:text-sky cursor-pointer"
          href="mailto:scholarship@soudah.sa"
        >
          المساعدة
        </a>
      </div>
    </div>
  )
}

export default SignupPage
