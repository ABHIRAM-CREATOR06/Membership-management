import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { TaskCard } from "@/components/TaskCard";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import { Task, TaskStatus, Priority } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus, SlidersHorizontal, Zap } from "lucide-react";
import { useData } from "@/hooks/useData";

const statusCols: { status: TaskStatus; label: string; color: string }[] = [
  { status: "todo", label: "TO DO", color: "bg-white" },
  { status: "in-progress", label: "IN PROGRESS", color: "bg-info" },
  { status: "review", label: "REVIEW", color: "bg-warning" },
];

const priorities: Priority[] = ["high", "medium", "low"];
const priorityLabel: Record<Priority, string> = { high: "High", medium: "Medium", low: "Low" };

export default function Tasks() {
  const { tasks, members, events, addTask, updateTask, deleteTask } = useData();
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [filterEvent, setFilterEvent] = useState<string>("all");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const activeEvents = events.filter(e => e.status !== 'completed');
  const uniqueEvents = [...new Set(activeEvents.map((e) => e.title))];

  const filteredTasks = tasks.filter((t) => {
    const priorityOk = filterPriority === "all" || t.priority === filterPriority;
    const eventOk = filterEvent === "all" || t.event === filterEvent;
    const notDone = t.status !== "done";
    return priorityOk && eventOk && notDone;
  });

  /* ── Drag handlers ── */
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggingId(taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(status);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    if (!draggingId) return;
    updateTask(draggingId, { status });
    setDraggingId(null);
    setDragOverCol(null);
  };

  const handleDragLeave = () => setDragOverCol(null);

  /* ── Edit handlers ── */
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditOpen(true);
  };

  const handleSave = (updated: Task) => {
    const exists = tasks.find(t => t.id === updated.id);
    if (exists) {
      updateTask(updated.id, updated);
    } else {
      addTask(updated);
    }
    setEditOpen(false);
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
    setEditOpen(false);
  };

  const handleAddTask = (status: TaskStatus) => {
    const newTask: Task = {
      id: `new-${Date.now()}`,
      title: "",
      description: "",
      priority: "medium",
      status,
      deadline: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      assignees: [],
      event: events.length > 0 ? events[0].title : "CodeRush Hackathon",
      comments: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setEditingTask(newTask);
    setEditOpen(true);
  };

  return (
    <AppLayout
      title="TASKS"
      subtitle={`${tasks.filter(t => t.status !== 'done').length} OBJECTIVES IN MOTION`}
      actions={
        <Button
          className="bg-primary text-black border-2 border-border rounded-none shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] font-black uppercase italic text-xs hover:bg-primary/90"
          onClick={() => handleAddTask("todo")}
        >
          <Plus className="w-4 h-4" />
          NEW OBJECTIVE
        </Button>
      }
    >
      {/* Filters */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase italic text-muted-foreground">
          <SlidersHorizontal className="w-4 h-4" />
          <span>FILTER BY:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterPriority("all")}
            className={`text-[10px] px-4 py-2 border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${filterPriority === "all"
              ? "bg-primary text-black"
              : "bg-card text-foreground hover:bg-secondary"
              }`}
          >
            ALL PRIORITIES
          </button>
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p === filterPriority ? "all" : p)}
              className={`text-[10px] px-4 py-2 border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${filterPriority === p
                ? p === "high" ? "bg-destructive text-white" : p === "medium" ? "bg-warning text-black" : "bg-success text-black"
                : "bg-card text-foreground hover:bg-secondary"
                }`}
            >
              {priorityLabel[p].toUpperCase()}
            </button>
          ))}
        </div>

        <div className="h-4 w-1 bg-border mx-2" />

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterEvent("all")}
            className={`text-[10px] px-4 py-2 border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${filterEvent === "all"
              ? "bg-primary text-black"
              : "bg-card text-foreground hover:bg-secondary"
              }`}
          >
            ALL EVENTS
          </button>
          {uniqueEvents.map((ev) => (
            <button
              key={ev}
              onClick={() => setFilterEvent(ev === filterEvent ? "all" : ev)}
              className={`text-[10px] px-4 py-2 border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${filterEvent === ev
                ? "bg-accent text-white"
                : "bg-card text-foreground hover:bg-secondary"
                }`}
            >
              {ev.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      <div className="flex gap-8 overflow-x-auto pb-8 scrollbar-thin">
        {statusCols.map(({ status, label, color }) => {
          const colTasks = filteredTasks.filter((t) => t.status === status);
          const isOver = dragOverCol === status;

          return (
            <div
              key={status}
              className={`flex-shrink-0 w-[320px] bg-card border-4 border-border shadow-brutal flex flex-col min-h-[550px] transition-all ${isOver ? "bg-secondary/50 translate-x-1 translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" : ""}`}
              onDragOver={(e) => handleDragOver(e, status)}
              onDrop={(e) => handleDrop(e, status)}
              onDragLeave={handleDragLeave}
            >
              {/* Column header */}
              <div className={`p-5 border-b-4 border-border flex items-center justify-between ${color}`}>
                <h3 className="font-heading font-black text-black uppercase italic tracking-tighter text-lg leading-none">{label}</h3>
                <span className="bg-background text-foreground px-2 py-0.5 border-2 border-border text-[10px] font-black italic">
                  {colTasks.length} OBJECTIVES
                </span>
              </div>

              {/* Task list */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin">
                {colTasks.length === 0 && !isOver ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-20 opacity-20 italic font-black uppercase text-center px-4 text-foreground">
                    <Zap className="w-12 h-12 mb-4" />
                    <p className="text-[10px] tracking-widest leading-relaxed text-balance">ZONE STATUS: CLEAR</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task.id)}
                    >
                      <TaskCard
                        task={task}
                        members={members}
                        onEdit={() => handleEdit(task)}
                      />
                    </div>
                  ))
                )}
              </div>

              {/* Add task button in column */}
              <div className="p-4 mt-auto border-t-2 border-border border-dashed">
                <button
                  onClick={() => handleAddTask(status)}
                  className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all py-3 px-3 rounded-none border-2 border-transparent hover:border-border hover:bg-secondary group"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                  INITIALIZE TASK
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <TaskEditDialog
        task={editingTask}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
        members={members}
        events={events}
      />
    </AppLayout>
  );
}
