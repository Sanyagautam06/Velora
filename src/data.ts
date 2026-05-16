import { User, Project, Task, Activity } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sanya Gautam',
    email: 'sanya@velora.ai',
    role: 'ADMIN',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sanya',
    tasksCompleted: 45,
    activeTasks: 5,
    streak: 12
  },
  {
    id: 'u2',
    name: 'Aarav Mehta',
    email: 'aarav@velora.ai',
    role: 'MEMBER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
    tasksCompleted: 28,
    activeTasks: 8,
    streak: 4
  },
  {
    id: 'u3',
    name: 'Riya Sharma',
    email: 'riya@velora.ai',
    role: 'MEMBER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya',
    tasksCompleted: 32,
    activeTasks: 4,
    streak: 8
  },
  {
    id: 'u4',
    name: 'Kavya Rao',
    email: 'kavya@velora.ai',
    role: 'MEMBER',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya',
    tasksCompleted: 15,
    activeTasks: 10,
    streak: 2
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Aurora Website Launch',
    description: 'Full redesign and launch of the corporate website with new branding.',
    managerId: 'u1',
    memberIds: ['u1', 'u2', 'u3'],
    deadline: '2026-06-20',
    status: 'ACTIVE',
    priority: 'HIGH',
    progress: 65
  },
  {
    id: 'p2',
    name: 'Campus Hiring Tracker',
    description: 'Internal system to track graduate applications and interview stages.',
    managerId: 'u1',
    memberIds: ['u1', 'u4'],
    deadline: '2026-07-15',
    status: 'PLANNING',
    priority: 'MEDIUM',
    progress: 20
  },
  {
    id: 'p3',
    name: 'AI Content Review System',
    description: 'Automated moderation tool for user-generated content using LLMs.',
    managerId: 'u1',
    memberIds: ['u1', 'u2', 'u4'],
    deadline: '2026-05-10', // Overdue
    status: 'ACTIVE',
    priority: 'URGENT',
    progress: 85
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Finalize Branding Assets',
    description: 'Export all logos and icons for the new website.',
    assigneeId: 'u2',
    projectId: 'p1',
    status: 'DONE',
    priority: 'HIGH',
    dueDate: '2026-05-15',
    notes: ['Checked with the design lead.', 'Assets are in the shared drive.'],
    subtasks: [
      { id: 's1', title: 'Export logos', completed: true },
      { id: 's2', title: 'Optimize icons', completed: true }
    ],
    createdAt: '2026-05-01'
  },
  {
    id: 't2',
    title: 'Implement Navigation Component',
    description: 'Ensure mobile responsiveness and accessibility.',
    assigneeId: 'u3',
    projectId: 'p1',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    dueDate: '2026-05-25',
    notes: [],
    subtasks: [
      { id: 's3', title: 'Desktop menu', completed: true },
      { id: 's4', title: 'Mobile drawer', completed: false }
    ],
    createdAt: '2026-05-05'
  },
  {
    id: 't3',
    title: 'Database Schema for Candidates',
    description: 'Design the SQL schema for student applications.',
    assigneeId: 'u4',
    projectId: 'p2',
    status: 'TODO',
    priority: 'MEDIUM',
    dueDate: '2026-06-01',
    notes: [],
    subtasks: [],
    createdAt: '2026-05-10'
  },
  {
    id: 't4',
    title: 'Fix LLM Toxicity Threshold',
    description: 'The classifier is too aggressive on neutral feedback.',
    assigneeId: 'u2',
    projectId: 'p3',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    dueDate: '2026-05-12', // Overdue
    notes: ['Reported by QA.'],
    subtasks: [],
    createdAt: '2026-05-08'
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    userId: 'u2',
    action: 'completed task',
    targetId: 't1',
    targetType: 'TASK',
    timestamp: '2 hours ago'
  },
  {
    id: 'a2',
    userId: 'u1',
    action: 'created project',
    targetId: 'p2',
    targetType: 'PROJECT',
    timestamp: '1 day ago'
  },
  {
    id: 'a3',
    userId: 'u3',
    action: 'started working on',
    targetId: 't2',
    targetType: 'TASK',
    timestamp: '5 hours ago'
  }
];
