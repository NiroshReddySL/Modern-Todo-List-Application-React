import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskList } from "@/components/TaskList";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { CheckCircle, ListTodo, PlusCircle } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task = {
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

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed from your list.",
      variant: "destructive",
    });
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-background to-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-brand-primary text-white">
            <ListTodo className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
            Task Master
          </h1>
        </div>

        <div className="glass p-6 rounded-xl mb-6 shadow-lg">
          <form onSubmit={addTask} className="flex gap-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 border-brand-accent/20 focus-visible:ring-brand-primary"
            />
            <Button 
              type="submit"
              className="bg-brand-primary hover:bg-brand-secondary transition-colors"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Add
            </Button>
          </form>
        </div>

        <div className="glass p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-brand-dark">Your Tasks</h2>
            <div className="flex items-center gap-2 text-sm bg-brand-light/50 text-brand-primary px-3 py-1.5 rounded-full">
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