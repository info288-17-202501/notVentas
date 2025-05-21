'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
      const [isVerified, setIsVerified] = useState(false);
    
      useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
        } else {
          setIsVerified(true);
        }
      }, [router]);
    
      if (!isVerified) {
        return null; // O puedes mostrar un loader si prefieres
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="mt-4 text-lg">Welcome to the dashboard!</p>
        </div>
    );
}