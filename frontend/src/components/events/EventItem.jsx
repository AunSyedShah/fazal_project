// Optional: Used for future modularization or list rendering
export default function EventItem({ event }) {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center">
      <div>
        <span className="text-lg font-semibold text-blue-700">{event.title}</span>
        <div className="text-gray-500">{event.venue} &mdash; {new Date(event.date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}
