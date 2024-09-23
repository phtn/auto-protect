"use client";
import { Card, CardBody, CardHeader, Image, Link } from "@nextui-org/react";
import { DotIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/ui/carousel";
import { generateRef } from "@/utils/helpers";
import { GlowCard } from "@/ui/glow-card";

export const MidNav = () => (
  <div className="drop-shadow-slate-200/20 flex h-[80px] items-center justify-between border-[0.33px] border-gray-300/60 bg-gradient-to-r from-board via-white to-board px-12 drop-shadow-md">
    <div className="flex h-[50px] w-fit items-center space-x-4">
      <div className="flex items-center space-x-8 px-12 text-sm font-bold tracking-tighter">
        <Link>
          <p className="text-lg">Affiliates</p>
        </Link>

        <DotIcon className="size-8 text-[#3568F9]" />
        <Link>
          <Image src="/svg/vip.svg" alt="vip" height={35} />
        </Link>
      </div>
    </div>
    <div className="flex h-[50px] w-fit items-center space-x-4">
      <div className="flex items-center space-x-6 px-12 text-sm font-semibold tracking-tighter">
        <Link>
          <p className="">Claims</p>
        </Link>
        <DotIcon className="size-8 text-[#3568F9]" />
        <Link className="">Customer Support</Link>
      </div>
    </div>
  </div>
);

export const BrowseByCategory = () => (
  <div className="h-full w-full bg-gradient-to-r from-board via-white to-board p-12">
    <div className="flex h-24 flex-col items-center justify-center font-ibm">
      <div className="h-2 w-1/4 bg-teal-200" />
      <p className="font-ibm text-4xl tracking-tighter">
        Browse products by category
      </p>
    </div>
    <div className="grid h-full w-full grid-cols-4 py-8">
      <Card className="h-fit w-full bg-orange-300 py-4">
        <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
          <p className="text-tiny font-bold uppercase">Daily Mix</p>
          <small className="text-default-500">12 Tracks</small>
          <h4 className="text-large font-bold">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="rounded-xl object-cover"
            src="https://miciph.com/wp-content/uploads/2021/07/pet-insurance-for-individuals.jpg.webp"
            width={270}
          />
        </CardBody>
      </Card>
      <div className="h-fit space-y-4 border bg-gray-900 p-4 text-white">
        <p className="pt-6 text-2xl font-semibold tracking-tighter">
          Motor Vehicle Insurance
        </p>
        <p className="text-justify text-sm">
          Feel confident for you and your loved ones wherever you go and in
          whatever you drive by choosing the right car insurance solutions.
        </p>
        <Image
          alt="MVI"
          src="https://miciph.com/wp-content/uploads/2020/04/shutterstock_1033279327.jpg.webp"
          className="rounded-md"
        />
      </div>
    </div>
  </div>
);

export const Dogs = () => (
  <GlowCard>
    <Image
      isBlurred
      alt="ctpl"
      src="https://miciph.com/wp-content/uploads/2021/07/online-store-dog-cover-image-768x768.png.webp"
      className="h-full w-fit rounded-2xl"
    />
    <div></div>
  </GlowCard>
);

export const HeroCarousel = () => {
  const refid = generateRef();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="h-full w-full bg-transparent"
    >
      <CarouselContent className="mx-8 py-8">
        {fproducts.map((product, i) => (
          <CarouselItem
            key={`${product.id}_${i}`}
            className="basis-1/3 bg-transparent"
          >
            <Link
              href={`/${product.href}/${refid}`}
              className="hover:opacity-100"
            >
              <GlowCard>
                <Image
                  isBlurred
                  alt={product.title}
                  src={product.src}
                  className="aspect-square h-full w-fit rounded-[20px]"
                />
                <div></div>
              </GlowCard>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

interface Product {
  id: number;
  title?: string;
  value?: string;
  href?: string;
  src: string;
}
const fproducts: Product[] = [
  {
    id: 1,
    title: "motorcycle",
    value: "",
    href: "ctpl",
    src: "https://miciph.com/wp-content/uploads/2020/10/MICI-CTPL-Insurance-for-Motorcycles-768x768.jpg.webp",
  },
  {
    id: 2,
    title: "cat",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2021/07/online-store-cat-cover-image-1-768x768.png.webp",
  },

  {
    id: 4,
    title: "pa",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2021/12/MICI-Personal-Accident-Insurance-1.jpg.webp",
  },
  {
    id: 3,
    title: "dog",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2021/07/online-store-dog-cover-image-768x768.png.webp",
  },
  {
    id: 5,
    title: "pc",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2022/08/MICI-DESKTOP-PROTECT-BANNER-1-V2-768x768.png.webp",
  },
  {
    id: 6,
    title: "phone",
    value: "",
    href: "",
    src: "https://miciph.com/wp-content/uploads/2020/12/MICI-Phone-Insurance-768x768.jpg.webp",
  },
  {
    id: 7,
    title: "ctpl cars",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2020/10/MICI-CTPL-Insurance-for-Private-Cars-768x768.jpg.webp",
  },
  {
    id: 8,
    title: "laptop protect",
    value: "",
    href: "#",
    src: "https://miciph.com/wp-content/uploads/2022/08/MICI-LAPTOP-BANNER-1.png.webp",
  },
];
