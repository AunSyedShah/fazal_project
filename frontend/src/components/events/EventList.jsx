import { Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';

export default function EventList() {
  const { events, loading, error } = useEvents();

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="container max-w-3xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link to="/events/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Event</Link>
      </div>
      <ul className="space-y-4">
        {events.map(event => (
          <li key={event._id} className="bg-white shadow rounded p-4 flex justify-between items-center">
            <div>
              <Link to={`/events/${event._id}`} className="text-lg font-semibold text-blue-700 hover:underline">{event.title}</Link>
              <div className="text-gray-500">{event.venue} &mdash; {new Date(event.date).toLocaleDateString()}</div>
            </div>
            <Link to={`/events/${event._id}/edit`} className="text-blue-500 hover:underline">Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
