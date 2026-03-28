import { useState, useEffect } from "react";
import { Event, Member, EventStatus, Task } from "@/data/mockData";
import { useData } from "@/hooks/useData";
import { TaskCard } from "@/components/TaskCard";
import { TaskEditDialog } from "@/components/TaskEditDialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Check, MapPin, Calendar, Users, X, Wallet, IndianRupee } from "lucide-react";
import { getInitials } from "@/lib/utils";

interface EventDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    event: Event | null;
    onSave: (event: Event) => void;
    onDelete: (eventId: string) => void;
    members: Member[];
}

export function EventDialog({ open, onOpenChange, event, onSave, onDelete, members }: EventDialogProps) {
    const { tasks, updateTask, addTask, deleteTask, events } = useData();
    const [form, setForm] = useState<Event | null>(null);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [taskEditOpen, setTaskEditOpen] = useState(false);

    const eventTasks = tasks.filter(t => t.event === form?.title && t.status === 'done');

    useEffect(() => {
        if (event) {
            setForm({
                ...event,
                budget: event.budget ?? 0,
                expenses: event.expenses ?? 0
            });
        } else {
            setForm({
                id: `event-${Date.now()}`,
                title: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
                venue: "",
                status: "upcoming",
                team: [],
                tasksTotal: 0,
                tasksDone: 0,
                coverColor: "200 80%",
                budget: 0,
                expenses: 0,
            });
        }
    }, [event, open]);

    if (!form) return null;

    const toggleTeamMember = (memberId: string) => {
        setForm((prev) =>
            prev
                ? {
                    ...prev,
                    team: prev.team.includes(memberId)
                        ? prev.team.filter((id) => id !== memberId)
                        : [...prev.team, memberId],
                }
                : prev
        );
    };

    const handleSave = () => {
        onSave(form);
        onOpenChange(false);
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
        setTaskEditOpen(true);
    };

    const handleSaveTask = (updated: Task) => {
        const exists = tasks.find(t => t.id === updated.id);
        if (exists) {
            updateTask(updated.id, updated);
        } else {
            addTask(updated);
        }
        setTaskEditOpen(false);
    };

    const handleDeleteTask = (taskId: string) => {
        deleteTask(taskId);
        setTaskEditOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl bg-card border-4 border-border rounded-none p-0 overflow-hidden shadow-brutal">
                <div className="h-4 w-full border-b-4 border-border" style={{ background: `hsl(${form.coverColor} 84% 48%)` }} />

                <div className="p-8">
                    <DialogHeader className="mb-8 border-b-4 border-border border-dashed pb-4">
                        <DialogTitle className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter">
                            {event ? "MODIFY EVENT" : "INITIALIZE EVENT"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[60vh] overflow-y-auto pr-4 scrollbar-thin">
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">Event Title</label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold h-12"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">Description</label>
                                <Textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold resize-none"
                                    rows={4}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">Date</label>
                                    <Input
                                        type="date"
                                        value={form.date}
                                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                                        className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">Status</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value as EventStatus })}
                                        className="w-full h-10 bg-background border-2 border-border text-[10px] font-black uppercase italic rounded-none text-foreground"
                                    >
                                        <option value="upcoming">UPCOMING</option>
                                        <option value="ongoing">ONGOING</option>
                                        <option value="completed">COMPLETED</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-2 block italic">Venue</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={form.venue}
                                        onChange={(e) => setForm({ ...form, venue: e.target.value })}
                                        className="bg-background border-2 border-border rounded-none pl-10 text-foreground text-sm font-bold shadow-brutal focus:shadow-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t-2 border-border border-dashed">
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-4 block italic flex items-center gap-2">
                                    <Wallet className="w-3 h-3 text-primary" />
                                    Financial Intel
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[8px] font-black text-muted-foreground uppercase mb-1 block">Allocated Budget</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                value={form.budget}
                                                onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                                                className="bg-background border-2 border-border rounded-none pl-8 text-foreground text-sm font-bold h-10"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-[8px] font-black text-muted-foreground uppercase mb-1 block">Actual Expenses</label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                            <Input
                                                type="number"
                                                value={form.expenses}
                                                onChange={(e) => setForm({ ...form, expenses: Number(e.target.value) })}
                                                className="bg-background border-2 border-border rounded-none pl-8 text-foreground text-sm font-bold h-10"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-3 block italic">Production Team</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {members.map((m) => {
                                        const selected = form.team.includes(m.id);
                                        return (
                                            <button
                                                key={m.id}
                                                type="button"
                                                onClick={() => toggleTeamMember(m.id)}
                                                className={`flex items-center gap-3 p-2 border-2 border-border text-[10px] font-black uppercase italic transition-all ${selected ? "bg-primary text-black shadow-brutal translate-x-[-1px] translate-y-[-1px]" : "bg-card text-foreground hover:bg-secondary"
                                                    }`}
                                            >
                                                <div className="w-8 h-8 border-2 border-border bg-background flex items-center justify-center text-[10px] text-foreground">
                                                    {getInitials(m.name)}
                                                </div>
                                                <div className="text-left">
                                                    <p>{m.name}</p>
                                                    <p className="text-[8px] text-muted-foreground">{m.role}</p>
                                                </div>
                                                {selected && <Check className="ml-auto w-4 h-4" />}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mission Log / Tasks Section */}
                            <div className="pt-6 border-t-2 border-border border-dashed">
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest mb-4 block italic flex items-center justify-between">
                                    <span>Mission Log</span>
                                    <span className="bg-background text-foreground px-2 border-2 border-border text-[8px]">{eventTasks.length} OBJECTIVES</span>
                                </label>
                                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                    {eventTasks.length > 0 ? (
                                        eventTasks.map(task => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                                members={members}
                                                onEdit={() => handleEditTask(task)}
                                            />
                                        ))
                                    ) : (
                                        <div className="py-8 border-2 border-border border-dashed flex flex-col items-center justify-center opacity-30 italic font-black uppercase text-center text-foreground">
                                            <p className="text-[8px] tracking-widest leading-relaxed">NO OBJECTIVES LOGGED</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <TaskEditDialog
                            task={editingTask}
                            open={taskEditOpen}
                            onClose={() => setTaskEditOpen(false)}
                            onSave={handleSaveTask}
                            onDelete={handleDeleteTask}
                            members={members}
                            events={events}
                        />
                    </div>

                    <DialogFooter className="mt-12 flex items-center justify-between gap-4 pt-6 border-t-4 border-border border-dashed">
                        {event && (
                            <button
                                onClick={() => { onDelete(form.id); onOpenChange(false); }}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-border bg-card text-destructive font-black uppercase italic text-[10px] shadow-[4px_4px_0px_0px_rgba(255,100,100,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                DELETE
                            </button>
                        )}
                        <div className="flex items-center gap-3 ml-auto">
                            <button onClick={() => onOpenChange(false)} className="px-6 py-2 border-2 border-transparent text-muted-foreground font-black uppercase italic text-[10px] hover:text-foreground">
                                ABORT
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-8 py-3 bg-foreground text-background border-2 border-border font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
                            >
                                EXECUTE SAVE
                            </button>
                        </div>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
