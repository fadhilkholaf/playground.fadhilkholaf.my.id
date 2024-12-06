"use client";

import { useEffect, useState } from "react";

import { createNoise2D } from "simplex-noise";

import { cn } from "@/lib/utils";

const MathSinePage = () => {
  const object = 23;
  const objectHalf = Math.floor(object / 2);

  const [number, setNumber] = useState<{ x: number; y: number }[]>(
    Array(object).fill({ x: 0, y: 0 }),
  );

  const noise = createNoise2D();

  useEffect(() => {
    const animation = (time: number) => {
      const progress = time / 2500;

      setNumber((prevNumber) =>
        prevNumber.map((_, index) => ({
          x: Math.abs(Math.sin(progress)),
          y:
            noise(progress * (index - objectHalf), 0) *
            Math.sin(progress * Math.PI * 0.5),
        })),
      );

      requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  });

  return (
    <main className="flex h-screen w-full items-center justify-center">
      {[...Array(object).keys()].map((_, index) => (
        <p
          key={index}
          className="fixed flex"
          style={{
            transform: `rotate(${Math.PI * (index * 10)}deg)`,
          }}
        >
          {number.map((item, index) => (
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
                transform: `translate(${(index - objectHalf ? index - objectHalf : 0.5) * (item.x * 2) * 128}px, ${
                  item.y * 4
                }px)`,
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
