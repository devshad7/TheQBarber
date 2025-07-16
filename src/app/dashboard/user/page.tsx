import DashboardUser from "@/components/DashboardUser";
import Navbar from "@/components/layout/Navbar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const isUser = await checkRole("user");
  if (!isUser) {
    redirect("/unauthorized");
  }

  return (
    <>
      <Navbar />
      <DashboardUser />
    </>
  );
}

export default page;
