import { Suspense } from "react";

import BadgeScene from "./_components/KeyboardControllScene";
import LoadingPage from "../loading";

const KeyboardControllPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense fallback={<LoadingPage />}>
        <BadgeScene />
      </Suspense>
    </main>
  );
};

export default KeyboardControllPage;
