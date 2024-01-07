import Image from "next/image";
import HeroImage from "./assets/images/hero.jpg";
import Icon from "./components/Icon";
import Marquee from "react-fast-marquee";
import AwarenessMarquee from "./components/Awareness";

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
                <Icon icon="report" width={130} />
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
      </div>
    </main>
  );
}
