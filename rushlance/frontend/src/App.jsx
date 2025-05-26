import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/login/signup';
import Subscription from './pages/general/subscription.jsx';
import Home from './pages/general/Home.jsx';
import DashboardAdmin from './pages/users/admin/dashboard.jsx';
import DashboardFreelancer from './pages/users/freelancer/dashboard.jsx';
import DashboardClient from './pages/users/client/dashboard.jsx';
import PublicRoute from './PublicRoute';
import PrivateRoute from "./PrivateRoute";
import Review from "./pages/general/review.jsx";
import ServiceDetails from "./pages/general/services.jsx";

export default function App() {

  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/signup" element={
              <PublicRoute>
                <Signup/>
              </PublicRoute>
            } />
            
            {<Route path="/subscription" element={
              <Subscription />
            } /> } 
            
            {<Route path="/Home" element={
              <Home />
            } /> }

            {<Route path="/review" element={
              <Review />
            } /> }
            

            <Route path="/dashboard_freelancer" element={
              <PrivateRoute>
                <DashboardFreelancer/>
              </PrivateRoute>
            } />

            <Route path="/dashboard_client" element={
              <PrivateRoute>
                <DashboardClient/>
              </PrivateRoute>
            } />

            <Route path="/dashboard_admin" element={
              <PrivateRoute>
                <DashboardAdmin/>
              </PrivateRoute>
            } />

            <Route path="/service/:id" element={
              <ServiceDetails />} />

          </Routes>
      </div>
    </Router>
  );
}