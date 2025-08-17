"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(
    undefined
  );
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load the user details into state
  useEffect(() => {
    if (user) {
      setUserFirstName(user.firstName || "");
      setUserLastName(user.lastName || "");
      setOriginalFirstName(user.firstName || "");
      setOriginalLastName(user.lastName || "");
      setProfilePhoto(user.imageUrl || undefined);
    }
  }, [user]);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewPhotoFile(file);

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

  const handleSaveChanges = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      if (
        userFirstName !== originalFirstName ||
        userLastName !== originalLastName
      ) {
        await user.update({
          firstName: userFirstName,
          lastName: userLastName,
        });
        setOriginalFirstName(userFirstName);
        setOriginalLastName(userLastName);
      }

      // Upload profile photo
      if (newPhotoFile) {
        await user.setProfileImage({ file: newPhotoFile });
        setNewPhotoFile(null);
      }

      console.log("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if any changes are made or not
  const hasChanges =
    userFirstName !== originalFirstName ||
    userLastName !== originalLastName ||
    !!newPhotoFile;

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
            className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-yellow-700 hover:bg-yellow-800"
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

      {/* User Details */}
      <div className="space-y-6">
        <div className="flex items-center gap-x-3">
          <div className="space-y-2">
            <Label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={userFirstName}
              onChange={(e) => setUserFirstName(e.target.value)}
              className="py-5 border-gray-200 bg-white text-gray-900 focus-visible:ring-0"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={userLastName}
              onChange={(e) => setUserLastName(e.target.value)}
              className="py-5 border-gray-200 bg-white text-gray-900 focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            disabled
            defaultValue={user?.emailAddresses[0]?.emailAddress || ""}
            className="py-5 border-gray-200 bg-white text-gray-900 focus-visible:ring-0"
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
              disabled
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
        <Button
          className="w-full py-5 bg-yellow-700 text-white hover:bg-yellow-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleSaveChanges}
          disabled={isLoading || !hasChanges}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
