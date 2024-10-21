"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function Banner() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        <CarouselItem>
          <Image
            src="./heroImage.png"
            alt="hero image"
            width={720}
            height={360}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="./heroImage.png"
            alt="hero image"
            width={720}
            height={360}
            className="hue-rotate-180"
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            src="./heroImage.png"
            alt="hero image"
            width={720}
            height={360}
            className="saturate-0"
          />
        </CarouselItem>
      </CarouselContent>
      <div className="flex items-center justify-center gap-1 py-2">
        <Bell className="stroke-yellow-400 fill-yellow-400 size-5" />
        Congratulations artxipa! outstanding winner
      </div>
    </Carousel>
  );
}
