import { Field, Form, Formik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'
import AppBar from '../components/AppBar'
import { useDispatch } from 'react-redux'
import { hideValidationError, newPasswordReq } from '../features/userSlice'
import { useAppSelector, useQuery } from '../app/hooks'
import { useNavigate } from 'react-router'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

const NewPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'يجب ان لا تقل كلمة المرور عن 6')
    .max(16, 'يجب ان لا تزيد كلمة المرور عن 16')
    .matches(passwordRegex, 'حرف صغير واحد على الأقل وحرف كبير ورمز واحد')
    .required('هذا الحقل إلزامي'),

  repeatPassword: Yup.string()
    .min(6, 'يجب ان لا تقل كلمة المرور عن 6')
    .max(16, 'يجب ان لا تزيد كلمة المرور عن 16')
    .matches(passwordRegex, 'حرف صغير واحد على الأقل وحرف كبير ورمز واحد')
    .required('هذا الحقل إلزامي')
    .test('passwords-match', 'كلمات السر ليست متطابقة', function (value) {
      return this.parent.newPassword === value
    }),
})

const NewPasswordPage: FC = () => {
  let query = useQuery()

  const email = query.get('email')
  const token = query.get('token')

  const { passwordReset, pending } = useAppSelector((state) => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center gap-12 pb-12">
      <AppBar />
      <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex-col justify-center items-center rounded-xl shadow-2xl p-6 pb-8 md:p-14 md:pb-14 bg-peak mt-10">
        <div className="text-2xl lg:text-3xl text-center mb-8 text-mist font-black">
          إعادة تعيين كلمة المرور
        </div>
        <Formik
          initialValues={{
            newPassword: '',
            repeatPassword: '',
          }}
          onSubmit={(values) => {
            dispatch(
              newPasswordReq({
                email: email,
                newPassword: values.newPassword,
                token: token,
              })
            )
          }}
        >
          {({ errors, touched }) => (
            <Form
              className={`w-full flex flex-col justify-center items-center gap-4 rounded p-2`}
            >
              {passwordReset ? (
                <div className="text-center text-xs md:text-lg bg-green text-rock py-2 px-0 rounded w-full my-1">
                  تم إعادة تعيين كلمة المرور بنجاح
                </div>
              ) : null}
              <div
                className={`${
                  passwordReset ? 'hidden' : 'flex'
                } w-full flex flex-col justify-center gap-6`}
              >
                <Field
                  name="newPassword"
                  type="password"
                  placeholder="كلمة المرور الجديدة"
                  className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                />
                {errors.newPassword && touched.newPassword ? (
                  <div className="text-orange text-center">
                    {errors.newPassword}
                  </div>
                ) : null}

                <Field
                  name="repeatPassword"
                  type="password"
                  placeholder="إعادة كلمة المرور الجديدة"
                  className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                />
                {errors.repeatPassword && touched.repeatPassword ? (
                  <div className="text-orange text-center">
                    {errors.repeatPassword}
                  </div>
                ) : null}

                <button
                  type="submit"
                  className="text-xl font-bold flex justify-center items-center gap-2 ltr rounded bg-sky text-rock p-2 hover-rise cursor-pointer"
                >
                  {pending ? 'جاري الإرسال' : 'إعادة تعيين كلمة المرور'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <p
        className="hover:text-sky text-xl text-mist cursor-pointer mt-12"
        onClick={() => {
          dispatch(hideValidationError())
          navigate('/login')
        }}
      >
        تسجيل الدخول؟
      </p>
    </div>
  )
}

export default NewPasswordPage
