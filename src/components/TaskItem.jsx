import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export function TaskItem({ task, onToggle, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="group flex items-center justify-between p-4 glass rounded-lg mb-3 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggle(task.id)}
          className="border-brand-accent/30 data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
        />
        <span
          className={cn(
            "text-sm transition-all text-brand-dark",
            task.completed && "line-through text-brand-gray"
          )}
        >
          {task.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-brand-gray hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </motion.div>
  );
}