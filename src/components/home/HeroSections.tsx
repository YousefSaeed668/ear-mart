import Image from "next/image";
import { MaxWidth } from "../MaxWidth";
import { Button } from "../ui/button";
import Link from "next/link";

export function HeroSections() {
  return (
    <>
      <div className="relative w-full">
        <picture>
          <source srcSet="/homebgbigscreens.jpg" media="(min-width: 1920px)" />
          <source srcSet="/homebg.jpg" media="(min-width: 640px)" />
          <Image
            src="/homebgmobile.jpg"
            alt="homebg"
            width={1920}
            height={1080}
            layout="responsive"
            sizes="100vw"
            priority
          />
        </picture>

        <div className="absolute w-full top-[55%] -translate-y-1/2 ">
          <MaxWidth>
            <h1 className="font-philosopher text-3xl sm:md:text-4xl md:text-5xl lg:text-[70px] text-white md:leading-[85px]">
              The Platform For <br />
              <span className="text-4xl sm:md:text-5xl md:text-6xl lg:text-[90px] font-bold">
                Sustainable HOME
              </span>
            </h1>
            <div className="flex items-center gap-4 mt-10">
              <Button
                asChild
                className="min-w-[80px]  sm:min-w-[120px] sm:h-12 md:min-w-[180px] md:h-12 lg:min-w-[247px] lg:h-16 hover:bg-[#00693d]"
              >
                <Link href="/shop">SHOP NOW</Link>
              </Button>
              <Button
                variant="outline"
                className=" !border-white min-w-[80px]  sm:min-w-[120px] sm:h-12 md:min-w-[180px] md:h-12  lg:min-w-[247px] lg:h-16 bg-transparent text-white"
              >
                LEARN MORE
              </Button>
            </div>
          </MaxWidth>
        </div>
      </div>
    </>
  );
}
