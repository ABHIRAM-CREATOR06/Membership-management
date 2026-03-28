import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, TrendingUp, Users, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import { MemberRole, Member } from "@/data/mockData";
import { useData } from "@/hooks/useData";
import { useState } from "react";
import { MemberDialog } from "@/components/MemberDialog";
import { MemberPortfolioDialog } from "@/components/MemberPortfolioDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitials, getMemberStats } from "@/lib/utils";

const roleColors: Record<MemberRole, string> = {
  "Club Lead": "bg-primary text-black border-border",
  "Coordinator": "bg-info text-black border-border",
  "Developer": "bg-warning text-black border-border",
  "Designer": "bg-success text-black border-border",
  "Member": "bg-secondary text-black border-border",
};

const teams = ["All", "Lead", "Learning Coordination", "Women in Tech", "Outreach"];

export default function Members() {
  const { members, tasks, addMember, updateMember, deleteMember } = useData();
  const [activeTeam, setActiveTeam] = useState("All");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [viewingMember, setViewingMember] = useState<Member | null>(null);

  const filtered = activeTeam === "All" ? members : members.filter((m) => m.team === activeTeam);

  const handleAddMember = () => {
    setEditingMember(null);
    setIsDialogOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsDialogOpen(true);
  };

  const handleSaveMember = (member: Member) => {
    if (editingMember) {
      updateMember(member.id, member);
    } else {
      addMember(member);
    }
  };

  const handleOpenPortfolio = (member: Member) => {
    setViewingMember(member);
    setIsPortfolioOpen(true);
  };

  return (
    <AppLayout
      title="TEAM DIRECTORY"
      subtitle={`${members.length} OPERATIVES ACTIVE`}
      actions={
        <Button
          className="bg-primary text-black border-2 border-border rounded-none shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] font-black uppercase italic text-xs hover:bg-primary/90"
          onClick={handleAddMember}
        >
          <Plus className="w-4 h-4" />
          NEW OPERATIVE
        </Button>
      }
    >
      <MemberDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        member={editingMember}
        onSave={handleSaveMember}
      />

      <MemberPortfolioDialog
        member={viewingMember}
        open={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        tasks={tasks}
      />

      {/* Team filter tabs */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        {teams.map((team) => (
          <button
            key={team}
            onClick={() => setActiveTeam(team)}
            className={`text-[10px] px-6 py-2.5 rounded-none border-2 border-border font-black uppercase italic transition-all shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${activeTeam === team
              ? "bg-primary text-black"
              : "bg-card text-foreground hover:bg-secondary"
              }`}
          >
            {team}
            {team !== "All" && (
              <span className="ml-2 bg-background text-foreground px-2 border-2 border-border">
                {members.filter((m) => m.team === team).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Team stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { team: "LEAD", count: members.filter((m) => m.team === "Lead").length, color: "bg-primary" },
          { team: "COORDINATION", count: members.filter((m) => m.team === "Learning Coordination").length, color: "bg-info" },
          { team: "WIT", count: members.filter((m) => m.team === "Women in Tech").length, color: "bg-success" },
          { team: "OUTREACH", count: members.filter((m) => m.team === "Outreach").length, color: "bg-warning" },
        ].map(({ team, count, color }) => (
          <div key={team} className="bg-card border-4 border-border p-5 shadow-brutal">
            <div className="flex items-center gap-2 mb-3 text-foreground">
              <div className={`w-3.5 h-3.5 border-2 border-border shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.2)] ${color}`} />
              <span className="text-[10px] font-black uppercase tracking-widest">{team} COMMAND</span>
            </div>
            <p className="text-5xl font-black italic uppercase tracking-tighter leading-none text-foreground">{count}</p>
          </div>
        ))}
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map((member) => {
          const stats = getMemberStats(member.id, tasks);

          return (
            <div
              key={member.id}
              onClick={() => handleOpenPortfolio(member)}
              className="bg-card border-4 border-border p-6 hover:shadow-brutal hover:-translate-x-1 hover:-translate-y-1 transition-all duration-300 shadow-brutal group relative overflow-hidden cursor-pointer"
            >
              {/* Actions */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <button className="h-10 w-10 border-2 border-border rounded-none bg-background hover:bg-primary transition-all flex items-center justify-center shadow-brutal active:shadow-none">
                      <MoreHorizontal className="h-5 w-5 text-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-4 border-border rounded-none shadow-brutal p-0">
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMember(member);
                      }}
                      className="gap-3 p-4 focus:bg-primary font-black uppercase italic text-xs rounded-none border-b-2 border-border text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                      MODIFY DATA
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMember(member.id);
                      }}
                      className="gap-3 p-4 text-destructive focus:bg-destructive focus:text-white font-black uppercase italic text-xs rounded-none"
                    >
                      <Trash2 className="h-4 w-4" />
                      PURGE RECORD
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Avatar + name */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-20 h-20 border-4 border-border bg-background flex items-center justify-center text-foreground font-black italic text-2xl shadow-brutal group-hover:bg-primary transition-colors">
                  {getInitials(member.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-black text-foreground text-xl uppercase italic leading-none mb-3 truncate group-hover:underline underline-offset-4">{member.name}</h4>
                  <div className={`inline-block px-2 py-1 border-2 border-border text-[10px] font-black uppercase italic shadow-brutal ${roleColors[member.role] || "bg-secondary"}`}>
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="mb-8 bg-foreground text-background p-2 inline-block shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]">
                <p className="text-[10px] font-black uppercase tracking-tighter italic">
                  SECTOR: <span className="bg-background text-foreground px-1 ml-1">{member.team}</span>
                </p>
              </div>

              {/* Task progress */}
              <div className="mb-2">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black uppercase flex items-center gap-1 italic text-foreground">
                    <TrendingUp className="w-4 h-4" />
                    BATTLE EFFICIENCY
                  </span>
                  <span className="text-[10px] font-black bg-foreground text-background px-2 py-0.5">
                    {stats.efficiency}%
                  </span>
                </div>
                <div className="w-full h-6 bg-background border-4 border-border relative overflow-hidden">
                  <div
                    className="h-full bg-primary border-r-4 border-border transition-all duration-1000"
                    style={{ width: `${stats.efficiency}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-1 mt-3">
                  <div className="border-2 border-border bg-secondary p-1.5 text-center">
                    <p className="text-[8px] font-black uppercase italic text-muted-foreground">ASSIGNED</p>
                    <p className="text-base font-black italic text-foreground">{stats.assigned}</p>
                  </div>
                  <div className="border-2 border-border bg-secondary p-1.5 text-center">
                    <p className="text-[8px] font-black uppercase italic text-emerald-700 dark:text-success">SECURED</p>
                    <p className="text-base font-black italic text-emerald-700 dark:text-success">{stats.secured}</p>
                  </div>
                  <div className="border-2 border-border bg-secondary p-1.5 text-center">
                    <p className="text-[8px] font-black uppercase italic text-destructive">FAILED</p>
                    <p className="text-base font-black italic text-destructive">{stats.failed}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
