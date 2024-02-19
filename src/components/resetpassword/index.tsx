"use client";
import React from 'react';
import { toast } from 'react-toastify'
import { useRouter } from "next/navigation";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { resetPassword } from '@/lib/api';
import Loader from '@/app/ui/loader';





const ResetPasswordForm = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit:async values => {
            
            try {
                const email = values.email;
                await resetPassword(email);
                toast.success("Check your email");
                router.push("/");
            } catch (error) {
                toast.error("Email not found");
                values.email = '';
            }
            
            },
        validationSchema: yup.object({
            email: yup.string().required("This field is required."),
        })
    });
    


return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-10 w-full">
        <div className="border-b border-gray-900/10 pb-8 w-full">
          <div className="flex items-center gap-x-6 flex-col mb-6">
            <h1 className="text-3xl font-semibold leading-7 text-gray-900 mb-4">Fidoo chat</h1>
            <p className="mt-1 text-2xl leading-6 text-gray-600">Reset Password</p>
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
          {!formik.isSubmitting && "Send"} 
          {formik.isSubmitting && <Loader />}
        </button>
      </div>
    </form>
  );

};

export default ResetPasswordForm;
