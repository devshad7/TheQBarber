import Login from "@/components/auth/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | TheQBarber",
};

function Page() {
  return <Login />;
}

export default Page;
