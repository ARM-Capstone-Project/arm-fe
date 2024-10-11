// ignore all ts errors in this file
// FIXME remove this once refactor is done
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import IUser from 'types/user.type';
import { register } from '../../services/auth.service';

const Register: React.FC = () => {
   const [successful, setSuccessful] = useState<boolean>(false);
   const [message, setMessage] = useState<string>('');

   const initialValues: IUser = {
      username: '',
      email: '',
      password: '',
   };

   const validationSchema = Yup.object().shape({
      username: Yup.string()
         .test(
            'len',
            'The username must be between 3 and 20 characters.',
            (val: string) => val && val.toString().length >= 3 && val.toString().length <= 20,
         )
         .required('This field is required!'),
      email: Yup.string().email('This is not a valid email.').required('This field is required!'),
      password: Yup.string()
         .test(
            'len',
            'The password must be between 6 and 40 characters.',
            (val: string) => val && val.toString().length >= 6 && val.toString().length <= 40,
         )
         .required('This field is required!'),
   });

   const handleRegister = (formValue: IUser) => {
      const { username, email, password } = formValue;

      register(username, email, password).then(
         (response) => {
            setMessage((response.data as { message: string }).message);
            setSuccessful(true);
         },
         (error) => {
            const resMessage =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();

            setMessage(resMessage);
            setSuccessful(false);
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
                  Register
               </h1>
               <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleRegister}
               >
                  <Form className="space-y-4 md:space-y-6">
                     {!successful && (
                        <div>
                           <div>
                              <label htmlFor="username"> Username </label>
                              <Field
                                 name="username"
                                 type="text"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="username"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>
                           <br/>
                           <div>
                              <label htmlFor="email"> Email </label>
                              <Field
                                 name="email"
                                 type="email"
                                 className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 light:bg-gray-700 light:border-gray-600 light:placeholder-gray-400 light:text-black light:focus:ring-blue-500 dark:focus:border-blue-500"
                              />
                              <ErrorMessage
                                 name="email"
                                 component="div"
                                 className="alert alert-danger"
                              />
                           </div>
                           <br/>
                           <div>
                              <label htmlFor="password"> Password </label>
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
                           <br />
                           <div>
                              <button
                                 type="submit"
                                 className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600
                                shadow-lg"
                              >
                                 Sign Up
                              </button>
                           </div>
                        </div>
                     )}

                     {message && (
                        <div>
                           <div
                              className={successful ? 'alert alert-success' : 'alert alert-danger'}
                              role="alert"
                           >
                              {message}
                           </div>
                        </div>
                     )}
                  </Form>
               </Formik>
               <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already registered?{' '}
                  <a href="/" className="text-blue-700 hover:underline dark:text-blue-500">
                     Login
                  </a>
               </div>
            </div>
            
         </div>
      </div>
   );
};
export default Register;
