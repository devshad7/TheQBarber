import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  ChevronRight,
  Globe,
  Handshake,
  Info,
  Lock,
  Shield,
  UserRound,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const Account = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
      <div className="flex items-center gap-4 pb-4">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={"/assets/placeholder.svg"} alt="user_image" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <h2 className="text-lg font-semibold">John Doe</h2>
          <span className="text-gray-600">john@example.com</span>
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
        </div>
      </div>
    </div>
  );
};

export default Account;
