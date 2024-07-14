import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import Layout from "@/components/main-layout";
import { useDarkMode } from "@/context/DarkModeContext";

export default function Component() {
  const { darkMode: isDarkMode } = useDarkMode();

  return (
    <Layout>
      <div className={`flex items-center justify-center min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <Card className={`w-full max-w-xl rounded-lg overflow-hidden shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"} transition duration-300 ease-in-out transform hover:scale-105`}>
          <CardHeader>
            <CardTitle>Edit Book Borrow</CardTitle>
            <CardDescription>Update the borrow details.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="borrow-date">Borrow Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className={`outline ${isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900"} w-full justify-start hover:bg-gray-700 transition duration-200`}>
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>2023-05-01</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`w-auto p-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`} align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className={`outline ${isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900"} w-full justify-start hover:bg-gray-700 transition duration-200`}>
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>2023-05-15</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className={`w-auto p-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`} align="start">
                    <Calendar mode="single" />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="return-date">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className={`outline ${isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900"} w-full justify-start hover:bg-gray-700 transition duration-200`}>
                    <CalendarDaysIcon className="mr-2 h-4 w-4" />
                    <span className={`text-sm ${isDarkMode ? "text-white" : "text-gray-900"}`}>2023-05-20</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className={`w-auto p-2 ${isDarkMode ? "bg-gray-700" : "bg-white"}`} align="start">
                  <Calendar mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end mt-4">
            <Button className={`outline ${isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900"} w-full justify-start hover:bg-gray-700 transition duration-200`}>Cancel</Button>
            <Button type="submit" className={`ml-2 hover:bg-gray-700 transition duration-200 ${isDarkMode ? "bg-gray-700 text-white" : "bg-blue-500 text-white"}`}>
              Save Borrow
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}

function CalendarDaysIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
