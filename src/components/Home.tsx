import { Button } from "@/components/ui/button";
import { Scissors, User, ArrowRight } from "lucide-react";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import Link from "next/link";

const Home = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl w-full">
        <Card className="text-left">
          <CardHeader>
            <User className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle className="text-2xl font-bold">I'm a Customer</CardTitle>
            <CardDescription>
              Want to skip the wait? Join the queue from anywhere.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/dashboard/user"}>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer">
                Join a Queue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="text-left">
          <CardHeader>
            <Scissors className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="text-2xl font-bold">I'm a Barber</CardTitle>
            <CardDescription>
              Ready to streamline your shop? Manage your queue with ease.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/dashboard/barber"}>
              <Button
                variant="outline"
                className="w-full border-green-600 text-green-600 hover:bg-green-50 hover:text-green-700 bg-transparent cursor-pointer"
              >
                Manage My Shop <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
