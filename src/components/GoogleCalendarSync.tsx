import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const useGoogleCalendar = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState<boolean | null>(null);

  const checkMode = async () => {
    console.log('[CalendarSync] checkMode: Checking Supabase session...');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[CalendarSync] checkMode: Supabase session retrieved:', session ? 'FOUND' : 'NULL');
      if (session) {
        setIsDemoMode(false);
        console.log('[CalendarSync] checkMode: Set isDemoMode = false (Real OAuth Mode)');
        return session;
      }
      
      const savedUser = localStorage.getItem('velora_user');
      console.log('[CalendarSync] checkMode: velora_user in localStorage:', savedUser ? 'FOUND' : 'NULL');
      if (savedUser) {
        setIsDemoMode(true);
        console.log('[CalendarSync] checkMode: Set isDemoMode = true (Demo Mode)');
      } else {
        setIsDemoMode(false);
        console.log('[CalendarSync] checkMode: Set isDemoMode = false (Default/Fallback)');
      }
      return null;
    } catch (e) {
      console.error('[CalendarSync] checkMode exception:', e);
      setIsDemoMode(true); 
      return null;
    }
  };

  const fetchStatus = async () => {
    console.log('[CalendarSync] fetchStatus: Fetching connection status...');
    try {
      const session = await checkMode();
      if (!session) {
        const demoConnected = localStorage.getItem('velora_demo_calendar_connected') === 'true';
        console.log('[CalendarSync] fetchStatus (Demo Mode): Status is', demoConnected ? 'CONNECTED' : 'DISCONNECTED');
        setIsConnected(demoConnected);
        return;
      }

      console.log('[CalendarSync] fetchStatus (Real Mode): Calling /api/calendar/status...');
      const response = await fetch('/api/calendar/status', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      console.log('[CalendarSync] fetchStatus (Real Mode): Status response status code:', response.status);
      const data = await response.json();
      console.log('[CalendarSync] fetchStatus (Real Mode): Connection state:', data.connected);
      setIsConnected(data.connected);
    } catch (error) {
      console.error('[CalendarSync] Failed to fetch calendar status:', error);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const connect = async () => {
    console.log('[CalendarSync] connect: Initializing connection flow...');
    setIsLoading(true);
    try {
      const session = await checkMode();
      if (!session) {
        console.log('[CalendarSync] connect (Demo Mode): Initiating simulated delay...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        localStorage.setItem('velora_demo_calendar_connected', 'true');
        console.log('[CalendarSync] connect (Demo Mode): Setting isConnected = true');
        setIsConnected(true);
        const url = new URL(window.location.href);
        url.searchParams.set('calendar_success', 'true');
        console.log('[CalendarSync] connect (Demo Mode): Redirecting to success URL:', url.toString());
        window.location.href = url.toString();
        return;
      }

      console.log('[CalendarSync] connect (Real Mode): Fetching auth URL from backend /api/calendar/auth...');
      const response = await fetch('/api/calendar/auth', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      console.log('[CalendarSync] connect (Real Mode): Backend response code:', response.status);
      const data = await response.json();
      console.log('[CalendarSync] connect (Real Mode): Backend response body:', data);

      if (data.success && data.authUrl) {
        console.log('[CalendarSync] connect (Real Mode): Redirecting user to Google OAuth page:', data.authUrl);
        window.location.href = data.authUrl;
      } else {
        throw new Error(data.error || 'Failed to get auth URL');
      }
    } catch (error: any) {
      console.error('[CalendarSync] Connection error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async () => {
    setIsLoading(true);
    try {
      const session = await checkMode();
      if (!session) {
        // Demo Mode disconnect simulation
        await new Promise(resolve => setTimeout(resolve, 1000));
        localStorage.setItem('velora_demo_calendar_connected', 'false');
        setIsConnected(false);
        return;
      }

      const response = await fetch('/api/calendar/disconnect', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setIsConnected(false);
      }
    } catch (error) {
      console.error('Disconnect error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async (event: { title: string, description: string, startTime: string }) => {
    setIsLoading(true);
    try {
      const session = await checkMode();
      if (!session) {
        // Demo Mode event simulation
        await new Promise(resolve => setTimeout(resolve, 800));
        return { success: true, eventId: 'demo-event-' + Math.random().toString(36).substr(2, 9) };
      }

      const response = await fetch('/api/calendar/add-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify(event)
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error: any) {
      console.error('Add event error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const syncAll = async (deadlines: any[]) => {
    setIsLoading(true);
    try {
      const session = await checkMode();
      if (!session) {
        // Demo Mode sync all simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        return { 
          success: true, 
          results: deadlines.map(d => ({ success: true, title: d.title, id: 'demo-event-' + Math.random().toString(36).substr(2, 9) })) 
        };
      }

      const response = await fetch('/api/calendar/sync-deadlines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ deadlines })
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.error);
      return data;
    } catch (error: any) {
      console.error('Sync all error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isConnected, isLoading, connect, disconnect, addEvent, syncAll };
};
