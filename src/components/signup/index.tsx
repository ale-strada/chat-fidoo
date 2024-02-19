"use client";
import React from 'react';
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { saveToken, saveUser, signUp } from '@/lib/api';
import { useRecoilState } from 'recoil';
import { currentUserAtom } from '../../lib/hooks';
import { toast } from 'react-toastify'
import Loader from '@/app/ui/loader';




const SignUpForm = () => {
  const [ , setCurrentUser] = useRecoilState(currentUserAtom);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit:async values => {
            
            const authData = {
                name: values.name,
                email: values.email,
                password: values.password
            }
      
            try {

                const user = await signUp(authData);
                saveToken(user.userToken);
                saveUser(user);
                setCurrentUser(user);
                toast.success("User created correctly");
                router.push('/chat');
            } catch (error) {
                values.password = '';
                values.email = '';
                values.name = '';
                toast.error("User already exists");
            }
            
            },
        validationSchema: yup.object({
            name: yup.string().required("This field is required."),
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
            <p className="mt-1 text-2xl leading-6 text-gray-600">Create Account</p>
          </div>
  
          <div className="mb-3">
            <label htmlFor="name" className="w-full block text-sm font-medium leading-6 text-gray-900">
              Full name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                autoComplete="given-name"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm ">{formik.errors.name}</div>
            ): null}
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
                autoComplete="email"
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm ">{formik.errors.email}</div>
            ): null}
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
            ): null}
          </div>
        </div>
      </div>
  
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button 
        disabled={formik.isSubmitting} 
        onClick={() => router.push("/")} 
        type="button" 
        className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          disabled={formik.isSubmitting}
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {formik.isSubmitting ? <Loader /> : "Sign up"}
        </button>
      </div>
    </form>
  );
  

};

export default SignUpForm;
