import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddTaskComponent
 from "./AddTask"; // Adjust the import path as needed

export default function TaskSection() {
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

    const handleAddTask = () => {
        setIsAddTaskOpen(true);
    };

    return (
        <>
            <Button
                className="w-30 md:w-full border rounded-xl py-5 bg-black"
                onClick={handleAddTask}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add Task
            </Button>

            {/* Render modal outside the button */}
            {isAddTaskOpen && (
                <AddTaskComponent
                    onClose={() => setIsAddTaskOpen(false)}
                    onTaskAdded={() => {
                        // Refresh your tasks list or update UI
                        setIsAddTaskOpen(false);
                    }}
                />
            )}
        </>
    );
}
