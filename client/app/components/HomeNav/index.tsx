"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import Icon from "../Icon";

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
const HomeNav = () => {
  const isBreakpoint = useMediaQuery(768);
  const pathname = usePathname();
  if (!isBreakpoint) {
    return (
      <div className="flex h-[10vh]  bg-primary">
        <div className="flex ml-[34vw] w-full justify-around">
          <div className="flex">
            <Link
              href="/"
              className={`flex items-center font-semibold ${
                pathname === "/"
                  ? "underline underline-offset-8 decoration-red-500 decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg">
                Home
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/track-case"
              className={`flex items-center font-semibold ${
                pathname === "/track-case"
                  ? "underline underline-offset-8 decoration-red-500 decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg">
                Track Case
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <Dropdown
              classNames={{
                trigger: "bg-primary p-0",
              }}
            >
              <DropdownTrigger>
                <Button
                  className="flex items-center text-white font-semibold cursor-pointer text-lg"
                  endContent={<Icon icon="dropdown" />}
                >
                  Services
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem color="primary">
                  <Link href="/awareness-training">
                    <div className="flex items-center cursor-pointer text-md">
                      Awareness and training
                    </div>
                  </Link>
                </DropdownItem>
                <DropdownItem color="primary">
                  <Link href="/news">
                    <div className="flex items-center cursor-pointer text-md">
                      Latest News
                    </div>
                  </Link>
                </DropdownItem>
                {/* <DropdownItem color="primary">
                <Link href="/services">
                  <div className="flex items-center cursor-pointer text-md">
                    Services
                  </div>
                </Link>
              </DropdownItem> */}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex">
            <Link
              href="/checkfakenumber"
              className={`flex items-center ${
                pathname === "/checkfakenumber"
                  ? "underline underline-offset-8 decoration-primaryRed decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                Check fake number
              </div>
            </Link>
          </div>
          <div className="flex">
            <Link
              href="/checkfakeaccount"
              className={`flex items-center ${
                pathname === "/checkfakeaccount"
                  ? "underline underline-offset-8 decoration-red-500 decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                Check fake account
              </div>
            </Link>
          </div>
          <div className="flex">
            <Link
              href="/report-mail"
              className={`flex items-center ${
                pathname === "/report-mail"
                  ? "underline underline-offset-8 decoration-red-500 decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                Report Mail
              </div>
            </Link>
          </div>
          <div className="flex">
            <Link
              href="/about"
              className={`flex items-center ${
                pathname === "/about"
                  ? "underline underline-offset-8 decoration-red-500 decoration-4"
                  : ""
              }`}
            >
              <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                About
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <Link
                href="/check-fake-number"
                className={`flex items-center ${
                  pathname === "/checkfakenumber"
                    ? "underline underline-offset-8 decoration-primaryRed decoration-4"
                    : ""
                }`}
              >
                <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                  Check fake number
                </div>
              </Link>
            </div>
            <div className="flex">
              <Link
                href="/check-fake-account"
                className={`flex items-center ${
                  pathname === "/checkfakeaccount"
                    ? "underline underline-offset-8 decoration-red-500 decoration-4"
                    : ""
                }`}
              >
                <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                  Check fake account
                </div>
              </Link>
            </div>
            <div className="flex">
              <Link
                href="/about"
                className={`flex items-center ${
                  pathname === "/about"
                    ? "underline underline-offset-8 decoration-red-500 decoration-4"
                    : ""
                }`}
              >
                <div className="flex items-center text-white cursor-pointer text-lg font-semibold">
                  About
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Link
                  href="https://www.instagram.com/PoliceRajasthan/ "
                  target="_blank"
                  className={`flex items-center`}
                >
                  <div>
                    <Icon icon="instagram" width={30} />
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="https://www.facebook.com/PoliceRajasthan/?locale=hi_IN"
                  target="_blank"
                  className={`flex items-center`}
                >
                  <div>
                    <Icon icon="facebook" width={30} />
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href="https://twitter.com/PoliceRajasthan?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  target="_blank"
                  className={`flex items-center`}
                >
                  <div>
                    <Icon icon="twitter" width={30} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HomeNav;
