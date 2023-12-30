"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import Link from "next/link";

export const Cards = () => {
  return (
    <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
      <Card className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden transition-transform transform hover:scale-105">
        <Link
          href="/report"
          className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-center">
            <h4 className="text-blue-500 font-bold text-lg font-sans border border-white p-2 bg-blue-200">
              Report a crime
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="police_writing_report.jpeg"
          />
        </Link>
      </Card>

      <Card className="col-span-12 sm:col-span-4 h-[300px] transition-transform transform hover:scale-105">
        <Link
          href="#"
          className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-start">
            <h4 className="text-blue-500 font-bold text-lg font-sans border border-white p-2 bg-blue-200">
              Check application status
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="check_status.jpeg"
          />
        </Link>
      </Card>

      <Card className="col-span-12 sm:col-span-4 h-[300px] transition-transform transform hover:scale-105">
        <Link
          href="#"
          className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-center">
            <h4 className="text-blue-500 font-bold text-lg font-sans border border-white p-2 bg-blue-200">
              Awareness and Training
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card background"
            className="z-0 w-full h-full object-cover"
            src="awareness_training.jpeg"
          />
        </Link>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5 transition-transform transform hover:scale-105"
      >
        <Link
          href="#"
          className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-center">
            <h4 className="text-blue-500 font-bold text-lg font-sans border border-white p-2 bg-blue-200">
              Latest News
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Card example background"
            className="z-0 w-full h-full scale-125  object-cover"
            src="news.jpeg"
          />
        </Link>
      </Card>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-7 transition-transform transform hover:scale-105"
      >
        <Link
          href="#"
          className="col-span-12 sm:col-span-4 h-[300px] overflow-hidden"
        >
          <CardHeader className="absolute z-10 top-1 flex-col !items-center">
            <h4 className="text-blue-500 font-bold text-lg font-sans border border-white p-2 bg-blue-200">
              Locate Nearest Cyber Police Station
            </h4>
          </CardHeader>
          <Image
            removeWrapper
            alt="Relaxing app background"
            className="z-0 w-full h-full object-cover"
            src="police_station.jpeg"
          />
        </Link>
      </Card>
    </div>
  );
};
