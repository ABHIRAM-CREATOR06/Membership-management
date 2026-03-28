import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Member, Task, members } from "@/data/mockData";
import { getInitials, getMemberStats } from "@/lib/utils";
import {
    TrendingUp,
    CheckSquare,
    Clock,
    Zap,
    Target,
    Award,
    ChevronRight
} from "lucide-react";

interface MemberPortfolioDialogProps {
    member: Member | null;
    open: boolean;
    onClose: () => void;
    tasks: Task[];
}

export function MemberPortfolioDialog({ member, open, onClose, tasks }: MemberPortfolioDialogProps) {
    if (!member) return null;

    const memberTasks = tasks.filter(t => t.assignees.includes(member.id));
    const { assigned, secured, failed, efficiency: completionRate } = getMemberStats(member.id, tasks);
    const victories = tasks.filter(t => t.status === "done" && t.assignees.includes(member.id) && (t.involvedIds || []).includes(member.id));
    const failures = tasks.filter(t => t.status === "done" && t.assignees.includes(member.id) && !(t.involvedIds || []).includes(member.id));
    const activeTasks = memberTasks.filter(t => t.status !== "done");

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-3xl bg-card border-4 border-border rounded-none p-0 overflow-hidden shadow-brutal max-h-[90vh] flex flex-col">
                {/* Header Section */}
                <div className="bg-primary p-8 border-b-4 border-border relative overflow-hidden shrink-0">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-background/10 rounded-full -mr-32 -mt-32 blur-3xl" />

                    <div className="relative flex items-end gap-6">
                        <div className="w-32 h-32 bg-background border-4 border-border flex items-center justify-center text-4xl font-black italic shadow-brutal">
                            {getInitials(member.name)}
                        </div>
                        <div className="flex-1 pb-2">
                            <div className="inline-block px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase italic mb-3 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]">
                                {member.role}
                            </div>
                            <h2 className="text-4xl font-black text-black uppercase italic tracking-tighter leading-none mb-1">
                                {member.name}
                            </h2>
                            <p className="text-sm font-black text-black/60 uppercase italic tracking-widest">
                                SECTOR: {member.team}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-thin">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card border-4 border-border p-5 shadow-brutal">
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase italic text-muted-foreground">ASSIGNED</span>
                            </div>
                            <p className="text-3xl font-black italic leading-none text-foreground">{assigned} TOTAL</p>
                        </div>

                        <div className="bg-card border-4 border-border p-5 shadow-brutal">
                            <div className="flex items-center gap-2 mb-2">
                                <Award className="w-4 h-4 text-success" />
                                <span className="text-[10px] font-black uppercase italic text-muted-foreground">SECURED / FAILED</span>
                            </div>
                            <p className="text-3xl font-black italic leading-none text-foreground">{secured} / <span className="text-destructive">{failed}</span></p>
                        </div>

                        <div className="bg-card border-4 border-border p-5 shadow-brutal">
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-4 h-4 text-info" />
                                <span className="text-[10px] font-black uppercase italic text-muted-foreground">EFFICIENCY</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-3xl font-black italic leading-none text-foreground">{completionRate}%</p>
                                <div className="flex-1 h-4 border-2 border-border bg-background mb-1 overflow-hidden">
                                    <div
                                        className="h-full bg-primary border-r-2 border-border"
                                        style={{ width: `${completionRate}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Objectives */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">IN-FLIGHT OBJECTIVES</h3>
                            <div className="flex-1 h-1 bg-border" />
                        </div>

                        <div className="space-y-4">
                            {activeTasks.length > 0 ? (
                                activeTasks.map(task => (
                                    <div key={task.id} className="flex items-center gap-4 p-4 border-4 border-border bg-card hover:bg-secondary transition-colors group cursor-pointer shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none">
                                        <div className={`w-3 h-3 border-2 border-border shrink-0 ${task.status === 'in-progress' ? 'bg-info' : task.status === 'review' ? 'bg-warning' : 'bg-background'}`} />
                                        <div className="flex-1">
                                            <h4 className="font-black text-sm uppercase italic leading-none mb-1 group-hover:underline text-foreground">{task.title}</h4>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{task.event}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-black bg-foreground text-background px-2 py-1 italic">
                                            <Clock className="w-3 h-3" />
                                            DUE: {task.deadline}
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-foreground transition-opacity" />
                                    </div>
                                ))
                            ) : (
                                <div className="py-12 border-4 border-border border-dashed flex flex-col items-center justify-center opacity-20 italic font-black uppercase text-foreground">
                                    <Zap className="w-8 h-8 mb-4" />
                                    ZONE CLEAR
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Legacy Objectives */}
                    <section>
                        <div className="flex items-center gap-4 mb-6">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">SECURED OBJECTIVES</h3>
                            <div className="flex-1 h-1 bg-border" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[...victories, ...failures].length > 0 ? (
                                [...victories, ...failures].map(task => {
                                    const isFailure = failures.some(f => f.id === task.id);
                                    return (
                                        <div key={task.id} className={`p-4 border-2 border-border relative overflow-hidden group bg-secondary ${isFailure ? 'border-l-4 border-l-destructive' : 'border-l-4 border-l-emerald-700 dark:border-l-success'}`}>
                                            <div className={`absolute top-0 right-0 p-1 border-l-2 border-b-2 border-border ${isFailure ? 'bg-destructive' : 'bg-emerald-600 dark:bg-success'}`}>
                                                <Award className={`w-3 h-3 text-white`} />
                                            </div>
                                            <h4 className={`font-black text-[11px] uppercase italic leading-tight mb-1 ${isFailure ? 'text-destructive' : 'text-emerald-700 dark:text-success'}`}>
                                                {task.title} {isFailure && "(FAILED)"}
                                            </h4>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{task.event}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full py-8 text-center opacity-10 italic font-black uppercase text-xs text-foreground">
                                    NO DATA RECOVERED
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="p-6 border-t-4 border-border bg-card shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-foreground text-background border-2 border-border font-black uppercase italic tracking-widest text-xs hover:opacity-90 shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
                    >
                        DISMISS PORTFOLIO
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
