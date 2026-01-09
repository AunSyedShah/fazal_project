import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { useEffect, useState } from 'react';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  venue: Yup.string().required('Venue is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string()
});

export default function EventForm({ editMode = false }) {
  const { events, addEvent, updateEvent, loading, error } = useEvents();
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: '',
    venue: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    if (editMode && events.length) {
      const event = events.find(e => e._id === id);
      if (event) {
        setInitialValues({
          title: event.title,
          venue: event.venue,
          date: event.date.slice(0, 10),
          description: event.description || ''
        });
      }
    }
  }, [editMode, events, id]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (editMode) {
        await updateEvent(id, values);
      } else {
        await addEvent(values);
      }
      navigate('/events');
    }
  });

  return (
    <div className="container max-w-xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">{editMode ? 'Edit Event' : 'Add Event'}</h1>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow rounded p-6 space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border px-3 py-2 rounded"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Venue</label>
          <input
            type="text"
            name="venue"
            className="w-full border px-3 py-2 rounded"
            value={formik.values.venue}
            onChange={formik.handleChange}
          />
          {formik.touched.venue && formik.errors.venue && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.venue}</div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            className="w-full border px-3 py-2 rounded"
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          {formik.touched.date && formik.errors.date && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.date}</div>
          )}
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {editMode ? 'Update' : 'Add'} Event
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </div>
  );
}
