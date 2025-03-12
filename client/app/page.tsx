"use client";
import { ItemsCarousel } from "@/modules/home/components/items-carousel";

export default function Home() {
  return (
    <main className="m-auto">
      <div className=" flex justify-center items-center w-full">
        <ItemsCarousel items={[]} />
      </div>
    </main>
  );
}
