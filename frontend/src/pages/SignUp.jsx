import Input from "../component/ngx/controls/Input";
import { useForm } from "react-hook-form";
import mapToSignupPayload from "../component/ngx/payload/signup.payload";
import Button from "../component/Button";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toastAtom } from "../store/toast.atom";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const { register, handleSubmit } = useForm();
  const setToast = useSetRecoilState(toastAtom);

  const navigate = useNavigate();

  async function handleSignUp(formData) {
    const signupPayload = mapToSignupPayload(formData);
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      signupPayload,
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

    console.log(response);
  }

  const onSubmitHandler = (formData) => {
    console.log(formData);

    handleSignUp(formData);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First Name
            </label>
            <div className="mt-2">
              <Input
                id="firstname"
                name="firstname"
                type="firstname"
                required={true}
                placeholder={"First Name"}
                register={register}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last Name
            </label>
            <div className="mt-2">
              <Input
                id="lastname"
                name="lastname"
                type="lastname"
                required={true}
                placeholder={"Last Name"}
                register={register}
              />
            </div>
          </div>
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
                required={true}
                placeholder={"Email"}
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
            </div>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                required={true}
                placeholder={"Password"}
                register={register}
              />
            </div>
          </div>

          <div>
            <Button type="submit" label="Sign up"></Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an Account?
          <a
            href="/signin"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            signin
          </a>
        </p>
      </div>
    </div>
  );
}
