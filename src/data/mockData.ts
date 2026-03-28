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

export const members: Member[] = [
  { id: "m1", name: "Aryan Mehta", role: "Club Lead", team: "Lead" },
  { id: "m2", name: "Priya Sharma", role: "Coordinator", team: "Learning Coordination" },
  { id: "m3", name: "Rahul Nair", role: "Developer", team: "Lead" },
  { id: "m4", name: "Sneha Patel", role: "Designer", team: "Women in Tech" },
  { id: "m5", name: "Karan Verma", role: "Coordinator", team: "Outreach" },
  { id: "m6", name: "Ananya Rao", role: "Member", team: "Women in Tech" },
  { id: "m7", name: "Dev Kapoor", role: "Developer", team: "Lead" },
  { id: "m8", name: "Meera Singh", role: "Member", team: "Outreach" },
];

export const tasks: Task[] = [
  {
    id: "t1", title: "Design hackathon landing page", description: "Create a responsive landing page for CodeRush 2024 with registration form and sponsor section.", priority: "high", status: "in-progress", deadline: "2024-03-15", assignees: ["m4", "m6"], event: "CodeRush Hackathon", comments: 5, createdAt: "2024-02-28",
  },
  {
    id: "t2", title: "Set up judging portal backend", description: "Build REST API for project submissions and judge scoring system.", priority: "high", status: "todo", deadline: "2024-03-18", assignees: ["m3", "m7"], event: "CodeRush Hackathon", comments: 2, createdAt: "2024-03-01",
  },
  {
    id: "t3", title: "Coordinate with sponsors", description: "Follow up with 5 tech companies for sponsorship packages and finalize agreements.", priority: "high", status: "review", deadline: "2024-03-10", assignees: ["m2"], event: "CodeRush Hackathon", comments: 8, createdAt: "2024-02-25",
  },
  {
    id: "t4", title: "Prepare workshop slides for AI/ML session", description: "Create 40-slide deck covering machine learning fundamentals and hands-on demo.", priority: "medium", status: "in-progress", deadline: "2024-03-22", assignees: ["m3", "m2"], event: "AI Workshop", comments: 3, createdAt: "2024-03-02",
  },
  {
    id: "t5", title: "Book seminar hall & AV equipment", description: "Reserve Hall B and arrange projector, microphone, and streaming setup.", priority: "medium", status: "done", deadline: "2024-03-05", assignees: ["m5"], event: "AI Workshop", comments: 1, createdAt: "2024-02-20",
  },
  {
    id: "t6", title: "Design event posters & social media kit", description: "Create 5 poster variants and 10 social media templates for CodeRush promotion.", priority: "medium", status: "done", deadline: "2024-03-08", assignees: ["m4"], event: "CodeRush Hackathon", comments: 4, createdAt: "2024-02-22",
  },
  {
    id: "t7", title: "Write technical quiz questions", description: "Prepare 50 MCQs covering DSA, web dev, and system design for qualifier round.", priority: "low", status: "todo", deadline: "2024-03-25", assignees: ["m7", "m3"], event: "TechQuiz Night", comments: 0, createdAt: "2024-03-03",
  },
  {
    id: "t8", title: "Set up participant registration form", description: "Google Form with team details, problem statement preference, and emergency contacts.", priority: "high", status: "done", deadline: "2024-03-01", assignees: ["m5", "m8"], event: "CodeRush Hackathon", comments: 2, createdAt: "2024-02-18",
  },
];

export const events: Event[] = [
  {
    id: "e1", title: "CodeRush Hackathon", description: "24-hour inter-college hackathon with ₹1L prize pool. Open to all CS/IT students.", date: "2024-03-29", venue: "Main Auditorium", status: "upcoming", team: ["m1", "m2", "m3", "m4", "m5"], tasksTotal: 12, tasksDone: 5, coverColor: "185", budget: 150000, expenses: 45000,
  },
  {
    id: "e2", title: "AI/ML Workshop", description: "Hands-on workshop on machine learning fundamentals with live coding sessions.", date: "2024-03-23", venue: "Seminar Hall B", status: "upcoming", team: ["m2", "m3", "m6"], tasksTotal: 6, tasksDone: 4, coverColor: "205", budget: 25000, expenses: 12000,
  },
  {
    id: "e3", title: "TechQuiz Night", description: "Inter-department technical quiz with 5 categories and exciting prizes.", date: "2024-04-05", venue: "Conference Room A", status: "upcoming", team: ["m1", "m7", "m8"], tasksTotal: 4, tasksDone: 1, coverColor: "152", budget: 10000, expenses: 2500,
  },
  {
    id: "e4", title: "Web Dev Bootcamp", description: "3-day bootcamp covering HTML, CSS, React, and deployment for beginners.", date: "2024-02-10", venue: "Computer Lab 3", status: "completed", team: ["m3", "m4", "m7"], tasksTotal: 8, tasksDone: 8, coverColor: "38", budget: 5000, expenses: 4800,
  },
];

export const recentActivity = [
  { id: 1, user: "Priya Sharma", action: "moved task", target: "Coordinate with sponsors", to: "Review", time: "2 hours ago" },
  { id: 2, user: "Sneha Patel", action: "completed task", target: "Design event posters", to: "", time: "4 hours ago" },
  { id: 3, user: "Rahul Nair", action: "commented on", target: "Set up judging portal backend", to: "", time: "6 hours ago" },
  { id: 4, user: "Karan Verma", action: "completed task", target: "Book seminar hall", to: "", time: "1 day ago" },
  { id: 5, user: "Dev Kapoor", action: "created task", target: "Write technical quiz questions", to: "", time: "1 day ago" },
];
