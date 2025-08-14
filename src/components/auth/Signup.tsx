"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import BarberSignup from "./barber/BarberSignup";
import UserSignup from "./user/UserSignup";
import Link from "next/link";

const Signup = () => {
  const searchParams = useSearchParams();
  const isBarber = searchParams.has("barber");
  const isUser = searchParams.has("user");

  if (isBarber) {
    return <BarberSignup />;
  }

  if (isUser) {
    return <UserSignup />;
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

export default Signup;
