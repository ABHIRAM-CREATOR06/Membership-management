import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Task } from "@/data/mockData";

export interface MemberStats {
  assigned: number;  // all tasks where they are assignee
  secured: number;   // done tasks where they are in involvedIds
  failed: number;    // done tasks where they are assigned but NOT in involvedIds
  efficiency: number; // secured / (secured + failed + pending-assigned)
}

export function getMemberStats(memberId: string, tasks: Task[]): MemberStats {
  const assigned = tasks.filter(t => t.assignees.includes(memberId)).length;

  const doneTasks = tasks.filter(t => t.status === "done" && t.assignees.includes(memberId));

  // Secured = involved in a completed task
  const secured = doneTasks.filter(t =>
    (t.involvedIds || []).includes(memberId)
  ).length;

  // Failed = assigned to a completed task but NOT in involvedIds
  const failed = doneTasks.filter(t =>
    !(t.involvedIds || []).includes(memberId)
  ).length;

  // Efficiency = secured out of (secured + failed + still-active assigned)
  // i.e. out of ALL assigned tasks, how many were actually secured
  const efficiency = assigned > 0 ? Math.round((secured / assigned) * 100) : 0;

  return { assigned, secured, failed, efficiency };
}

export function calculateMemberEfficiency(memberId: string, tasks: Task[]): number {
  return getMemberStats(memberId, tasks).efficiency;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates initials from a name (e.g., "Aryan Mehta" -> "AM")
 */
export function getInitials(name: string): string {
  if (!name) return "??";

  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
