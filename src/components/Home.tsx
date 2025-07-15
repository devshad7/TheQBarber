import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <>
      <main className="h-screen w-full flex justify-center items-center gap-4">
        <Link href={"/dashboard/user"}>
          <Button className="cursor-pointer bg-[#363636]">User</Button>
        </Link>
        <Link href={"/dashboard/barber"}>
          <Button className="cursor-pointer bg-[#363636]">Barber</Button>
        </Link>
      </main>
    </>
  );
};

export default Home;
