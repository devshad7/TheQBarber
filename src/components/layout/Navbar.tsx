"use client"

import React, { useEffect, useState } from "react";
import { Bell, MapPin } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const [location, setLocation] = useState("Loading...");
  const [greeting, setGreeting] = useState("Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Evening");
    else setGreeting("Night");
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          if (data.address) {
            const city = data.address.county;
            const district = data.address.state_district;
            setLocation(`${city}, ${district}`);
          } else {
            setLocation("Unknown location");
          }
        } catch {
          setLocation("Error fetching location");
        }
      },
      () => {
        setLocation("Permission denied");
      }
    );
  }, []);
  return (
    <>
      <nav className="md:border-b md:border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto py-5 px-5">
          <div className="">
            <h1 className="text-lg font-semibold">
              {greeting}, {user?.fullName}
            </h1>
            <p className="text-sm text-gray-600">
              <MapPin size={18} className="inline-block" /> {location}
            </p>
          </div>
          <div className="">
            <div className="bg-gray-50 border border-gray-200 p-2 rounded-full">
              <Bell />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
