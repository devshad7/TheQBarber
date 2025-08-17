"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@radix-ui/react-separator";

interface Props {
  drawerOpen: boolean;
  setDrawerOpen: (val: boolean) => void;
  selectedShop: { id: string; name: string; coords: [number, number] } | null;
  queues: Record<string, { size: number }>;
}

export default function ShopDrawer({
  drawerOpen,
  setDrawerOpen,
  selectedShop,
  queues,
}: Props) {
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="pb-6 z-[9999]">
        <DrawerHeader>
          <DrawerTitle className="text-primary">
            {selectedShop ? selectedShop.name : "Shop"}
          </DrawerTitle>
          <Separator className="my-4" />
          <DrawerDescription className="flex flex-col">
            <span>
              Current Waiting:{" "}
              {selectedShop?.id ? queues[selectedShop.id]?.size || 0 : 0}
            </span>
            <span>Status: Open until 9 PM</span>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="flex items-center flex-row justify-between">
          <DrawerClose asChild>
            <span className="px-4 flex rounded-full justify-center items-center py-2 w-full border">
              Close
            </span>
          </DrawerClose>
          <button className="px-4 w-full py-2 flex rounded-full justify-center items-center border bg-rose-700 text-white">
            Navigate
          </button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
