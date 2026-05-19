-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'MEMBER',
    avatar TEXT,
    workspace_code TEXT,
    tasks_completed INTEGER DEFAULT 0,
    active_tasks INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,

    -- Google Calendar support
    google_access_token TEXT,
    google_refresh_token TEXT,
    google_token_expiry TIMESTAMP WITH TIME ZONE,
    google_calendar_connected BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    manager_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    deadline DATE,
    status TEXT DEFAULT 'PLANNING',
    priority TEXT DEFAULT 'MEDIUM',
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PROJECT MEMBERS
CREATE TABLE IF NOT EXISTS public.project_members (
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    PRIMARY KEY(project_id,user_id)
);

-- TASKS
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    assignee_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'TODO',
    priority TEXT DEFAULT 'MEDIUM',
    due_date DATE,
    notes TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SUBTASKS
CREATE TABLE IF NOT EXISTS public.subtasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID REFERENCES public.tasks(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NOTES
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    date DATE,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ACTIVITIES
CREATE TABLE IF NOT EXISTS public.activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    target_id UUID NOT NULL,
    target_type TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INVITATIONS
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'MEMBER',
    project TEXT,
    status TEXT DEFAULT 'pending',
    invited_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    accepted_at TIMESTAMP WITH TIME ZONE
);

-------------------------------------------------------
-- RLS
-------------------------------------------------------

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subtasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-------------------------------------------------------
-- USERS
-------------------------------------------------------

CREATE POLICY "Users can read all users"
ON public.users
FOR SELECT
USING (true);

CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Allow profile creation"
ON public.users
FOR INSERT
WITH CHECK (true);

-------------------------------------------------------
-- PROJECTS
-------------------------------------------------------

CREATE POLICY "Authenticated users can read all projects"
ON public.projects
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert projects"
ON public.projects
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update projects"
ON public.projects
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete projects"
ON public.projects
FOR DELETE
USING (auth.uid() IS NOT NULL);

-------------------------------------------------------
-- PROJECT MEMBERS
-------------------------------------------------------

CREATE POLICY "Authenticated users can read project members"
ON public.project_members
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert project members"
ON public.project_members
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete project members"
ON public.project_members
FOR DELETE
USING (auth.uid() IS NOT NULL);

-------------------------------------------------------
-- TASKS
-------------------------------------------------------

CREATE POLICY "Authenticated users can read all tasks"
ON public.tasks
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert tasks"
ON public.tasks
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update tasks"
ON public.tasks
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete tasks"
ON public.tasks
FOR DELETE
USING (auth.uid() IS NOT NULL);

-------------------------------------------------------
-- SUBTASKS
-------------------------------------------------------

CREATE POLICY "Authenticated users can read subtasks"
ON public.subtasks
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert subtasks"
ON public.subtasks
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update subtasks"
ON public.subtasks
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete subtasks"
ON public.subtasks
FOR DELETE
USING (auth.uid() IS NOT NULL);

-------------------------------------------------------
-- NOTES
-------------------------------------------------------

CREATE POLICY "Users can read own notes"
ON public.notes
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
ON public.notes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
ON public.notes
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
ON public.notes
FOR DELETE
USING (auth.uid() = user_id);

-------------------------------------------------------
-- ACTIVITIES
-------------------------------------------------------

CREATE POLICY "Authenticated users can read activities"
ON public.activities
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert own activities"
ON public.activities
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-------------------------------------------------------
-- INVITATIONS
-------------------------------------------------------

CREATE POLICY "Authenticated users can read invitations"
ON public.invitations
FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert invitations"
ON public.invitations
FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update invitations"
ON public.invitations
FOR UPDATE
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete invitations"
ON public.invitations
FOR DELETE
USING (auth.uid() IS NOT NULL);

-------------------------------------------------------
-- SIGNUP TRIGGER
-------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users(id,name,email,avatar)
  VALUES(
      new.id,
      COALESCE(
          new.raw_user_meta_data->>'full_name',
          split_part(new.email,'@',1)
      ),
      new.email,
      new.raw_user_meta_data->>'avatar_url'
  );

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user();