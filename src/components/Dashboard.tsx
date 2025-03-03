"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [elapsedTime, setElapsedTime] = useState(0);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (session?.user) {
      // @ts-expect-error session data error
      const startTime = session.user.totalLoginTime || 0;
      const loginTime = Date.now();

      const interval = setInterval(() => {
        setElapsedTime(startTime + Math.floor((Date.now() - loginTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}!</h1>
      <p className="text-xl mt-4">
        Total Login Time: {formatTime(elapsedTime)} seconds
      </p>
      <button
        onClick={() => {
          signOut();
        }}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}
