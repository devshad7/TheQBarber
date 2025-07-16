import { Label } from "@radix-ui/react-label";
import { Loader2, CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./button";

type ChildComponentProps = {
  setLatitude: React.Dispatch<React.SetStateAction<string | null>>;
  setLongtitude: React.Dispatch<React.SetStateAction<string | null>>;
};

const ShopLocation = ({ setLatitude, setLongtitude }: ChildComponentProps) => {
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [detectedLocation, setDetectedLocation] = useState<string | null>(null);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);
    setLocationError(null);
    setDetectedLocation(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude.toFixed(5));
        setLongtitude(longitude.toFixed(5));
        setDetectedLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
        setIsDetectingLocation(false);
      },
      (err) => {
        let errorMessage = "An unknown error occurred.";
        if (err.code === err.PERMISSION_DENIED) {
          errorMessage = "You denied the request for Geolocation.";
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          errorMessage = "Location information is unavailable.";
        } else if (err.code === err.TIMEOUT) {
          errorMessage = "The request to get user location timed out.";
        }
        setLocationError(errorMessage);
        setIsDetectingLocation(false);
      }
    );
  };

  useEffect(() => {
    detectLocation();
  }, []);

  return (
    <div className="space-y-2">
      <Label>Location</Label>
      <div className="flex items-center justify-center rounded-md border border-dashed p-4 text-sm h-24">
        {isDetectingLocation ? (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Detecting your location...</span>
          </div>
        ) : locationError ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-red-500">{locationError}</p>
            <Button variant="outline" size="sm" onClick={detectLocation}>
              Allow Location
            </Button>
          </div>
        ) : detectedLocation ? (
          <div className="flex flex-col items-center gap-2 text-green-600">
            <CheckCircle2 className="h-6 w-6" />
            <span className="font-medium text-center">
              Location Detected: <br /> {detectedLocation}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShopLocation;
