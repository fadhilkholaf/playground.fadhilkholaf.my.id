import { Metadata } from "next";
import { Suspense } from "react";

import WaterDistortionScene from "./_components/WaterDistortionScene";
import LoadingPage from "../loading";

export const metadata: Metadata = {
  title: "Water Distortion",
};

const WaterDistortionPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <WaterDistortionScene />
      </Suspense>
    </main>
  );
};

export default WaterDistortionPage;
