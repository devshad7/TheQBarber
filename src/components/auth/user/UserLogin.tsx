"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import SymbolDark from "../../../../public/assets/logos/symbol_dark.svg";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";

const UserLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const searchParams = useSearchParams();
  // const redirectUrl = searchParams.get("redirect_url") || "/";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded || !signIn) return;
    setLoading(true);
    setError("");
    try {
      await signIn.create({
        strategy: "email_code",
        identifier: email,
      });
      setVerifying(true);
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Error sending code.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signIn) return;

    try {
      setLoading(true);
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("OTP verification incomplete.");
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Invalid code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image src={SymbolDark} alt="" className="size-10" />
              </div>
              <span className="sr-only">TheQBarber</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to TheQBarber</h1>
            <div className="text-center text-sm">Login as User</div>
          </div>
          <div className="flex flex-col gap-6">
            {error && (
              <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {!verifying ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="number">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter you email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div id="clerk-captcha" className="hidden"></div>
                <Button
                  className="w-full cursor-pointer"
                  onClick={handleSignIn}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Login"}
                </Button>
              </>
            ) : (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="code">Enter OTP</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div id="clerk-captcha" className="hidden"></div>
                <Button
                  className="w-full"
                  onClick={handleVerify}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </>
            )}
          </div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up?user"
              className="underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
