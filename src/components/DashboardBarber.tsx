import React from "react";
import { Button } from "./ui/button";
import { Plus, RefreshCcw, Users } from "lucide-react";
import QueueCardBarber from "./ui/QueueCardBarber";

const DashboardBarber = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto py-5 px-5">
        <div className="flex justify-between items-center pb-5 border-b border-gray-100">
          <div className="">
            <h1 className="text-xl md:text-2xl font-semibold">Your Queue</h1>
            <p className="text-gray-600 text-sm md:text-base text-balance">
              0 customers waiting
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <Button className="cursor-pointer bg-[#363636] hover:bg-[#414141]">
              <Plus />
              Add
            </Button>
            <Button variant={"outline"} className="cursor-pointer">
              <RefreshCcw />
              Refresh
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-5">
            <div className="bg-blue-50 flex items-center py-5 px-5 gap-3 rounded-md w-full">
              <div className="size-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-sm shadow-blue-800">
                <Users size={18} />
              </div>
              <div className="">
                <h2>Total Wait Time</h2>
                <span className="text-xl font-semibold text-green-600">
                  0 min
                </span>
              </div>
            </div>
            <div className="bg-orange-50 flex items-center py-5 px-5 gap-3 rounded-md w-full">
              <div className="size-10 rounded-full bg-yellow-700 text-white flex items-center justify-center shadow-sm shadow-yellow-700">
                <Users size={18} />
              </div>
              <div className="">
                <h2>Status</h2>
                <span className="text-xl font-semibold text-yellow-600">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <QueueCardBarber />
        </div>
      </main>
    </>
  );
};

export default DashboardBarber;
