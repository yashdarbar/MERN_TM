import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useState, FormEvent } from "react";
//import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import toast from "react-hot-toast";

// Create axios instance with default config
const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

interface AddTaskProps {
    onClose: () => void;
    onTaskAdded?: () => void;
}

export default function AddTaskComponent({
    onClose,
    onTaskAdded,
}: AddTaskProps) {
    //const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        assignedTo: "",
        priority: "medium", // Added default priority
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post("/tasks", {
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                priority: formData.priority,
            });
            console.log("res", response);
            toast.success("Task created successfully");

            onTaskAdded?.();
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error("Failed to create task");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <Card className="w-full max-w-lg bg-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        ADD TASK
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </Button>
                </CardHeader>
                <CardContent className="pt-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label
                                htmlFor="title"
                                className="text-xs font-bold text-gray-500"
                            >
                                TASK TITLE
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter task title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="description"
                                className="text-xs font-bold text-gray-500"
                            >
                                DESCRIPTION
                            </Label>
                            <Textarea
                                id="description"
                                className="min-h-[200px] resize-none"
                                placeholder="Enter task description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label
                                    htmlFor="dueDate"
                                    className="text-sm text-gray-500"
                                >
                                    Deadline
                                </Label>
                                <Input
                                    id="dueDate"
                                    type="date"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                {/* <Label
                                    htmlFor="priority"
                                    className="text-sm text-gray-500"
                                >
                                    Priority
                                </Label>
                                <select
                                    id="priority"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    value={formData.priority}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select> */}
                            </div>
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : "Add Task"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
