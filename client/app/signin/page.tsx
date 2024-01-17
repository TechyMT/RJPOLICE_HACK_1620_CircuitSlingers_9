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
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="flex rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col md:flex-row w-full md:max-w-[1024px] [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block">
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
          <Button type="submit" className="w-full" onClick={googleSignIn}>
            Signin with google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
