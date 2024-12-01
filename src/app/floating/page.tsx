import { Suspense } from "react";
import FloatingScene from "./_components/FloatingScene";

const FloatingPage = () => {
  return (
    <main className="h-screen w-full">
      <Suspense>
        <FloatingScene />
      </Suspense>
    </main>
  );
};

export default FloatingPage;
