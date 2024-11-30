import { Suspense } from "react";

import BadgeScene from "./_components/KeyboardControllScene";

const KeyboardControllPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense>
        <BadgeScene />
      </Suspense>
    </main>
  );
};

export default KeyboardControllPage;
