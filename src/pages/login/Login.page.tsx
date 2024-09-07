import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// import { login } from 'services/auth.service';

// type Props = {};

const Login: React.FC = () => {
   const navigate: NavigateFunction = useNavigate();

   const [loading, setLoading] = useState<boolean>(false);
   const [message, setMessage] = useState<string>('');

   const initialValues: {
      email: string;
      password: string;
   } = {
      email: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      email: Yup.string().required('This field is required!'),
      password: Yup.string().required('This field is required!'),
   });

   const handleLogin = (formValue: { email: string; password: string }) => {
      const { email, password } = formValue;

      setMessage('');
      setLoading(true);

      login(email, password).then(
         () => {
            navigate('/home');
            window.location.reload();
         },
         (error) => {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();

            setLoading(false);
            setMessage(resMessage);
         },
      );
   };

   return (
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
         <div className="w-full bg-white rounded-lg shadow light:border md:mt-6 sm:max-w-md mb-8">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
               <img
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                  className="profile-img-card"
               />
               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                  Sign in to your account
               </h1>
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleLogin}
               >
                  <Form className="space-y-4 md:space-y-6">
                     <div>
                        <label htmlFor="email">Email</label>
                        <Field
                           name="email"
                           type="email"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage name="email" component="div" className="alert alert-danger" />
                     </div>

                     <div>
                        <label htmlFor="password">Password</label>
                        <Field
                           name="password"
                           type="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <ErrorMessage
                           name="password"
                           component="div"
                           className="alert alert-danger"
                        />
                     </div>

                     <div>
                        <button
                           type="submit"
                           className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                           disabled={loading}
                        >
                           {loading && <span className="spinner-border spinner-border-sm"></span>}
                           Login
                        </button>
                     </div>

                     {message && (
                        <div>
                           <div className="alert alert-danger" role="alert">
                              {message}
                           </div>
                        </div>
                     )}
                  </Form>
               </Formik>
               <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{' '}
                  <a href="/register" className="text-blue-700 hover:underline dark:text-blue-500">
                     Create account
                  </a>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;