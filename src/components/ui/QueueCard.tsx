import { MapPin, Plus } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

const QueueCard = () => {
  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-[#363636]">
      <Card className="max-w-full md:max-w-md w-full broder p-5">
        <CardContent className="p-0 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">The Unisex Saloon</h2>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1.5" />
                <span>1.5 km away</span>
              </div>
            </div>
            <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              Available
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Queue: 1</span>
            <div className="flex flex-col items-end">
              <span className="font-semibold">1 waiting</span>
              <span className="text-xs">~15min</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Button className="bg-[#363636] hover:bg-[#414141] cursor-pointer text-white font-bold py-5">
              <Plus className="w-5 h-5" />
              Join Queue
            </Button>
            <Button
              variant="outline"
              className="font-bold border-gray-300 bg-transparent py-5 cursor-pointer"
            >
              <MapPin className="w-5 h-5" />
              Directions
            </Button>
          </div>

          <div className="text-center">
            <p className="text-green-600 font-medium text-sm">
              <span role="img" aria-label="sparkles">
                ✨
              </span>{" "}
              No wait time - join now!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueCard;
