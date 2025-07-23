"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Choose Your Service
          </DialogTitle>
          <DialogDescription className="text-center">
            Select the service you want from The Unisex Saloon
          </DialogDescription>
        </DialogHeader>
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
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-gray-200"
                )}
              >
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <p className="font-semibold">{service.name}</p>
                    <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {service.duration}
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
        <DialogFooter className="grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              if (selectedService)
                handleAddQueue(selectedService.id, selectedService.duration);
            }}
            disabled={!selectedService}
          >
            Join Queue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
