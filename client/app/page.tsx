"use client";
import Image from "next/image";
import "lottie-react";
import Lottie from "lottie-react";
import HeroImage_1 from "./assets/images/hero.jpg";
import HeroImage_2 from "./assets/images/hero_1.jpg";
import HeroImage_3 from "./assets/images/hero_2.jpg";
import HeroImage_4 from "./assets/images/hero_3.jpeg";
import HeroImage_5 from "./assets/images/banner.png";
import HeroImage_6 from "./assets/images/banner_1.png";
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
import Alert from "./components/AlertMarquee";
import FAQComponent from "./components/FAQComponent";
import HomeLottie from "./components/HomeLottie";
import HomeBg from "./assets/images/home.png";
import BannerRop from "./assets/images/bannerop.png";
import AudioPlayer from "./components/VoicePlayer";
const HeroImages = [
  HeroImage_1,
  HeroImage_6,
  HeroImage_2,
  HeroImage_3,
  HeroImage_4,
  HeroImage_5,
];

export default function Home() {
  return (
    <main>
      <HomeLottie />
      <div className="absolute z-20 w-full">
        <Alert />
      </div>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col w-full relative">
          <div className="flex absolute z-10 top-56 cursor-pointer right-4 hover:bg-white bg-black bg-opacity-25 md:p-4 rounded-full image-swiper-button-next ">
            <Icon icon="navright" width={30} />
          </div>
          <div className="flex absolute z-10 top-56 cursor-pointer left-4 hover:bg-white bg-black bg-opacity-25 md:p-4 rounded-full image-swiper-button-prev">
            <Icon icon="navleft" width={30} />
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
                    className="object-fill w-full md:h-[80vh] h-[60vh]"
                    src={image}
                    alt="hero"
                    loading="lazy"
                    width={1920}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="flex flex-col md:flex-row gap-20 items-center md:justify-evenly z-10 relative mt-[10px] rounded-3xl mx-16 md:mx-8 bg-primary py-4">
            <Link href={"/online-reporting"}>
              <div className="flex flex-col items-center justify-around w-[50vw] md:w-[15vw] md:h-[40vh] h-[30vh] p-2 bg-primary rounded-3xl border-2 border-white">
                <div>
                  <Icon icon="report" className="md:w-[130px] w-[70px]" />
                  {/* <Lottie
                    animationData={ReportAnimation}
                    
                  style={{width:130,height:130}}/> */}
                </div>
                <div className="md:text-2xl text-xl text-white">
                  Report a crime.
                </div>
              </div>
            </Link>
            <Link href={"/track-case"}>
              <div className="flex flex-col items-center justify-around w-[50vw] md:w-[15vw] md:h-[40vh] h-[30vh] p-2 bg-primary rounded-3xl border-2 border-white">
                <div>
                  <Icon icon="location" className="md:w-[130px] w-[70px]" />
                </div>
                <div className="md:text-2xl text-xl text-white flex justify-center">
                  Track your case
                </div>
              </div>
            </Link>
            <Link href={"/awareness-training"}>
              <div className="flex flex-col items-center justify-around w-[50vw] md:w-[15vw] md:h-[40vh] h-[30vh] p-2 bg-primary rounded-3xl border-2 border-white">
                <div>
                  <Icon icon="outreach" className="md:w-[130px] w-[70px]" />
                </div>
                <div className="md:text-2xl text-xl text-white flex justify-center text-center">
                  Awareness and Training
                </div>
              </div>
            </Link>
            <Link href={"/news"}>
              <div className="flex flex-col items-center justify-around w-[50vw] md:w-[15vw] md:h-[40vh] h-[30vh] p-2 bg-primary rounded-3xl border-2 border-white">
                <div>
                  <Icon icon="news" className="md:w-[130px] w-[70px]" />
                </div>
                <div className="md:text-2xl text-xl text-white">News</div>
              </div>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <Heading>Cybercrime Guidelines </Heading>
          <AwarenessMarquee />
        </div>
        <div className="flex bg-primary my-12 justify-center items-center w-full h-[350px] md:h-[700px]">
          <Image
            src={BannerRop}
            alt="PM"
            className="md:object-cover h-96 md:h-auto flex"
          />
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
