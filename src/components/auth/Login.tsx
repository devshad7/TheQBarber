"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import BarberLogin from "./barber/BarberLogin";
import UserLogin from "./user/UserLogin";
import Link from "next/link";

const Login = () => {
  const searchParams = useSearchParams();
  const isBarber = searchParams.has("barber");
  const isUser = searchParams.has("user");

  if (isBarber) {
    return <BarberLogin />;
  }

  if (isUser) {
    return <UserLogin />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p>Role not specified. Try again from the correct link.</p>
      <Link href="/" className="underline mt-1">
        Go to Home
      </Link>
    </div>
  );
};

export default Login;
