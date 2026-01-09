import { useEffect } from 'react';
import { useEventContext } from '../contexts/EventContext';

export function useEvents() {
  const { events, loading, error, fetchEvents, addEvent, updateEvent, deleteEvent } = useEventContext();

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, addEvent, updateEvent, deleteEvent };
}
