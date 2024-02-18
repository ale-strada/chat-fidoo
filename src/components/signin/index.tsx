"use client";
import React from 'react';
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { saveToken, saveUser, signIn } from '@/lib/api';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from '../../lib/hooks';




const SignInForm = () => {
  const router = useRouter();
  const [ , setCurrentUser] = useRecoilState(currentUserAtom);
  const formik = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    onSubmit:async values => {
        
        const authData = {
            email: values.email,
            password: values.password
        }
        try {
          const user = await signIn(authData);
          
          saveToken(user.userToken);
          saveUser(user);
          setCurrentUser(user);
          toast.success("User logged in correctly");
          router.push('/chat');
          
        } catch (error) {
          values.password = '';
          values.email = '';
          toast.error("user or password incorrect");
        }
        
        },
    validationSchema: yup.object({
   
        email: yup.string().required("This field is required."),
        password: yup.string().required("This field is required.").min(6, "The password must be at least 6 characters."),
    })
});



return (
  <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md">
    <div className="space-y-10 w-full">
      <div className="border-b border-gray-900/10 pb-8 w-full">
        <div className="flex items-center gap-x-6 flex-col mb-6">
          <h1 className="text-3xl font-semibold leading-7 text-gray-900 mb-4">Fidoo chat</h1>
          <p className="mt-1 text-2xl leading-6 text-gray-600">Login</p>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
          <div className="mt-2">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              autoComplete='email'
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm ">{formik.errors.email}</div>
        ) : null}
        </div>
        

        <div className="mb-3">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              autoComplete="password"
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm ">{formik.errors.password}</div>
        ) : null}
        </div>
        <div >
          <a href="/signUp" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 mr-2">Create a new account</a>
          <br />
          <a href="/resetPassword" className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Forgot password?</a>
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-end gap-x-6">
      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
        Cancel
      </button>
      <button
        disabled={formik.isSubmitting}
        type="submit"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Login
      </button>
    </div>
  </form>
);

};

export default SignInForm;
