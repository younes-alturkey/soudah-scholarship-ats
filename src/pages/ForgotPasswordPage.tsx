import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FC, useState } from 'react'
import AppBar from '../components/AppBar'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { forgotPasswordReq, hideValidationError } from '../features/userSlice'
import { useNavigate } from 'react-router'

const ConfirmSchema = Yup.object().shape({
  email: Yup.string()
    .email('يجب أن يكون بريد صالح')
    .max(255)
    .required('البريد الإلكتروني إلزامي'),
})

const ConfirmEmailPage: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [notify, setNotify] = useState(false)
  const { pending } = useAppSelector((state) => state.user)
  return (
    <div className="flex flex-col items-center justify-center gap-4 pb-12">
      <AppBar />
      <div className="w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 flex-col justify-center items-center gap-2 text-center rounded-xl shadow-2xl p-6 py-14 bg-peak mt-10">
        <div className="text-2xl lg:text-3xl text-center mb-8 text-mist font-black">
          إعادة تعيين كلمة المرور
        </div>

        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={(values) => {
            dispatch(forgotPasswordReq(values.email))
            setNotify(true)
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center items-center gap-4 rounded p-2">
              {notify ? (
                <div className="text-center text-xs md:text-lg bg-green text-rock py-2 px-0 rounded w-full my-1">
                  إذا كنت مسجل في النظام فقد تم إرسال رسالة إلى بريدك الالكتروني
                </div>
              ) : null}

              <div
                className={`w-full ${
                  notify ? 'hidden' : 'flex'
                } flex-col justify-center gap-4`}
              >
                <Field
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className="rtl placeholder-peak text-xl p-3 w-full rounded border-2 focus:ring-rock border-rock bg-mist focus:outline-none focus:ring-2"
                />
                {errors.email && touched.email ? (
                  <div className="text-orange text-center">{errors.email}</div>
                ) : null}

                <button
                  type="submit"
                  className="text-xl font-bold flex justify-center items-center gap-2 ltr rounded noselect bg-sky text-rock p-3 pb-4 hover-rise cursor-pointer"
                >
                  {pending ? 'جاري الإرسال' : 'إعادة تعين كلمة المرور'}
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

export default ConfirmEmailPage
