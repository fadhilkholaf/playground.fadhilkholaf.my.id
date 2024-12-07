"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const MathSinePage = () => {
  const object = 11;
  const objectHalf = Math.floor(object / 2);

  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const animation = (time: number) => {
      const progress = time / 5000;

      setNumber(Math.sin(progress));

      requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  });

  return (
    <main className="flex h-screen w-full items-center justify-center">
      {[...Array(object).keys()].map((_, index) => (
        <p
          key={index}
          className="animate-rotate fixed flex"
          style={{
            animationDuration: `${index + 5}s`,
          }}
        >
          {[...Array(object).keys()].map((_, index) => (
            <span
              key={index}
              className={cn("block p-2 font-bold text-black", {
                "bg-yellow-300": index % 5 === 0,
                "bg-pink-300": index % 5 === 1,
                "bg-blue-300": index % 5 === 2,
                "bg-green-300": index % 5 === 3,
                "bg-orange-300": index % 5 === 4,
              })}
              style={{
                transform: `translate(${(index - objectHalf ? index - objectHalf : 0.5) * number * 256}px, 0px)`,
              }}
            >
              {index}
            </span>
          ))}
        </p>
      ))}
    </main>
  );
};

export default MathSinePage;
