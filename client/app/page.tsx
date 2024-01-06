import Image from "next/image";
import HeroImage from "./assets/images/hero.jpg";
import Icon from "./components/Icon";

export default function Home() {
  return (
    <main>
      <div className="flex w-full relative">
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
          <div className="text-2xl text-white">Find nearest Station</div>
        </div>
        <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] bg-primary-foreground rounded-3xl">
          <div>
            <Icon icon="report" width={130} />
          </div>
          <div className="text-2xl text-white">Report a crime.</div>
        </div>
        <div className="flex flex-col items-center justify-around w-[15vw] h-[40vh] bg-primary-foreground rounded-3xl">
          <div>
            <Icon icon="news" width={130} />
          </div>
          <div className="text-2xl text-white">News</div>
        </div>
      </div>
    </main>
  );
}
