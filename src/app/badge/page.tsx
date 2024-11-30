import { Suspense } from "react";

import BadgeScene from "./_components/BadgeScene";

const BadgePage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense>
        <BadgeScene />
      </Suspense>
    </main>
  );
};

export default BadgePage;
