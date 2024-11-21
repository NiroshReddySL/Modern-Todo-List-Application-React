import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/TaskList";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CheckCircle, ListTodo, PlusCircle } from "lucide-react";
import { Task } from "@/types/task";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTask("");
    toast({
      title: "Task added",
      description: "Your new task has been added to the list.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <ListTodo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Task Master</h1>
        </div>

        <div className="glass p-6 rounded-xl mb-6">
          <form onSubmit={addTask} className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1"
            />
            <Button type="submit">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add
            </Button>
          </form>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Your Tasks</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>
                {completedTasks} of {tasks.length} completed
              </span>
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;