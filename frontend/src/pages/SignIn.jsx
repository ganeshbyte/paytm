import React, { useEffect } from "react";
import Input from "../component/ngx/controls/Input";
import Button from "../component/Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { mapToSigninPayload } from "../component/ngx/payload/signin.payload";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastAtom } from "../store/toast.atom";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const setToast = useSetRecoilState(toastAtom);

  async function handleSignIn(formData) {
    const signinPayload = mapToSigninPayload(formData);

    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signin",
      signinPayload,
      {
        method: "POST",
      }
    );
    setToast("Sign Up Successful");
    setTimeout(() => {
      setToast(null);
    }, 2000);

    //navigate to dashboard after signup
    navigate("/dashboard");
  }

  const onSubmitHandler = (formData) => {
    handleSignIn(formData);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={"Email"}
                autoComplete="email"
                required={true}
                register={register}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={"Password"}
                autoComplete="current-password"
                required={true}
                register={register}
              />
            </div>
          </div>
          <div>
            <Button type="submit" label="Sign in"></Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not have an Account?
          <a
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            signup
          </a>
        </p>
      </div>
    </div>
  );
}
