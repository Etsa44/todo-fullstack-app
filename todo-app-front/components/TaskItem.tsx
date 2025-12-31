// components/TaskItem.tsx
"use client";

interface TaskItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task: any;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  task,
  onComplete,
  onDelete,
}: TaskItemProps) {
  // --- LE CORRECTIF EST ICI ---
  // Si task est undefined ou null, on n'affiche rien au lieu de crash
  if (!task) return null;

  return (
    <div
      className={`p-4 lg:w-xl bg-gray-100 rounded flex justify-between items-center gap-4 shadow-sm border-l-4 ${
        task.is_completed ? "border-green-500 opacity-75" : "border-blue-500"
      }`}
    >
      <div className="flex flex-col justify-center items-start gap-4">
        <section>
          {/* Style barré si terminé */}
          <h3
            className={`text-lg font-semibold lg:text-xl ${
              task.is_completed
                ? "line-through text-slate-400"
                : "text-slate-700"
            }`}
          >
            {task.title}
          </h3>
          <p
            className={`lg:text-lg ${
              task.is_completed ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {task.description}
          </p>
        </section>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-slate-700">
            Priority:
            <span
              className={`ml-2 ${
                task.priority === "high"
                  ? "text-red-600"
                  : task.priority === "medium"
                  ? "text-orange-500"
                  : "text-slate-500"
              }`}
            >
              {task.priority}
            </span>
          </span>

          <div className="flex gap-2">
            {!task.is_completed && (
              <button
                onClick={() => onComplete(task.id)}
                className="w-24 h-8 text-sm text-green-600 bg-green-400/30 rounded-lg hover:bg-green-500/30 transition cursor-pointer"
              >
                Done
              </button>
            )}
            <button
              onClick={() => onDelete(task.id)}
              className="w-24 h-8 text-sm text-red-600 bg-red-400/30 rounded-lg hover:bg-red-500/30 transition cursor-pointer"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <span
        className={`text-xs flex justify-center items-center lg:text-sm font-semibold h-5 w-24 rounded-2xl ${
          task.is_completed
            ? "text-green-500 bg-green-400/20"
            : "text-orange-500 bg-orange-400/20"
        }`}
      >
        {task.is_completed ? "Done" : "In progress"}
      </span>
    </div>
  );
}
