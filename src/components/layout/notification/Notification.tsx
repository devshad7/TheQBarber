"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageCircle } from "lucide-react";

const Notification = () => {
  const router = useRouter();
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
        <h1 className="text-lg font-semibold text-gray-700">Notifications</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm invisible"
        >
          <ArrowLeft />
        </Button>
      </div>
      {/* Notification List */}
      <div className="flex flex-col space-y-4">
        {/* <div className="space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">Today</h1>
          <div className="flex items-start gap-x-4">
            <div className="p-3 bg-yellow-700/10 rounded-full text-yellow-700">
              <MessageCircle />
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Appointment Reminder</h2>
                <span className="text-sm text-gray-400">08:23 AM</span>
              </div>
              <p className="text-sm text-gray-500 border-b pb-4 border-gray-200">
                Hi John, just a friendly reminder that your appointment with
                [Barber] is coming up
              </p>
            </div>
          </div>
        </div> */}
        <div className="text-center py-4">
          <p className="text-gray-600">No notifications</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
