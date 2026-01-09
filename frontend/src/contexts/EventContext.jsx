import { createContext, useContext, useState } from 'react';
import * as eventService from '../services/eventService';

const EventContext = createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await eventService.getEvents();
      // Handle both array and object response
      if (Array.isArray(res.data)) {
        setEvents(res.data);
      } else if (Array.isArray(res.data.events)) {
        setEvents(res.data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eventService.createEvent(data);
      setEvents((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.message || 'Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await eventService.updateEvent(id, data);
      setEvents((prev) => prev.map(e => e._id === id ? res.data : e));
    } catch (err) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await eventService.deleteEvent(id);
      setEvents((prev) => prev.filter(e => e._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, error, fetchEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
