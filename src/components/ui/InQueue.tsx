import { Scissors, MapPin, LogOut } from "lucide-react";
import React from "react";
import { Button } from "./button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card";
import { Separator } from "./separator";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

interface InQueueProps {
  shopId: string | null;
  userId: string | null;
  position: number | null;
  shopName?: string | null;
  estTime?: number | null;
  cutType?: string | null;
  location?: {
    latitude: string | null;
    longitude: string | null;
  };
}

const InQueue = ({
  shopId,
  userId,
  position,
  shopName,
  estTime,
  cutType,
  location,
}: InQueueProps) => {
  //function to generate ordinal form
  function getOrdinal(n: number | null) {
    if (n == null) return "";
    const s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  // click function to remove from queue when done
  const handleQueueDone = () => {
    if (!shopId || !userId) return;
    const ref = doc(db, "shops", shopId, "queues", userId);
    deleteDoc(ref)
      .then(() => {
        console.log("Cutting Done");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <Card className="w-full shadow-lg border-2 border-dashed rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">
            You're in the Queue!
          </CardTitle>
          <CardDescription>{shopName}</CardDescription>
        </div>
        <Scissors className="h-5 w-5" />
      </CardHeader>
      <CardContent className="text-center flex flex-col items-center gap-4 md:py-8">
        <div className="relative">
          <p className="text-5xl font-extrabold text-primary">#{position}</p>
        </div>
        <h2 className="text-2xl font-semibold text-balance">
          {position === 1
            ? `Your turn! You're ${getOrdinal(position)} in line.`
            : `Almost there! You're ${getOrdinal(position)} in line.`}
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full text-sm">
          <div className="flex items-center gap-2">
            <Scissors className="h-4 w-4" />
            <span>{cutType}</span>
          </div>
          <span className="hidden sm:inline mx-1">•</span>
          <span>About {estTime}m estimated wait</span>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">--</CardTitle>
              <CardDescription>Time Waiting</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{estTime}m</CardTitle>
              <CardDescription>Est. Wait Time</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pb-4 bg-muted/30">
        <Button size="lg" variant="outline" className="py-5 cursor-pointer">
          <Link
            href={`https://www.google.com/maps/dir/?api=1&destination=${location?.latitude},${location?.longitude}`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </Link>
        </Button>
        <Button
          size="lg"
          variant="destructive"
          className="py-5 cursor-pointer"
          onClick={handleQueueDone}
        >
          <LogOut className="h-4 w-4" />
          Leave Queue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InQueue;
