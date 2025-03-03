"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

import TopUsersChart from "./TopUsersChart";
export function Landing() {
  return (
    <>
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            Let&apos;s Check Your{" "}
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">LogIn Time.</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">LogIn Time.</span>
              </div>
            </div>
          </h2>
          <Button
            className=" px-10 py-6 text-2xl font-semibold "
            onClick={() => {
              signIn();
            }}
          >
            LogIn
          </Button>
        </div>
      </BackgroundBeamsWithCollision>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800">
        <h1 className="text-3xl font-bold">Top User</h1>
        <TopUsersChart />
      </div>
    </>
  );
}
