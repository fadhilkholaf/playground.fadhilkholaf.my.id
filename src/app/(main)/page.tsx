import { Metadata } from "next";
import { Suspense } from "react";

import SetUpScene from "./_components/SetUpScene";
import LoadingPage from "../loading";

export const metadata: Metadata = {
  title: "Home",
};

const HomePage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <section className="pointer-events-none fixed z-40 flex h-screen w-full flex-col items-center justify-center">
          <p>Playground</p>
          <h1 className="text-center text-5xl font-bold tracking-wider md:text-9xl">
            {"Fadhil Kholaf".split("").map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </h1>
          <p>Experiment</p>
        </section>
        <SetUpScene />
      </Suspense>
    </main>
  );
};

export default HomePage;
