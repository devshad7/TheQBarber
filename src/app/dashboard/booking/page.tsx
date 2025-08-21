import React, { Suspense } from "react";
import Booking from "@/components/layout/booking/Booking";
import { Loader2 } from "lucide-react";

function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Booking />
    </Suspense>
  );
}

export default Page;

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
