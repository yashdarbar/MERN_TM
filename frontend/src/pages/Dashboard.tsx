import AddTaskComponent from "@/components/AddTask";
import TaskSection from "@/components/TaskSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
    BriefcaseBusiness,
    Clock4,
    Filter,
    MoreHorizontal,
    Plus,
    TimerOff,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const { user, logout } = useAuth();
    

    return (
        <div>
            {/* <h1>Dashboard</h1> */}
            {/* <nav className="bg-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-semibold">
                                My App
                            </span>
                        </div>

                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">
                                    Welcome, {user.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav> */}
            <div className="flex-1">
                <div className="flex gap-4 mb-8 bg-gray-100 p-5 border rounded-2xl justify-between shadow-md">
                    {/* Search Bar */}
                    <div className="relative w-3/12 flex">
                        <Input
                            type="search"
                            placeholder="Search Project"
                            className="pl-8 bg-white border rounded-2xl shadow-md"
                        />
                        <svg
                            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />{" "}
                        </svg>
                    </div>
                    <div>
                        {user && (
                            <button
                                onClick={logout}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-4 rounded transition-colors mr-2"
                            >
                                Logout
                            </button>
                        )}
                        <Button variant="outline" className="bg-white">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>
                {/* Kanban Board */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-6">
                    {/* To Do Column */}
                    {/* Sidebar */}
                    <div className="md:w-64 bg-white p-4 ">
                        {/* Sidebar */}
                        <div className="md:space-y-4 flex md:flex-col">
                            <div className="flex flex-col p-4 rounded-lg bg-gray-100 shadow-md mx-4 md:mx-0">
                                <TimerOff className="h-14 w-14 text-white bg-red-500 border rounded-full p-3" />{" "}
                                <div className="text-red-500 font-medium my-2 mr-auto">
                                    Expired Tasks
                                </div>{" "}
                                <div className="text-2xl font-bold mr-auto">
                                    5
                                </div>{" "}
                            </div>{" "}
                            <div className="flex flex-col p-4 rounded-lg bg-gray-100 shadow-md mx-4 md:mx-0">
                                {" "}
                                <BriefcaseBusiness className="h-14 w-14 text-white bg-orange-500 border rounded-full p-3" />{" "}
                                <div className="text-orange-500 font-medium my-2 mr-auto">
                                    All Active Tasks
                                </div>{" "}
                                <div className="text-2xl font-bold mr-auto">
                                    7
                                </div>{" "}
                            </div>{" "}
                            <div className="flex flex-col p-4 rounded-lg bg-gray-100 shadow-md mx-4 md:mx-0">
                                {" "}
                                <Clock4 className="h-14 w-14 text-white bg-blue-500 border rounded-full p-3" />{" "}
                                <div className="text-blue-500 font-medium my-2 mr-auto">
                                    {"Completed Tasks "}
                                </div>{" "}
                                <div className="text-2xl font-bold mr-auto">
                                    2
                                </div>{" "}
                            </div>{" "}
                            {/* <Button className="w-30 md:w-full border rounded-xl py-5 bg-black">
                                <Plus className="mr-2 h-4 w-4" /> Add Task{" "}

                            </Button> */}
                            <TaskSection />
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-100 p-5 border rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <h2 className="font-semibold">To Do</h2>
                            <span className="text-sm text-gray-500">3</span>
                        </div>
                        <hr className="w-full h-1 bg-blue-500 border rounded-md mb-4" />
                        <div className="space-y-4">
                            {[
                                {
                                    label: "Low",
                                    title: "Brainstorming",
                                    description:
                                        "Brainstorming brings team members's ideas together",
                                    deadline: "12/5/24",
                                },
                                {
                                    label: "Low",
                                    title: "Research",
                                    description:
                                        "User research helps you to create an optimal product for users",
                                    deadline: "12/5/24",
                                },
                                {
                                    label: "High",
                                    title: "Wireframes",
                                    description:
                                        "Low fidelity wireframes include the most basic content and visuals",
                                    deadline: "12/5/24",
                                },
                            ].map((task, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span
                                                className={`text-sm border rounded-sm px-[4px] py-[1px]  ${
                                                    task.label === "High"
                                                        ? "text-red-500 bg-red-100"
                                                        : "text-blue-500 bg-blue-100"
                                                }`}
                                            >
                                                {task.label}
                                            </span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h3 className="font-semibold mb-1">
                                            {task.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">
                                            {task.description}
                                        </p>
                                        <div className="text-sm text-gray-500">
                                            Deadline: {task.deadline}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    {/* On Progress Column */}
                    <div className="flex flex-col bg-gray-100 p-5 border rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <h2 className="font-semibold">On Progress</h2>
                            <span className="text-sm text-gray-500">2</span>
                        </div>
                        <hr className="w-full h-1 bg-yellow-500 border rounded-md mb-4" />
                        <div className="space-y-4">
                            {[
                                {
                                    label: "High",
                                    title: "Onboarding Illustrations",
                                    deadline: "12/5/24",
                                },
                                {
                                    label: "High",
                                    title: "Moodboard",
                                    deadline: "12/5/24",
                                },
                            ].map((task, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm text-red-500 bg-red-50 border rounded-sm px-[4px] py-[1px]">
                                                {task.label}
                                            </span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h3 className="font-semibold mb-1">
                                            {task.title}
                                        </h3>
                                        <div className="text-sm text-gray-500">
                                            Deadline: {task.deadline}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    {/* Done Column */}
                    <div className="flex flex-col bg-gray-100 p-5 border rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <h2 className="font-semibold">Done</h2>
                            <span className="text-sm text-gray-500">2</span>
                        </div>
                        <hr className="w-full h-1 bg-green-500 border rounded-md mb-4" />
                        <div className="space-y-4">
                            {[
                                {
                                    label: "Completed",
                                    title: "Mobile App Design",
                                    deadline: "12/5/24",
                                },
                                {
                                    label: "Completed",
                                    title: "Design System",
                                    description:
                                        "It just needs to adapt the UI from what you did before",
                                    deadline: "12/5/24",
                                },
                            ].map((task, index) => (
                                <Card key={index}>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm text-green-500 border rounded-sm px-[4px] py-[1px] bg-green-50">
                                                {task.label}
                                            </span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h3 className="font-semibold mb-1">
                                            {task.title}
                                        </h3>
                                        {task.description && (
                                            <p className="text-sm text-gray-500 mb-2">
                                                {task.description}
                                            </p>
                                        )}
                                        <div className="text-sm text-gray-500">
                                            Deadline: {task.deadline}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
