import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center justify-between p-4 glass rounded-lg mb-3"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
        />
        <span
          className={cn(
            "text-sm transition-all",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive/80"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}