import Footer from "@/components/layout/Footer";
import Haircut from "@/components/layout/haircut/Haircut";
import React, { Suspense } from "react";

function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Haircut />
      </Suspense>
      <Footer />
    </>
  );
}

export default Page;
