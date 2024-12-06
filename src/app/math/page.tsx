"use client";

import { useEffect, useState } from "react";

const MathPage = () => {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    const animation = (time: number) => {
      setNumber(Math.sin(time / 1000));

      requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  });

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-16 overflow-auto">
      <p className="flex">
        {[...Array(50).keys()].map((_, index) => (
          <span
            key={index}
            className="block"
            style={{
              transform: `translate(0, calc(50% + ${(Math.cos(index + 1) * (number * 16) * 2).toFixed(2)}px))`,
              opacity: `${(Math.abs(number / 2) * (Math.abs(index - 50) / 50)) % 1}`,
            }}
          >
            A
          </span>
        ))}
      </p>
      <p className="flex">
        {[...Array(50).keys()].map((_, index) => (
          <span
            key={index}
            className="block"
            style={{
              transform: `translate(0, calc(50% + ${(Math.sin(index + 1) * (-number * 16) * 2).toFixed(2)}px))`,
              opacity: `${(Math.sin(-index) * number) % 1}`,
            }}
          >
            A
          </span>
        ))}
      </p>
      <p className="flex">
        {[...Array(50).keys()].map((_, index) => (
          <span
            key={index}
            className="block"
            style={{
              transform: `translate(0, calc(50% + ${(Math.sin(index + 1) * (-number * 16) * 2).toFixed(2)}px))`,
              opacity: `${(Math.sin(index) * number) % 1}`,
            }}
          >
            A
          </span>
        ))}
      </p>
      <p className="flex">
        {[...Array(50).keys()].map((_, index) => (
          <span
            key={index}
            className="block"
            style={{
              transform: `translate(0, calc(50% + ${(Math.sin(index + 1) * (-number * 16) * 2).toFixed(2)}px))`,
              opacity: `${Math.abs(((number / 2) * 2 * (index % 25)) % 1)}`,
            }}
          >
            A
          </span>
        ))}
      </p>
      <p className="flex">
        {[...Array(50).keys()].map((_, index) => {
          const prefix = Math.abs(((number / 2) * 2 * (index % 25)) % 1);

          let color = "black";

          if (prefix <= 0.1) {
            color = "pink";
          } else if (prefix <= 0.3) {
            color = "blue";
          } else if (prefix <= 0.6) {
            color = "green";
          } else if (prefix <= 0.9) {
            color = "red";
          }

          return (
            <span
              key={index}
              className="block"
              style={{
                transform: `translate(0, calc(50% + ${(Math.sin(index + 1) * (-number * 16) * 2).toFixed(2)}px))`,
                opacity: `${prefix}`,
                backgroundColor: `${color}`,
              }}
            >
              A
            </span>
          );
        })}
      </p>
      {[...Array(100).keys()].map((_, index) => {
        const prefix = Math.abs(((number / 1 / 2) * 2 * (index % 4)) % 1);

        let color = "pink";

        if (prefix <= 0.1) {
          color = "pink";
        } else if (prefix <= 0.3) {
          color = "cyan";
        } else if (prefix <= 0.6) {
          color = "pink";
        } else if (prefix <= 0.9) {
          color = "cyan";
        }

        const theta = (index / 100) * Math.PI * 2;

        return (
          <span
            key={index}
            className="fixed"
            style={{
              top: `calc(50% + ${(Math.sin(theta) * 300).toFixed(2)}px)`,
              left: `calc(50% + ${(Math.cos(theta) * 300).toFixed(2)}px)`,
              opacity: `${Math.abs(prefix)}`,
              backgroundColor: `${color}`,
            }}
          >
            A
          </span>
        );
      })}
      {[...Array(50).keys()].map((_, index) => {
        const t = (index / 50) * Math.PI * 2;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y =
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t);

        const scale = 15;
        const offsetX = 50;
        const offsetY = 50;

        const top = `calc(${offsetY}% - ${(y * scale).toFixed(2)}px)`;
        const left = `calc(${offsetX}% + ${(x * scale).toFixed(2)}px)`;

        const prefix = Math.abs(((number / 2) * 2 * (index % 25)) % 1);

        let color = "cyan";
        if (prefix <= 0.1) {
          color = "cyan";
        } else if (prefix <= 0.3) {
          color = "pink";
        } else if (prefix <= 0.6) {
          color = "cyan";
        } else if (prefix <= 0.9) {
          color = "pink";
        }

        return (
          <span
            key={index}
            className="fixed p-2 font-bold text-black"
            style={{
              top: top,
              left: left,
              opacity: `${prefix}`,
              backgroundColor: `${color}`,
            }}
          >
            {index % 6 === 1
              ? "L"
              : index % 6 === 2 || index % 6 === 4
                ? "I"
                : index % 6 === 3
                  ? "C"
                  : "A"}
          </span>
        );
      })}
    </main>
  );
};

export default MathPage;
