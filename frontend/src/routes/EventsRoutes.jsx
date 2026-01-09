import { Routes, Route } from 'react-router-dom';
import EventList from '../components/events/EventList';
import EventDetail from '../components/events/EventDetail';
import EventForm from '../components/events/EventForm';

export default function EventsRoutes() {
  return (
    <Routes>
      <Route path="/events" element={<EventList />} />
      <Route path="/events/new" element={<EventForm />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/events/:id/edit" element={<EventForm editMode />} />
    </Routes>
  );
}
