export type Role = 'ADMIN' | 'MEMBER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  workspaceCode?: string;
  tasksCompleted: number;
  activeTasks: number;
  streak: number;
}

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assigneeId: string;
  projectId: string;
  status: TaskStatus;
  priority: Priority;
  dueDate: string;
  notes: string[];
  subtasks: SubTask[];
  createdAt: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';

export interface Project {
  id: string;
  name: string;
  description: string;
  managerId: string;
  memberIds: string[];
  deadline: string;
  status: ProjectStatus;
  priority: Priority;
  progress: number;
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  targetId: string;
  targetType: 'TASK' | 'PROJECT' | 'USER';
  timestamp: string;
}
