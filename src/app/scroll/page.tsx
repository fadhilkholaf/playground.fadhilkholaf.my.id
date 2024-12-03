import { Suspense } from "react";

import ScrollScene from "./_components/ScrollScene";
import LoadingPage from "../loading";

const ScrollPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <ScrollScene />
      </Suspense>
    </main>
  );
};

export default ScrollPage;
