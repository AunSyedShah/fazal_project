
import { BrowserRouter } from 'react-router-dom';
import EventsRoutes from './routes/EventsRoutes';
import { EventProvider } from './contexts/EventContext';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <EventProvider>
      <BrowserRouter>
        <Navbar />
        <EventsRoutes />
      </BrowserRouter>
    </EventProvider>
  );
}
