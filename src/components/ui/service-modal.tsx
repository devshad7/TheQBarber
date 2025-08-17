"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const services = [
  {
    id: "Haircut",
    name: "Haircut",
    duration: "20",
    description: "Professional haircut and styling",
  },
  {
    id: "Beard trim",
    name: "Beard Trim",
    duration: "5",
    description: "Beard trimming and shaping",
  },
  {
    id: "Haircut and Beard",
    name: "Haircut + Beard",
    duration: "25",
    description: "Complete haircut and beard service",
  },
];

type ServiceModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  handleAddQueue: (selectedService: string, duration: string) => void;
};

export function ServiceModal({
  isOpen,
  onOpenChange,
  handleAddQueue,
}: ServiceModalProps) {
  const [selectedService, setSelectedService] = useState<
    { id: string; duration: string } | undefined
  >(undefined);

  if (!isOpen) return null;

  return (
    <div className="w-full h-screen absolute bg-white top-0 left-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-20">
        <div className="mb-8 flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm"
            onClick={() => onOpenChange(false)}
          >
            <ArrowLeft />
          </Button>
          <h1 className="text-lg font-semibold text-gray-700">Our Services</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white shadow-sm invisible"
          >
            <ArrowLeft />
          </Button>
        </div>
        <div className="">
          <h2 className="text-lg font-semibold text-gray-700">Our Services</h2>
        </div>
        <div className="py-4">
          <RadioGroup
            value={selectedService?.id}
            onValueChange={(id) => {
              const serviceObj = services.find((s) => s.id === id);
              setSelectedService(serviceObj);
            }}
            className="space-y-3"
          >
            {services.map((service) => (
              <Label
                key={service.id}
                htmlFor={service.id}
                className={cn(
                  "flex items-center justify-between rounded-lg border bg-white p-4 cursor-pointer transition-all",
                  selectedService?.id === service.id
                    ? "border-yellow-500 ring-yellow-500"
                    : "border-gray-200"
                )}
              >
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="font-semibold">{service.name}</p>
                    <div className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {service.duration} min
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                </div>
                <RadioGroupItem value={service.id} id={service.id} />
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="absolute bottom-0 pb-8 left-4 right-4">
          <div className="flex flex-col gap-2 mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="py-5">
              Cancel
            </Button>
            <Button
              className="bg-yellow-700 hover:bg-yellow-700 text-white py-5"
              onClick={() => {
                if (selectedService)
                  handleAddQueue(selectedService.id, selectedService.duration);
              }}
              disabled={!selectedService}
            >
              Join Queue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
