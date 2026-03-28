import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Member, MemberRole } from "@/data/mockData";

interface MemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    member?: Member | null;
    onSave: (member: Member) => void;
}

const roles: MemberRole[] = ["Club Lead", "Coordinator", "Member", "Designer", "Developer"];
const teams = ["Lead", "Learning Coordination", "Women in Tech", "Outreach"];

export function MemberDialog({ open, onOpenChange, member, onSave }: MemberDialogProps) {
    const [formData, setFormData] = useState<Partial<Member>>({
        name: "",
        role: "Member",
        team: "Lead",
    });

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name,
                role: member.role,
                team: member.team,
            });
        } else {
            setFormData({
                name: "",
                role: "Member",
                team: "Lead",
            });
        }
    }, [member, open]);

    const handleSave = () => {
        if (!formData.name) return;

        onSave({
            id: member?.id || `m${Math.random().toString(36).substr(2, 9)}`,
            name: formData.name!,
            role: formData.role as MemberRole,
            team: formData.team!,
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-card border-4 border-border rounded-none p-0 overflow-hidden shadow-brutal">
                {/* Top accent bar */}
                <div className="h-4 w-full bg-primary border-b-4 border-border" />

                <div className="p-8">
                    <DialogHeader className="mb-8 border-b-4 border-border border-dashed pb-4">
                        <DialogTitle className="font-heading font-black text-2xl text-foreground uppercase italic tracking-tighter">
                            {member ? "MODIFY OPERATIVE" : "INITIALIZE OPERATIVE"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-foreground uppercase tracking-widest block italic">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="WHAT IS THEIR IDENTITY?"
                                className="bg-background border-2 border-border rounded-none text-foreground text-sm font-bold focus:shadow-brutal transition-all placeholder:text-muted-foreground h-12"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest block italic">
                                    Rank/Role
                                </label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(value) => setFormData({ ...formData, role: value as MemberRole })}
                                >
                                    <SelectTrigger className="w-full h-12 px-4 bg-background border-2 border-border text-[10px] font-black uppercase italic focus:outline-none focus:shadow-brutal transition-all rounded-none text-foreground">
                                        <SelectValue placeholder="SELECT RANK" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-4 border-border rounded-none shadow-brutal p-0">
                                        {roles.map((role) => (
                                            <SelectItem key={role} value={role} className="p-4 focus:bg-primary font-black uppercase italic text-xs rounded-none border-b-2 last:border-0 border-border text-foreground">
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-foreground uppercase tracking-widest block italic">
                                    Sector/Team
                                </label>
                                <Select
                                    value={formData.team}
                                    onValueChange={(value) => setFormData({ ...formData, team: value })}
                                >
                                    <SelectTrigger className="w-full h-12 px-4 bg-background border-2 border-border text-[10px] font-black uppercase italic focus:outline-none focus:shadow-brutal transition-all rounded-none text-foreground">
                                        <SelectValue placeholder="SELECT SECTOR" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-4 border-border rounded-none shadow-brutal p-0">
                                        {teams.map((team) => (
                                            <SelectItem key={team} value={team} className="p-4 focus:bg-primary font-black uppercase italic text-xs rounded-none border-b-2 last:border-0 border-border text-foreground">
                                                {team}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="mt-12 flex items-center justify-end gap-4 pt-6 border-t-4 border-border border-dashed">
                        <button
                            onClick={() => onOpenChange(false)}
                            className="px-6 py-2 border-2 border-transparent text-muted-foreground font-black uppercase italic text-[10px] hover:text-foreground"
                        >
                            ABORT
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-8 py-3 bg-foreground text-background border-2 border-border font-black uppercase italic text-[10px] shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none transition-all"
                        >
                            {member ? "UPDATE DATA" : "INITIALIZE ENTRY"}
                        </button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}
