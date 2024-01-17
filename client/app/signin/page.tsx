/* eslint-disable jsx-a11y/anchor-is-valid */
// import { Checkbox, Label } from "flowbite-react";
"use client";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState, type FC } from "react";
import Login from "../assets/images/signup.jpg";
import useAuthStore from "../utils/auth";
import usePush from "../components/usePush";

const SignInPage: FC = function () {
  const [credentials, setCredentials] = useState<any>({
    email: "",
    password: "",
  });
  const googleSignIn = useAuthStore(
    (state: { googleSignIn: any }) => state.googleSignIn
  );
  const emailSignIn = useAuthStore(
    (state: { emailSignIn: any }) => state.emailSignIn
  );
  const isLoggedIn = useAuthStore(
    (state: { isLogedIn: any }) => state.isLogedIn
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials: any) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const push = usePush();

  useEffect(() => {
    if (isLoggedIn) {
      push("/complaint");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12 ">
      <div className="flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col md:flex-row w-full md:max-w-[1024px] [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block bg-white bg-opacity-65">
        <Image
          src={Login}
          className="h-70 rounded-t-lg object-cover px-8 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
          alt="login"
        />
        <div className="flex h-full flex-col justify-center gap-4 p-6">
          <h1 className="mb-3 text-center text-2xl font-bold dark:text-white md:text-3xl">
            Sign in to platform
          </h1>
          <form>
            <div className="mb-4 flex flex-col gap-y-3">
              <Input
                id="email"
                name="email"
                placeholder="name@company.com"
                type="email"
                label="Your email"
                variant="bordered"
                onChange={handleChange}
                value={credentials.email}
              />
            </div>
            <div className="mb-6 flex flex-col gap-y-3">
              <Input
                id="password"
                name="password"
                placeholder="••••••••"
                type="password"
                label="Your password"
                variant="bordered"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <Button
                color="primary"
                type="submit"
                className="w-full lg:w-auto"
                onClick={() => {
                  emailSignIn(credentials.email, credentials.password);
                }}
              >
                Login to your account
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a href="#" className="text-primary-600 dark:text-primary-300">
                Create account
              </a>
            </p>
          </form>
          <Button type="submit" className="w-full flex" onClick={googleSignIn}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="24px"
                height="24px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
            </div>
            Signin with google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
