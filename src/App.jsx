import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Events from './Pages/Events';
import Tickets from './Pages/Tickets';
import About from './Pages/About';
import Hero from './components/Hero';
import AttendeeDetails from './components/AttendeeDetails';
import SelectTicket from './components/SelectTicket';
import TicketReady from './components/TicketReady';

function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/events" Hero/>} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />}>
          <Route index element={<SelectTicket />} /> 
          <Route path="attendee" element={<AttendeeDetails />} />
          <Route path="ready" element={<TicketReady />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
