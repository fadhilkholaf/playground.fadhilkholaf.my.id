import { Suspense } from "react";

import BadgeScene from "./_components/BadgeScene";
import LoadingPage from "../loading";

const BadgePage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <BadgeScene />
      </Suspense>
    </main>
  );
};

export default BadgePage;
