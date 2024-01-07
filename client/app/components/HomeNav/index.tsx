"use client";
import React from "react";
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
const HomeNav = () => {
  const pathname = usePathname();
  return (
    <div className="flex  h-[10vh]  bg-primary-foreground">
      <div className="flex ml-[38vw] gap-10">
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
          <Dropdown
            classNames={{
              trigger: "bg-primary-foreground",
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
                <Link href="/services">
                  <div className="flex items-center cursor-pointer text-md">
                    Services
                  </div>
                </Link>
              </DropdownItem>
              <DropdownItem color="primary">
                <Link href="/services">
                  <div className="flex items-center cursor-pointer text-md">
                    Services
                  </div>
                </Link>
              </DropdownItem>
              <DropdownItem color="primary">
                <Link href="/services">
                  <div className="flex items-center cursor-pointer text-md">
                    Services
                  </div>
                </Link>
              </DropdownItem>
              <DropdownItem color="primary">
                <Link href="/services">
                  <div className="flex items-center cursor-pointer text-md">
                    Services
                  </div>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
            <Link href="/about" className={`flex items-center`}>
              <div>
                <Icon icon="instagram" width={30} />
              </div>
            </Link>
          </div>
          <div>
            <Link href="/about" className={`flex items-center`}>
              <div>
                <Icon icon="whatsapp" width={30} />
              </div>
            </Link>
          </div>
          <div>
            <Link href="/about" className={`flex items-center`}>
              <div>
                <Icon icon="twitter" width={30} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNav;
