import { useState, useEffect } from "react";
import { Task, Priority, TaskStatus, Member, Event } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, X, Check, Calendar, Flag, UserPlus, Info } from "lucide-react";
import { getInitials } from "@/lib/utils";

const priorities: Priority[] = ["high", "medium", "low"];
const statuses: TaskStatus[] = ["todo", "in-progress", "review", "done"];

const statusLabels: Record<TaskStatus, string> = {
  "todo": "To Do",
  "in-progress": "In Progress",
  "review": "Review",
  "done": "Done",
};

interface TaskEditDialogProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
  members: Member[];
  events: Event[];
}

export function TaskEditDialog({ task, open, onClose, onSave, onDelete, members, events }: TaskEditDialogProps) {
  const [form, setForm] = useState<Task | null>(null);

  useEffect(() => {
    setForm(task ? { ...task } : null);
  }, [task, open]);

  if (!form) return null;

  const toggleAssignee = (memberId: string) => {
    setForm((prev) =>
      prev
        ? {
          ...prev,
          assignees: prev.assignees.includes(memberId)
            ? prev.assignees.filter((id) => id !== memberId)
            : [...prev.assignees, memberId],
        }
        : prev
    );
  };

  const toggleInvolved = (memberId: string) => {
    setForm((prev) =>
      prev
        ? {
          ...prev,
          involvedIds: (prev.involvedIds || []).includes(memberId)
            ? (prev.involvedIds || []).filter((id) => id !== memberId)
            : [...(prev.involvedIds || []), memberId],
        }
        : prev
    );
  };

  const handleSave = () => {
    if (form) {
      onSave(form);
      onClose();
    }
  };

  const handleDelete = () => {
    if (form) {
      onDelete(form.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-xl bg-card border-4 border-border rounded-none p-0 overflow-hidden shadow-brutal">
        {/* Top accent bar */}
        <div className="h-4 w-full bg-primary border-b-4 border-border" />

        <div className="p-8">
          <DialogHeader className="mb-8 border-b-4 border-border border-dashed pb-4">
            <DialogTitle className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter">
              {task?.id.startsWith('new-') ? 'INITIALIZE OBJECTIVE' : 'MODIFY OBJECTIVE'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin">
            {/* Title */}
            <div>
              <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                Title
              </label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold focus:shadow-brutal transition-all placeholder:text-muted-foreground h-12"
                placeholder="WHAT NEEDS TO BE DONE?"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                Description
              </label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold resize-none focus:shadow-brutal transition-all placeholder:text-muted-foreground"
                rows={4}
                placeholder="GIVE SOME MORE CONTEXT..."
              />
            </div>

            {/* Priority + Status row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                  Priority
                </label>
                <div className="flex flex-col gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm({ ...form, priority: p })}
                      className={`flex items-center justify-between px-4 py-2 border-2 border-border text-[10px] font-black uppercase italic transition-all ${form.priority === p
                        ? p === "high" ? "bg-destructive text-white" : p === "medium" ? "bg-warning text-black" : "bg-success text-black"
                        : "bg-card text-foreground hover:bg-secondary"
                        }`}
                    >
                      {p}
                      {form.priority === p && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                  Status
                </label>
                <div className="flex flex-col gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, status: s })}
                      className={`flex items-center justify-between px-4 py-2 border-2 border-border text-[10px] font-black uppercase italic transition-all ${form.status === s
                        ? "bg-foreground text-background"
                        : "bg-card text-foreground hover:bg-secondary"
                        }`}
                    >
                      {statusLabels[s]}
                      {form.status === s && <Check className="w-3 h-3" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Deadline + Event row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                  Deadline
                </label>
                <Input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                  className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold h-12"
                />
              </div>
              <div>
                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">
                  Event
                </label>
                <div className="relative">
                  <select
                    value={form.event}
                    onChange={(e) => setForm({ ...form, event: e.target.value })}
                    className="w-full h-12 px-4 bg-background border-2 border-border text-[10px] font-black uppercase italic focus:outline-none focus:shadow-brutal transition-all appearance-none rounded-none text-foreground"
                  >
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.title}>{ev.title.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Assignees */}
            <div>
              <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-3 block italic">
                Team Distribution
              </label>
              <div className="grid grid-cols-2 gap-3">
                {members.map((m) => {
                  const selected = form.assignees.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => toggleAssignee(m.id)}
                      className={`flex items-center gap-3 p-2 border-2 border-border text-[10px] font-black uppercase italic transition-all ${selected
                        ? "bg-primary text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                        : "bg-card text-foreground hover:bg-secondary"
                        }`}
                    >
                      <div className={`w-8 h-8 border-2 border-border flex items-center justify-center text-[10px] font-black bg-background`}>
                        {getInitials(m.name)}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <p className="truncate">{m.name}</p>
                        <p className="text-[8px] text-muted-foreground leading-none mt-1">{m.role}</p>
                      </div>
                      {selected && <Check className="w-3 h-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Involved in Completion (Only if done) */}
            {form.status === 'done' && (
              <div className="pt-6 border-t-2 border-border border-dashed animate-in fade-in slide-in-from-top-4 duration-500">
                <label className="text-[10px] font-black text-success uppercase tracking-widest mb-3 block italic flex items-center gap-2">
                  <UserPlus className="w-3 h-3" />
                  Operatives Involved in Completion
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {members.map((m) => {
                    const selected = (form.involvedIds || []).includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => toggleInvolved(m.id)}
                        className={`flex items-center gap-3 p-2 border-2 border-border text-[10px] font-black uppercase italic transition-all ${selected
                          ? "bg-success text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]"
                          : "bg-card text-foreground hover:bg-secondary"
                          }`}
                      >
                        <div className={`w-8 h-8 border-2 border-border flex items-center justify-center text-[10px] font-black bg-background`}>
                          {getInitials(m.name)}
                        </div>
                        <div className="text-left flex-1 min-w-0">
                          <p className="truncate">{m.name}</p>
                          <p className="text-[8px] text-muted-foreground leading-none mt-1">{m.role}</p>
                        </div>
                        {selected && <Check className="w-3 h-3" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-12 flex items-center justify-between gap-4 pt-6 border-t-4 border-border border-dashed">
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-card text-destructive font-black uppercase italic text-[10px] shadow-[4px_4px_0px_0px_rgba(255,100,100,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
            >
              <Trash2 className="w-4 h-4" />
              TERMINATE
            </button>
            <div className="flex items-center gap-3 ml-auto">
              <button onClick={onClose} className="px-6 py-2 border-2 border-transparent text-muted-foreground font-black uppercase italic text-[10px] hover:text-foreground">
                ABORT
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-foreground text-background border-2 border-border font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
              >
                COMMIT CHANGES
              </button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
