"use client";
import React from "react";
import Icon from "../Icon";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import RjLogo from "../../assets/brand/logo.png";
const Navbar = () => {
  return (
    <div className="flex w-full bg-white text-black">
      <div className="w-full h-[10vh] bg-white">
        <div className="flex ml-[38vw] gap-36 my-3">
          <div className="flex flex-col">
            <div>
              <div className="flex gap-2">
                <div>
                  <Icon icon="phone" />
                </div>
                <div>Call Us</div>
              </div>
            </div>
            <div>(+91) 9876543210</div>
          </div>
          <div className="flex flex-col">
            <div>
              <div className="flex gap-2">
                <div>
                  <Icon icon="mail" />
                </div>
                <div>Call Us</div>
              </div>
            </div>
            <Link href={"mailto:sp.cybercrime@rajpolic.gov.in"}>
              sp.cybercrime@rajpolic.gov.in
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              className="w-52 text-lg font-semibold bg-primary-foreground text-white"
              color="primary"
            >
              Report a crime
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center w-[31vw] h-[15vh] absolute bg-white">
        <div className="flex justify-around items-center">
          <div className="flex">
            <Image src={RjLogo} height={80} alt="police-logo" />
          </div>
          <div className="text-2xl font-bold">Rajasthan Police Cyber Crime</div>
        </div>
      </div>
      <div className="w-[2vw] h-[17vh] left-[35vw] absolute origin-top-left rotate-[45deg] bg-white"></div>
    </div>
  );
};

export default Navbar;
