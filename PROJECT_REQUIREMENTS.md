# Velora - Project Requirements Document (PRD)

## 1. Project Title
**Velora** - Professional Team Task Management Platform.

---

## 2. Project Overview
Velora is a professional-grade Team Task Manager designed for high-performance teams. It provides a synchronized platform for project organization, task lifecycle management, and team collaboration. The application features a dual-dashboard architecture (Admin Dashboard and Member Dashboard), a robust Kanban-based task system, and an integrated suite of tools including task notes, deadline tracking, and performance insights.

---

## 3. Problem Statement
Modern teams often struggle with fragmented communication, undefined objectives, and a lack of role-specific visibility. Existing tools are either too generic or overly complex, leading to notification fatigue and lost productivity. Teams need a unified platform where project health is visible at a glance and individual contributions are aligned with project milestones.

---

## 4. Project Objective
- **Unify Operations:** Consolidate projects, tasks, and team data into a single source of truth.
- **Clarify Roles:** Provide distinct interfaces for Administrators (managers) and Members (contributors).
- **Enforce Deadlines:** Implement deadline tracking to reduce overdue tasks.
- **Enhance Visibility:** Use real-time insights to identify team workload bottlenecks.
- **Modern UX:** Deliver a high-performance, responsive UI with fluid animations and professional aesthetics.

---

## 5. Target Users
- **Project Managers (Admin):** Responsible for project structure, resource allocation, and team oversight.
- **Individual Contributors (Members):** Focused on task execution, status updates, and tracking progress.
- **Stakeholders:** Interested in high-level project health and productivity trends.

---

## 6. Core Requirements Mapping
| Requirement | Status | Implementation Detail |
| :--- | :--- | :--- |
| **Authentication** | Full | Signup/Login with session management. |
| **Project Mgmt** | Full | CRUD operations for projects with member assignments. |
| **Task Mgmt** | Full | Kanban + Table views, status lifecycle, and priority levels. |
| **Dashboards** | Full | Role-based Admin vs. Member dashboards. |
| **REST APIs** | Full | Comprehensive API suite for all core entities. |
| **Database** | Full | Relational schema with foreign key constraints. |
| **RBAC** | Full | Strictly enforced Admin vs. Member access levels. |

---

## 7. Feature List
- **Authentication:** Secure login, signup, and demo mode access.
- **Admin Dashboard:** Oversight of total projects, tasks, and team health.
- **Member Dashboard:** Personalized view of assigned tasks and recent activity.
- **Projects:** Centralized hubs for all related tasks and team members.
- **Tasks:** Core units of work with status, priority, due dates, and assignees.
- **Kanban Board:** Drag-and-drop interface for status management.
- **Team Management:** Member list with role assignments and activity tracking.
- **Deadlines:** Consolidated list of time-sensitive tasks.
- **Reports & Insights:** Analysis of productivity trends and project health metrics.
- **Settings:** Profile, security, and theme customization.

---

## 8. User Roles and Permissions

| Feature | Admin | Member |
| :--- | :---: | :---: |
| View All Projects | ✅ | ✅ (Assigned) |
| Create/Edit/Delete Projects | ✅ | ❌ |
| View Team Members | ✅ | ✅ |
| Invite/Remove Team Members | ✅ | ❌ |
| Create/Assign Tasks | ✅ | ✅ (Own) |
| Update Task Status | ✅ | ✅ (Own) |
| Delete Tasks | ✅ | ❌ |
| Access Admin Dashboard | ✅ | ❌ |
| Access Settings | ✅ | ✅ |

---

## 9. Admin Features
- **Dashboard:** Aggregate stats for projects, tasks, and team size.
- **Resource Management:** Assign members to specific projects.
- **Health Analysis:** Identify projects that require attention.
- **Invitations:** Invite new members to the team.

---

## 10. Member Features
- **Task List:** View only assigned tasks to stay focused.
- **Progress Tracking:** Track daily activity and task completion.
- **Personal Insights:** Analyze personal completion rates and efficiency.

---

## 11. Security Requirements
- **Encryption:** Use industry-standard encryption for data in transit.
- **Authentication:** Secure password handling and session persistence.
- **Role Validation:** Server-side checks for all role-restricted actions.
- **Data Privacy:** Secure handling of user and team information.

---

## 12. Tech Stack Requirements
- **Frontend:** React, TypeScript, Vite, Tailwind CSS.
- **Animation:** Framer Motion.
- **Charts:** Recharts, D3.
- **Persistence:** React Context + LocalStorage (for frontend-only demo).

---
*Built for the modern team.*
