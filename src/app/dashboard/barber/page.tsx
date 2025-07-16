import DashboardBarber from "@/components/DashboardBarber";
import NavbarTwo from "@/components/layout/NavbarTwo";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const isUser = await checkRole("barber");
  if (!isUser) {
    redirect("/unauthorized");
  }

  return (
    <>
      <NavbarTwo />
      <DashboardBarber />
    </>
  );
}

export default page;
