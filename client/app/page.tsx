"use client";
import Image from "next/image";
import HeroImage_1 from "./assets/images/hero.jpg";
import HeroImage_2 from "./assets/images/hero_1.jpg";
import HeroImage_3 from "./assets/images/hero_2.jpg";
import HeroImage_4 from "./assets/images/hero_3.jpeg";
import Icon from "./components/Icon";
import Marquee from "react-fast-marquee";
import AwarenessMarquee from "./components/Awareness";
import Logo from "./assets/brand/logo.png";
import PM from "./assets/images/pm.png";
import Chatbot from "./components/Chatbot";
import Heading from "./components/Heading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Alert from "./components/AlertMaqrquee";
import FAQComponent from "./components/FAQComponent";

const HeroImages = [HeroImage_1, HeroImage_2, HeroImage_3, HeroImage_4];

export default function Home() {
  return (
    <main>
      <div className="absolute z-20 w-full ">
        <Alert />
      </div>
      <div className="flex flex-col gap-6 md:gap-20">
        <div className="relative">
          <div className="flex absolute z-10 top-40 md:top-56 cursor-pointer right-4 md:right-8 hover:bg-white bg-black bg-opacity-25 p-2 md:p-4 rounded-full image-swiper-button-next ">
            <Icon icon="navright" width={30} />
          </div>
          <div className="flex absolute z-10 top-4 md:top-56 cursor-pointer left-4 md:left-8 hover:bg-white bg-black bg-opacity-25 p-2 md:p-4 rounded-full image-swiper-button-prev">
            <Icon icon="navleft" width={20}/>
          </div>
          <Swiper
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
            modules={[Navigation, Autoplay]}
            className="mySwiper w-full"
          >
            {HeroImages.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <Image
                    key={index}
                    className="object-fill w-full h-[80vh]"
                    src={image}
                    alt="hero"
                    loading="lazy"
                    width={1920}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div></div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 z-10 justify-center relative mt-4 md:mt-[-150px] bg-primary py-4 rounded-3xl">
  {/* <Link href={"/online-reporting"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full md:w-[15vw] h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white">
      <div>
        <Icon icon="report" width={130} />
      </div>
      <div className="text-2xl text-white">Report a crime.</div>
    </div>
  </Link>
  <Link href={"/track-case"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full md:w-[15vw] h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="location" width={130} />
      </div>
      <div className="text-2xl text-white flex justify-center">
        Track your case
      </div>
    </div>
  </Link>
  <Link href={"/awareness-training"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full md:w-[15vw] h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="outreach" width={130} />
      </div>
      <div className="text-2xl text-white flex justify-center text-center">
        Awareness and Training
      </div>
    </div>
  </Link>
  <Link href={"/news"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full md:w-[15vw] h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="news" width={130} />
      </div>
      <div className="text-2xl text-white">News</div>
    </div>
  </Link> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Link href={"/online-reporting"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white">
      <div>
        <Icon icon="report" width={130} />
      </div>
      <div className="text-2xl text-white">Report a crime.</div>
    </div>
  </Link>

  <Link href={"/track-case"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="location" width={130} />
      </div>
      <div className="text-2xl text-white flex justify-center">
        Track your case
      </div>
    </div>
  </Link>

  <Link href={"/awareness-training"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="outreach" width={130} />
      </div>
      <div className="text-2xl text-white flex justify-center text-center">
        Awareness and Training
      </div>
    </div>
  </Link>

  <Link href={"/news"} className="mb-4 md:mb-0">
    <div className="flex flex-col items-center justify-around w-full h-[30vh] md:h-[40vh] p-2 bg-primary rounded-3xl border-2 border-white cursor-pointer">
      <div>
        <Icon icon="news" width={130} />
      </div>
      <div className="text-2xl text-white">News</div>
    </div>
  </Link>
</div>

</div>
</div>

        <div className="flex flex-col gap-12">
          <Heading>Cybercrime Guidelines </Heading>
          <AwarenessMarquee />
        </div>
        <div className="flex flex-col bg-primary my-8">

{/* Image (hidden on mobile and tablet) */}
<div className="hidden md:flex">
  <Image src={PM} alt="PM" width={600} height={200} />
</div>

<div className="border-2 border-white rounded-3xl w-full md:w-[50vw] flex justify-center items-center mx-auto m-8">
  <figure className="max-w-screen-md mx-auto text-center">
    <div className="flex justify-center p-4">
      <Icon icon="quote" width={50} />
    </div>
    <blockquote>
      <div className="text-2xl italic font-medium text-white">
        {`Can we secure the world from a bloodless war? I'm talking
                about Cyber Security. India must take the lead in cyber
                security through innovation.`}
      </div>
    </blockquote>
    <figcaption className="flex items-center justify-center mt-6 space-x-3">
      <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
        <cite className="pe-3 font-medium text-white">
          Shri Narendra Modi
        </cite>
        <cite className="ps-3 text-sm text-gray-50">
          Honorable Prime Minister
        </cite>
      </div>
    </figcaption>
  </figure>
</div>

{/* Image (visible only on mobile and tablet) */}
<div className="md:hidden">
  <Image src={PM} alt="PM" width={600} height={200} />
</div>

</div>

        <div>
          <FAQComponent />
        </div>
        <div className="fixed bottom-[20px] right-[20px] z-20">
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
