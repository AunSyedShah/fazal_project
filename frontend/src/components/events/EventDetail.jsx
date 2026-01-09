import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';

export default function EventDetail() {
  const { id } = useParams();
  const { events, deleteEvent, loading, error } = useEvents();
  const navigate = useNavigate();
  const event = events.find(e => e._id === id);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;
  if (!event) return <div className="text-center py-8">Event not found.</div>;

  const handleDelete = async () => {
    await deleteEvent(id);
    navigate('/events');
  };

  return (
    <div className="container max-w-xl mx-auto py-8">
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <div className="mb-2 text-gray-600">Venue: {event.venue}</div>
        <div className="mb-2 text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</div>
        <div className="mb-4 text-gray-600">{event.description}</div>
        <div className="flex gap-4">
          <Link to={`/events/${id}/edit`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</Link>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Delete</button>
        </div>
      </div>
    </div>
  );
}
