import React from "react";
import { Button } from "./ui/button";
import { RefreshCcw, Scissors, Users } from "lucide-react";
import QueueCard from "./ui/QueueCard";
import { Card, CardContent } from "./ui/card";

const DashboardUser = () => {
  return (
    <>
      <main className="max-w-7xl mx-auto py-5 px-5">
        <div className="flex justify-between items-center pb-5 border-b border-gray-100">
          <div className="">
            <h1 className="text-xl md:text-2xl font-semibold">
              Nearby Barbers
            </h1>
            <p className="text-gray-600 text-sm md:text-base text-balance">
              0 barber found • Queue lengths update every 30 seconds
            </p>
          </div>
          <div className="">
            <Button variant={"outline"} className="cursor-pointer">
              <RefreshCcw />
              Refresh
            </Button>
          </div>
        </div>
        <div className="mt-5">
          {/* <QueueCard /> */}
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center text-center p-16">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Scissors className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Barber shop not found
              </h3>
              <p className="text-gray-500 mt-1">
                No Barber shop found near you location 
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};

export default DashboardUser;
