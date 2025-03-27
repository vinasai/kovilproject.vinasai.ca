import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import AboutUs from "./components/About";
import ContactUs from './components/ContactUs';
import Header from './components/Header';
import Footer from './components/Footer';
import Gallery from './components/Gallary';
import VideoGallery from './components/VideoGallery';
import Services from './components/Services';
import Admin from './components/admin';
import Donate from './components/Donate';
import Signup from './components/Signup';
import Event from './components/eventcalender';
import EventManagement from './components/EventManagement';
import DonationManagement from './components/DonationManagement';
import ServiceDetails from './components/ServiceDetails';
import Login from './components/Login';
import AdminUserManagement from './components/AdminUserManagement';
import { useLocation } from 'react-router-dom';
import Headeradmin from './components/Headeradmin';
import AdminRegistration from './components/AdminRegistration'; // Import the new component

function Layout({ children }) {
  const location = useLocation();
  const noHeaderFooterRoutes = [
    '/admin', 
    '/admindashboard',
    '/eventadmin',
    '/donateadmin',
    '/admin-registration' // Add this route to hide default header/footer
  ];
  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <div>
      {hideHeaderFooter ? <Headeradmin /> : <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/video" element={<VideoGallery />} />
          <Route path="/service" element={<Services />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/event" element={<Event />} />
          <Route path="/eventadmin" element={<EventManagement />} />
          <Route path="/donateadmin" element={<DonationManagement />} />
          <Route path="/servicedetails/:id" element={<ServiceDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/users" element={<AdminUserManagement/>} />
          {/* Add the new Admin Registration route */}
          <Route path="/admin-registration" element={<AdminRegistration />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;