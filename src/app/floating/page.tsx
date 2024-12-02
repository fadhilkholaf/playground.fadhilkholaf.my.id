import { Suspense } from "react";

import FloatingScene from "./_components/FloatingScene";
import LoadingPage from "../loading";

const FloatingPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <FloatingScene />
      </Suspense>
    </main>
  );
};

export default FloatingPage;
