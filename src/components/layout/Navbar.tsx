import Image from "next/image";
import React from "react";
import LogoDark from "../../../public/assets/logos/logo__dark.svg";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

const Navbar = async () => {
  const user = await currentUser();

  return (
    <>
      <nav className="border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-4 px-5">
          <div className="">
            <Link href={"/"}>
              <Image
                src={LogoDark}
                alt="logo"
                className="w-auto h-10 md:h-12"
              />
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-balance text-sm">
                Welocme, Mr. {user?.fullName}
              </p>
            </div>
            <Button variant={"outline"} className="cursor-pointer">
              <Sun />
            </Button>
            <SignOutButton>
              <Button className="cursor-pointer bg-[#363636]">Signout</Button>
            </SignOutButton>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
