import Signup from "@/components/auth/Signup";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Signup | TheQBarber",
};

function Page() {
  return <Signup />;
}

export default Page;
