"use client";
import React, { useEffect, useState, useCallback } from "react";
import Icon from "../Icon";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import RjLogo from "../../assets/brand/logo.png";
import useWindowSize from "../../hooks/useWindowSize";
import { usePathname } from "next/navigation";

const useMediaQuery = (width) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    if (media.addEventListener) {
      media.addEventListener("change", updateTarget);
    } else {
      // compatibility for browser that dont have addEventListener
      media.addListener(updateTarget);
    }
    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }
    if (media.removeEventListener) {
      return () => media.removeEventListener("change", updateTarget);
    } else {
      // compatibility for browser that dont have removeEventListener
      return () => media.removeListener(updateTarget);
    }
  }, []);

  return targetReached;
};

const Navbar = () => {
  const pathName = usePathname();
  const isBreakpoint = useMediaQuery(768);
  console.log("isBreakpoint", isBreakpoint);

  const [openHamburger, setOpenHamburger] = useState(false);
  if (isBreakpoint) {
    return (
      <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Flowbite
            </span>
          </a>
          <button
            onClick={() => setOpenHamburger(!openHamburger)}
            type="button"
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-hamburger"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full ${openHamburger ? "block" : "hidden"}`}
            id="navbar-hamburger"
          >
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <Link
                  href={"/"}
                  className={`block py-2 px-3 ${
                    pathName === "/"
                      ? "bg-primary text-white rounded"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={"/track-case"}
                  className={`block py-2 px-3 ${
                    pathName === "/track-case"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Track Case
                </Link>
              </li>
              <li>
                <Link
                  href={"/online-reporting"}
                  className={`block py-2 px-3 ${
                    pathName === "/online-reporting"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Report a crime
                </Link>
              </li>
              <li>
                <Link
                  href={"/check-fake-number"}
                  className={`block py-2 px-3 ${
                    pathName === "/check-fake-number"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Check Fake Number
                </Link>
              </li>
              <li>
                <Link
                  href="/check-fake-account"
                  className={`block py-2 px-3 ${
                    pathName === "/check-fake-account"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Check Fake Account
                </Link>
              </li>
              <li>
                <Link
                  href="/awareness-training"
                  className={`block py-2 px-3 ${
                    pathName === "/awareness-training"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  Awareness and Training
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className={`block py-2 px-3 ${
                    pathName === "/news"
                      ? "bg-primary text-white"
                      : "text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  }`}
                >
                  News
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <div className="flex w-full bg-white text-black">
      <div className="w-full h-[10vh] bg-white">
        <div className="flex ml-[38vw] gap-36 my-3">
          <div className="flex flex-col">
            <div>
              <div className="flex gap-2 items-center">
                <div>
                  <Icon icon="phone" />
                </div>
                <div>Call Us</div>
              </div>
            </div>
            <div className="underline decoration-primaryRed decoration-2 underline-offset-4">
              (+91) 9876543210
            </div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="flex gap-2 items-center">
                <div>
                  <Icon icon="mail" />
                </div>
                <div className="flex">Email us</div>
              </div>
            </div>
            <Link
              href={"mailto:sp.cybercrime@rajpolic.gov.in"}
              className="underline decoration-primaryRed decoration-2 underline-offset-4"
            >
              sp.cybercrime@rajpolic.gov.in
            </Link>
          </div>
          <div className="flex items-center">
            <Link href={"/online-reporting"}>
              <Button
                className="w-52 text-lg font-semibold bg-primary text-white"
                color="primary"
              >
                Report a crime
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex items-center w-[31vw] h-[15vh] absolute bg-white">
        <Link href={"/"}>
          <div className="flex justify-around items-center">
            <div className="flex">
              <Image src={RjLogo} height={80} alt="police-logo" />
            </div>
            <div className="text-2xl font-bold">
              Rajasthan Police Cyber Crime
            </div>
          </div>
        </Link>
      </div>
      <div className="w-[2vw] h-[17vh] left-[35vw] absolute origin-top-left rotate-[45deg] bg-white"></div>
    </div>
  );
};

export default Navbar;
