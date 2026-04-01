export type Priority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";
export type MemberRole = "Club Lead" | "Coordinator" | "Member" | "Designer" | "Developer";
export type EventStatus = "upcoming" | "ongoing" | "completed";

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
  team: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  deadline: string;
  assignees: string[];
  involvedIds?: string[];
  event: string;
  comments: number;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  status: EventStatus;
  team: string[];
  tasksTotal: number;
  tasksDone: number;
  coverColor: string;
  budget: number;
  expenses: number;
}

export interface Comment {
  id: string;
  taskId: string;
  author: string;
  content: string;
  time: string;
}

export const members: Member[] = [];

export const tasks: Task[] = [];

export const events: Event[] = [];

export const recentActivity = [];
