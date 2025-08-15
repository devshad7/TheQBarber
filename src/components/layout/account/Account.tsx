"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  Bell,
  ChevronRight,
  Globe,
  Handshake,
  Info,
  Lock,
  LogOut,
  Shield,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Account = () => {
  const { user } = useUser();
  //   console.log(user);
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
      <div className="flex items-center gap-4 pb-4">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={user?.imageUrl} alt="user_image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <h2 className="text-lg font-semibold">{user?.fullName}</h2>
          <span className="text-gray-600">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
        </div>
      </div>
      <div className="py-4">
        <span className="text-sm text-gray-600">Personal Info</span>
        <div className="space-y-5 mt-4 text-gray-600">
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UserRound />
              <span>Personal Data</span>
            </div>
            <ChevronRight />
          </Link>
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Wallet />
              <span>Payment Account</span>
            </div>
            <ChevronRight />
          </Link>
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield />
              <span>Account Security</span>
            </div>
            <ChevronRight />
          </Link>
        </div>
      </div>
      <div className="py-4">
        <span className="text-sm text-gray-600">General</span>
        <div className="space-y-5 mt-4 text-gray-600">
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Globe />
              <span>Language</span>
            </div>
            <ChevronRight />
          </Link>
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bell />
              <span>Push Notification</span>
            </div>
            <ChevronRight />
          </Link>
        </div>
      </div>
      <div className="py-4">
        <span className="text-sm text-gray-600">About</span>
        <div className="space-y-5 mt-4 text-gray-600">
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Info />
              <span>Help Center</span>
            </div>
            <ChevronRight />
          </Link>
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Lock />
              <span>Privacy & Policy</span>
            </div>
            <ChevronRight />
          </Link>
          <Link href={""} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Handshake />
              <span>Term & Conditions</span>
            </div>
            <ChevronRight />
          </Link>
          <Drawer>
            <DrawerTrigger className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <LogOut />
                  <span>Log out</span>
                </div>
                <ChevronRight />
              </div>
            </DrawerTrigger>
            <DrawerContent className="pb-6">
              <DrawerHeader>
                <DrawerTitle className="text-destructive">Logout</DrawerTitle>
                <Separator className="my-4" />
                <DrawerDescription className="flex flex-col">
                  <span className="text-base font-semibold text-[#363636]">
                    Are you sure want to Logout?
                  </span>
                  <span className="font-light">
                    You can log in again at any time.
                  </span>
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter className="flex items-center flex-row justify-between">
                <DrawerClose asChild>
                  <span className="px-4 flex rounded-full justify-center items-center py-2 w-full border">
                    Cancel
                  </span>
                </DrawerClose>
                <SignOutButton>
                  <span className="px-4 w-full py-2 flex rounded-full justify-center items-center border bg-rose-700 text-white">
                    Logout
                  </span>
                </SignOutButton>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Account;
