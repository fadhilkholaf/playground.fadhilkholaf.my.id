import { Suspense } from "react";

import LoadingPage from "../loading";
import StripLampScene from "./_components/StripLampScene";

const StripLampPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <StripLampScene />
      </Suspense>
    </main>
  );
};

export default StripLampPage;
