import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import SymbolDark from "../../../../public/assets/logos/symbol_dark.svg";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ShopLocation from "@/components/ui/shop-location";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

const BarberSignup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const router = useRouter();

  const searchParams = useSearchParams();
  // const redirectUrl = searchParams.get("redirect_url") || "/";

  const [shopName, setShopName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longtitude, setLongtitude] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!isLoaded || !signUp) return;
    setError("");
    setLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        phoneNumber: `+91${mobileNumber}`,
        firstName: shopName,
        unsafeMetadata: {
          role: "barber",
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setVerifying(true);
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "An unknown error occurred during signup.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setLoading(true);
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });

        const userId = result.createdUserId!;
        const userRef = doc(db, "shops", userId);

        await setDoc(userRef, {
          userId: userId,
          name: result.firstName,
          mobileNumber: `+91${mobileNumber}`,
          role: "barber",
          location: {
            latitude: latitude,
            longitude: longtitude,
          },
          createdAt: new Date().toISOString(),
        });

        router.push("/");
      } else {
        console.error(
          "Verification incomplete:",
          JSON.stringify(result, null, 2)
        );
      }
    } catch (err) {
      if (err && typeof err === "object" && "errors" in err) {
        const errorObj = err as { errors: { message: string }[] };
        setError(errorObj.errors[0]?.message || "Signup failed");
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded) return;
    setResendLoading(true);
    setError("");

    try {
      await signUp.preparePhoneNumberVerification({ strategy: "phone_code" });
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Failed to resend verification code.";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          {/* Header */}
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
            <div className="text-center text-sm">Create account as user</div>
          </div>

          {error && (
            <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {!verifying ? (
            <>
              <div className="grid gap-2">
                <div className="grid gap-2">
                  <Label htmlFor="first_name" className="text-sm">
                    Enter Shop Name
                  </Label>
                  <Input
                    id="first_name"
                    type="text"
                    placeholder="Enter shop name (e.g., The Unisex Saloon)"
                    onChange={(e) => setShopName(e.target.value)}
                    value={shopName}
                  />
                </div>
                <Label htmlFor="email" className="text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Label htmlFor="number" className="text-sm">
                  Mobile No
                </Label>
                <Input
                  id="number"
                  type="text"
                  maxLength={10}
                  placeholder="e.g., 1234567890"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  value={mobileNumber}
                />
              </div>
              <ShopLocation
                setLatitude={setLatitude}
                setLongtitude={setLongtitude}
              />
              <div id="clerk-captcha" className="hidden"></div>
              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Sign Up"}
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
              <Button
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={resendLoading}
              >
                {resendLoading ? "Resending..." : "Resend Code"}
              </Button>
            </>
          )}

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in?barber"
              className="underline underline-offset-4"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarberSignup;
