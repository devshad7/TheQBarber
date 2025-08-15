"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Edit, ChevronDown, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const Profile = () => {
  const { user } = useUser();

  const router = useRouter();

  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(
    undefined
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold text-gray-700">Personal Data</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm invisible"
        >
          <ArrowLeft />
        </Button>
      </div>

      {/* Profile Photo */}
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="h-24 w-24 overflow-hidden rounded-full bg-sky-200">
            <img
              src={profilePhoto || user?.imageUrl}
              alt="user_image"
              className="h-full w-full object-cover"
            />
          </div>
          <Button
            size="icon"
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-orange-500 hover:bg-orange-600"
            onClick={triggerPhotoUpload}
          >
            <Edit className="h-4 w-4 text-white" />
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            defaultValue={user?.fullName || ""}
            className="py-5 border-gray-200 bg-white text-gray-900"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
            className="py-5 border-gray-200 bg-white text-gray-900"
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <div className="flex rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center px-3 border-r border-gray-200">
              <span className="text-lg">🇮🇳</span>
              <span className="ml-2 text-gray-600">+91</span>
            </div>
            <Input
              id="phone"
              type="tel"
              defaultValue={
                user?.phoneNumbers[0]?.phoneNumber.replace(/^\+91/, "") || ""
              }
              className="flex-1 border-0 bg-transparent py-5 text-gray-900 focus-visible:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <Button className="w-full py-5 bg-orange-500 text-white hover:bg-orange-600">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
