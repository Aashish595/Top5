"use client";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-2">Welcome</h2>
        <p className="text-muted-foreground">
          This is the home page content. Navigate to the Category page using the
          sidebar.
        </p>
       
      </Card>
    </div>
  );
}
