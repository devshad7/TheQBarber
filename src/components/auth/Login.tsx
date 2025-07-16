"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import BarberLogin from "./barber/BarberLogin";
import UserLogin from "./user/UserLogin";

const Login = () => {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard/user";

  const isBarber = redirectUrl.includes("/barber");

  return <>{isBarber ? <BarberLogin /> : <UserLogin />}</>;
};

export default Login;
