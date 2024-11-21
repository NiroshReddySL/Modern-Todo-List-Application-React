import { AnimatePresence } from "framer-motion";
import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className="mt-6">
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
      {tasks.length === 0 && (
        <p className="text-center text-muted-foreground text-sm">
          No tasks yet. Add one above!
        </p>
      )}
    </div>
  );
}