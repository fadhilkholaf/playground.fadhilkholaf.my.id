"use client";

import dynamic from "next/dynamic";

import { Suspense } from "react";

const TrailScene = dynamic(() => import("./_components/TrailScene"), {
  ssr: false,
});
import LoadingPage from "../loading";

const FluidPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <TrailScene />
      </Suspense>
    </main>
  );
};

export default FluidPage;
