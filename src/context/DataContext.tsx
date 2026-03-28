import { createContext, useContext, useState, useEffect, ReactNode, FC } from "react";
import { members as initialMembers, tasks as initialTasks, events as initialEvents, Member, Task, Event } from "../data/mockData";

interface DataContextType {
    members: Member[];
    addMember: (member: Member) => void;
    updateMember: (id: string, updates: Partial<Member>) => void;
    deleteMember: (id: string) => void;
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (id: string, updates: Partial<Task>) => void;
    deleteTask: (id: string) => void;
    events: Event[];
    addEvent: (event: Event) => void;
    updateEvent: (id: string, updates: Partial<Event>) => void;
    deleteEvent: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [members, setMembers] = useState<Member[]>(() => {
        const saved = localStorage.getItem("members");
        return saved ? JSON.parse(saved) : initialMembers;
    });

    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : initialTasks;
    });

    const [events, setEvents] = useState<Event[]>(() => {
        const saved = localStorage.getItem("events");
        const loadedEvents: Event[] = saved ? JSON.parse(saved) : initialEvents;
        // Migration: Ensure all events have budget and expenses
        return loadedEvents.map(e => ({
            ...e,
            budget: e.budget ?? 0,
            expenses: e.expenses ?? 0
        }));
    });

    const syncEvents = (currentEvents: Event[], currentTasks: Task[]) => {
        return currentEvents.map(event => {
            const eventTasks = currentTasks.filter(t => t.event === event.title);
            return {
                ...event,
                tasksTotal: eventTasks.length,
                tasksDone: eventTasks.filter(t => t.status === "done").length
            };
        });
    };

    useEffect(() => {
        localStorage.setItem("members", JSON.stringify(members));
    }, [members]);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        setEvents(prev => syncEvents(prev, tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events));
    }, [events]);

    const addMember = (member: Member) => setMembers((prev) => [...prev, member]);
    const updateMember = (id: string, updates: Partial<Member>) =>
        setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)));
    const deleteMember = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
    const updateTask = (id: string, updates: Partial<Task>) =>
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
    const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));

    const addEvent = (event: Event) => setEvents((prev) => [...prev, event]);
    const updateEvent = (id: string, updates: Partial<Event>) => {
        const oldEvent = events.find(e => e.id === id);
        if (oldEvent && updates.title && updates.title !== oldEvent.title) {
            // Title changed, update associated tasks
            setTasks(prev => prev.map(t => t.event === oldEvent.title ? { ...t, event: updates.title! } : t));
        }
        setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
    };
    const deleteEvent = (id: string) => {
        const eventToDelete = events.find(e => e.id === id);
        if (eventToDelete) {
            // Optional: clear event field in tasks
            setTasks(prev => prev.map(t => t.event === eventToDelete.title ? { ...t, event: "" } : t));
        }
        setEvents((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <DataContext.Provider
            value={{
                members,
                addMember,
                updateMember,
                deleteMember,
                tasks,
                addTask,
                updateTask,
                deleteTask,
                events,
                addEvent,
                updateEvent,
                deleteEvent,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
