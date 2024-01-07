import Image from "next/image";
import HeroImage from "./assets/images/hero.jpg";
import Icon from "./components/Icon";
import Marquee from "react-fast-marquee";
import AwarenessMarquee from "./components/Awareness";
import Logo from "./assets/brand/logo.png";
import PM from "./assets/images/pm.png";
import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col gap-20">
        <div className="flex flex-col w-full relative">
          <div>
            <Image
              className="object-cover w-full h-[70vh]"
              src={HeroImage}
              alt="hero"
              loading="lazy"
              width={1920}
            />
          </div>
          <div className="flex gap-20 justify-evenly z-10 relative mt-[-40px]">
            <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] p-2 bg-primary-foreground rounded-3xl">
              <div>
                <Icon icon="report" width={130} />
              </div>
              <div className="text-2xl text-white">Report a crime.</div>
            </div>
            <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] bg-primary-foreground rounded-3xl">
              <div>
                <Icon icon="location" width={130} />
              </div>
              <div className="text-2xl text-white flex justify-center">
                Find nearest Station
              </div>
            </div>
            <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] bg-primary-foreground rounded-3xl">
              <div>
                <Icon icon="outreach" width={130} />
              </div>
              <div className="text-2xl text-white flex justify-center text-center">
                Awareness and Training
              </div>
            </div>
            <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] bg-primary-foreground rounded-3xl">
              <div>
                <Icon icon="news" width={130} />
              </div>
              <div className="text-2xl text-white">News</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex text-4xl justify-center font-bold">
            Cybercrime Guidelines
          </div>
          <AwarenessMarquee />
        </div>
        <div className="flex bg-primary-foreground my-8">
          <Image src={PM} alt="PM" width={600} height={200} />
          <div className="border-2 border-white rounded-3xl w-[50vw] flex justify-center items-center mx-auto m-8">
            <figure className="max-w-screen-md mx-auto text-center">
              <div className="flex justify-center p-4">
                <Icon icon="quote" width={50} />
              </div>
              <blockquote>
                <p className="text-2xl italic font-medium text-white">
                  Can we secure the world from a bloodless war? I'm talking
                  about Cyber Security. India must take the lead in cyber
                  security through innovation.
                </p>
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
        </div>
        <div className="fixed bottom-[20px] right-[20px] z-20">
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
