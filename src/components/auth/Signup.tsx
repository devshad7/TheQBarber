"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import BarberSignup from "./barber/BarberSignup";
import UserSignup from "./user/UserSignup";

const Signup = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard/user";

  const isBarber = redirectUrl.includes("/barber");

  return <>{isBarber ? <BarberSignup /> : <UserSignup />}</>;
};

export default Signup;
